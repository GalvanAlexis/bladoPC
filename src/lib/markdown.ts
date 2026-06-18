import fs from 'fs';
import path from 'path';
import { CAREERS } from './constants';

const CONTENT_DIR_BASE = path.join(process.cwd(), 'content', 'Carreras');

function extractYear(filename: string): number {
  const match = filename.match(/(\d+)_a[nñ]o_(\d+)/i);
  return match ? parseInt(match[2], 10) : 1;
}

function findAllTrackingFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findAllTrackingFiles(filePath, fileList);
    } else {
      if (file.endsWith('.md') && file.match(/\d+_a[nñ]o_\d+/i)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

export function getFullContextString(maxChars = 16000): string {
  const sections: string[] = [];

  try {
    for (const career of CAREERS) {
      const careerDir = path.join(CONTENT_DIR_BASE, career);
      const trackingFiles = findAllTrackingFiles(careerDir);

      for (const filePath of trackingFiles) {
        const year = extractYear(path.basename(filePath));
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        const relevantLines = lines.filter(line => {
          const t = line.trim();
          if (!t) return false;
          if (t.startsWith('#')) return true;
          if (t.match(/^-\s\[[ xX\/]\]\s.+/)) return true;
          return false;
        });

        if (relevantLines.length > 0) {
          sections.push(`=== ${career.replace(/^\d\s/, '')} — Año ${year} ===`);
          sections.push(...relevantLines);
          sections.push('');
        }
      }
    }
  } catch (error) {
    console.error("Error generando contexto enriquecido:", error);
    return "";
  }

  let result = sections.join('\n');
  if (result.length > maxChars) {
    const cutoff = result.lastIndexOf('\n', maxChars);
    result = result.substring(0, cutoff > 0 ? cutoff : maxChars) + '\n... (contenido truncado por longitud)';
  }
  return result;
}


const FILOSOFIA_DIR_BASE = path.join(process.cwd(), 'content', 'Filosofia');

export function getFilosofiaContextString(maxChars = 8000): string {
  const sections: string[] = [];

  try {
    if (!fs.existsSync(FILOSOFIA_DIR_BASE)) return "";
    const files = fs.readdirSync(FILOSOFIA_DIR_BASE);

    for (const file of files) {
      const filePath = path.join(FILOSOFIA_DIR_BASE, file);
      if (fs.statSync(filePath).isDirectory()) continue;

      if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        const relevantLines = lines.filter(line => {
          const t = line.trim();
          if (!t) return false;
          if (t.startsWith('#')) return true;
          if (t.startsWith('>')) return true;
          if (t.startsWith('- **') || t.startsWith('* **')) return true;
          if (t.startsWith('-') && t.length < 120) return true;
          return false;
        });

        if (relevantLines.length > 0) {
          const cleanName = file
            .replace(/^\d+-/, '')
            .replace('.md', '')
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          sections.push(`=== Filosofía de Ingeniería: ${cleanName} ===`);
          sections.push(...relevantLines);
          sections.push('');
        }
      }
    }
  } catch (error) {
    console.error("Error generando contexto filosófico:", error);
    return "";
  }

  let result = sections.join('\n');
  if (result.length > maxChars) {
    const cutoff = result.lastIndexOf('\n', maxChars);
    result = result.substring(0, cutoff > 0 ? cutoff : maxChars) + '\n... (contenido de filosofía truncado por longitud)';
  }
  return result;
}
