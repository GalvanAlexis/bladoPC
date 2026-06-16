import fs from 'fs';
import path from 'path';
import { CAREERS } from './constants';
import { LibraryData, CarreraData, YearData, BookData, TopicEntry, BookColorFamily, BOOK_COLOR_PALETTES, BookStatus } from './libraryTypes';

// Removed SkillNode, SkillEdge as they are replaced by libraryTypes.ts

const CONTENT_DIR_BASE = path.join(process.cwd(), 'content', 'Carreras');

// BUG-04: Constante movida a constants.ts para evitar error de importación de modulo fs en Cliente

/**
 * Parsea el texto del estado de un checkbox markdown
 */
function parseStatus(checkStr: string): BookStatus {
  if (checkStr === 'x' || checkStr === 'X') return 'completed';
  if (checkStr === '/') return 'progress';
  return 'locked';
}

function extractYear(filename: string): number {
  // Acepta tanto 'año' (UTF-8) como 'ano' (encoding legacy de Windows)
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
      // Buscar archivos de tracking: 01_año_1.md, 02_año_2.md, etc.
      // Acepta tanto 'año' como 'ano' para compatibilidad con encoding legacy de Windows
      if (file.endsWith('.md') && file.match(/\d+_a[nñ]o_\d+/i)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

/**
 * Genera un string de contexto enriquecido para la IA de Blado.
 * Incluye las descripciones completas de materias, tecnologias y proyectos.
 */
export function getFullContextString(maxChars = 16000): string {
  const sections: string[] = [];
  // BUG-04: usa la constante exportada del módulo

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

/**
 * Genera un string de contexto enriquecido de la carpeta Filosofia para la IA de Blado.
 * Filtra de forma inteligente para no exceder el presupuesto de tokens.
 */
export function getFilosofiaContextString(maxChars = 8000): string {
  const sections: string[] = [];

  try {
    if (!fs.existsSync(FILOSOFIA_DIR_BASE)) return "";
    const files = fs.readdirSync(FILOSOFIA_DIR_BASE);

    for (const file of files) {
      const filePath = path.join(FILOSOFIA_DIR_BASE, file);
      if (fs.statSync(filePath).isDirectory()) continue; // Evitar libros/ y subcarpetas

      if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        const relevantLines = lines.filter(line => {
          const t = line.trim();
          if (!t) return false;
          if (t.startsWith('#')) return true; // Títulos
          if (t.startsWith('>')) return true; // Citas / Lemas
          if (t.startsWith('- **') || t.startsWith('* **')) return true; // Conceptos en negrita
          if (t.startsWith('-') && t.length < 120) return true; // Viñetas cortas
          return false;
        });

        if (relevantLines.length > 0) {
          // Extraer nombre descriptivo legible (ej. "01-clean-architecture-solid.md" -> "Clean Architecture + SOLID")
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

const MISCELANEA_DIR_BASE = path.join(process.cwd(), 'content', 'Miscelanea');

function generateSlug(text: string): string {
  return text.toLowerCase()
    .replace(/[áäâà]/g, 'a')
    .replace(/[éëêè]/g, 'e')
    .replace(/[íïîì]/g, 'i')
    .replace(/[óöôò]/g, 'o')
    .replace(/[úüûù]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseTopicsFromMd(filePath: string): { topics: TopicEntry[], hasContent: boolean } {
  if (!fs.existsSync(filePath)) return { topics: [], hasContent: false };
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const topics: TopicEntry[] = [];
  
  let currentTopic: TopicEntry | null = null;
  let charCount = 0;
  let fileHasContent = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    const isH2 = trimmed.startsWith('## ');
    const isH3 = trimmed.startsWith('### ');
    
    if (isH2 || isH3) {
      if (currentTopic) {
        currentTopic.charCount = charCount;
        currentTopic.hasContent = charCount > 50; // threshold
        if (currentTopic.hasContent) fileHasContent = true;
        topics.push(currentTopic);
      }
      
      const title = trimmed.replace(/^#+\s/, '');
      currentTopic = {
        id: generateSlug(title),
        title,
        level: isH2 ? 2 : 3,
        hasContent: false,
        charCount: 0
      };
      charCount = 0;
    } else if (currentTopic && trimmed !== '') {
      charCount += trimmed.length;
    }
  }
  
  if (currentTopic) {
    currentTopic.charCount = charCount;
    currentTopic.hasContent = charCount > 50;
    if (currentTopic.hasContent) fileHasContent = true;
    topics.push(currentTopic);
  }
  
  return { topics, hasContent: fileHasContent };
}

function findMateriaFile(careerDir: string, year: number, slug: string): string | null {
  const materiasDir = path.join(careerDir, `año ${year}`, 'Materias');
  if (!fs.existsSync(materiasDir)) return null;
  
  const files = fs.readdirSync(materiasDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const cleanName = file.replace(/^\d+_/, '').replace('.md', '');
    if (generateSlug(cleanName) === slug) {
      return path.join(materiasDir, file);
    }
  }
  return null;
}

export function getLibraryData(): LibraryData {
  const carrerasData: CarreraData[] = [];
  
  const CARRERAS_CONFIG: Record<string, { shortName: string, icon: string, family: BookColorFamily }> = {
    '1 Ing Sistemas': { shortName: 'Ing. Sistemas', icon: '💻', family: 'indigo' },
    '2 Ing Datos': { shortName: 'Ing. Datos', icon: '📊', family: 'violet' },
    '3 Lic IA': { shortName: 'Lic. IA', icon: '🧠', family: 'emerald' },
  };

  for (const career of CAREERS) {
    const careerDir = path.join(CONTENT_DIR_BASE, career);
    const trackingFiles = findAllTrackingFiles(careerDir);
    const config = CARRERAS_CONFIG[career];
    
    const years: YearData[] = [];
    
    for (const filePath of trackingFiles) {
      const year = extractYear(path.basename(filePath));
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extraer titulo de año del primer H1
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : `Año ${year}`;
      
      const materias: BookData[] = [];
      const lines = content.split('\n');
      let inMaterias = false;
      let colorIdx = 0;
      
      for (const line of lines) {
        if (line.startsWith('## Materias')) {
          inMaterias = true;
          continue;
        }
        if (inMaterias && line.startsWith('## ')) {
          inMaterias = false; // Cambio de seccion
          break;
        }
        
        if (inMaterias) {
          const match = line.match(/-\s\[([ xX\/])\]\s(.+)/);
          if (match) {
            const statusStr = match[1];
            const fullName = match[2].trim();
            const name = fullName.split(':')[0].trim();
            const slug = generateSlug(name);
            const status = parseStatus(statusStr);
            
            const topicsFilePath = findMateriaFile(careerDir, year, slug);
            const { topics, hasContent } = topicsFilePath ? parseTopicsFromMd(topicsFilePath) : { topics: [], hasContent: false };
            
            materias.push({
              slug,
              name,
              fullName,
              status,
              colorIndex: colorIdx % 8,
              hasContent,
              topics
            });
            colorIdx++;
          }
        }
      }
      
      years.push({ year, title, materias });
    }
    
    years.sort((a, b) => a.year - b.year);
    
    carrerasData.push({
      id: career,
      slug: generateSlug(career),
      name: career.replace(/^\d\s/, ''),
      shortName: config.shortName,
      color: BOOK_COLOR_PALETTES[config.family][0],
      colorFamily: config.family,
      icon: config.icon,
      years
    });
  }
  
  // Agregar Miscelanea
  const miscelaneaBooks: BookData[] = [];
  let miscColorIdx = 0;
  
  // Filtrar y leer libros de filosofia
  if (fs.existsSync(FILOSOFIA_DIR_BASE)) {
    const files = fs.readdirSync(FILOSOFIA_DIR_BASE);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(FILOSOFIA_DIR_BASE, file);
        const name = file.replace(/^\d+-/, '').replace('.md', '').replace(/-/g, ' ');
        const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
        const slug = generateSlug(cleanName);
        const { topics, hasContent } = parseTopicsFromMd(filePath);
        
        miscelaneaBooks.push({
          slug,
          name: cleanName,
          fullName: `Filosofia: ${cleanName}`,
          status: 'completed',
          colorIndex: miscColorIdx % 8,
          hasContent,
          topics
        });
        miscColorIdx++;
      }
    }
  }

  if (fs.existsSync(MISCELANEA_DIR_BASE)) {
    const files = fs.readdirSync(MISCELANEA_DIR_BASE);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(MISCELANEA_DIR_BASE, file);
        const name = file.replace(/^\d+_/, '').replace('.md', '').replace(/-/g, ' ');
        const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
        const slug = generateSlug(cleanName);
        const { topics, hasContent } = parseTopicsFromMd(filePath);
        
        miscelaneaBooks.push({
          slug,
          name: cleanName,
          fullName: cleanName,
          status: 'completed',
          colorIndex: miscColorIdx % 8,
          hasContent,
          topics
        });
        miscColorIdx++;
      }
    }
  }

  carrerasData.push({
    id: '4 Miscelanea',
    slug: 'miscelanea',
    name: 'Miscelánea',
    shortName: 'Misc.',
    color: BOOK_COLOR_PALETTES['amber'][0],
    colorFamily: 'amber',
    icon: '🔮',
    years: [
      {
        year: 0,
        title: 'Grimorio Abierto',
        materias: miscelaneaBooks
      }
    ]
  });

  return { carreras: carrerasData };
}

function findFilosofiaFileBySlug(slug: string): string | null {
  if (!fs.existsSync(FILOSOFIA_DIR_BASE)) return null;
  const files = fs.readdirSync(FILOSOFIA_DIR_BASE);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const cleanName = file.replace(/^\d+-/, '').replace('.md', '').replace(/-/g, ' ');
      const name = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      if (generateSlug(name) === slug) {
        return path.join(FILOSOFIA_DIR_BASE, file);
      }
    }
  }
  return null;
}

function findMiscelaneaFileBySlug(slug: string): string | null {
  if (!fs.existsSync(MISCELANEA_DIR_BASE)) return null;
  const files = fs.readdirSync(MISCELANEA_DIR_BASE);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const name = file.replace(/^\d+_/, '').replace('.md', '').replace(/-/g, ' ');
      const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
      if (generateSlug(cleanName) === slug) {
        return path.join(MISCELANEA_DIR_BASE, file);
      }
    }
  }
  return null;
}

export function getTopicContent(careerId: string, year: number | null, slug: string): { markdown: string, title: string } | null {
  const library = getLibraryData();
  const career = library.carreras.find(c => c.id === careerId || c.slug === careerId);
  if (!career) return null;

  let filePath: string | null = null;
  let book: BookData | undefined;

  if (year !== null && year !== 0) {
    const yearData = career.years.find(y => y.year === year);
    if (!yearData) return null;
    book = yearData.materias.find(m => m.slug === slug);
    if (!book) return null;
    const careerDir = path.join(CONTENT_DIR_BASE, careerId.startsWith('4') ? '4 Miscelanea' : careerId);
    filePath = findMateriaFile(careerDir, year, slug);
  } else {
    book = career.years[0]?.materias.find(m => m.slug === slug);
    if (!book) return null;
    if (careerId === '4 Miscelanea' || careerId === 'miscelanea') {
      filePath = findFilosofiaFileBySlug(slug) || findMiscelaneaFileBySlug(slug);
    } else {
      filePath = findFilosofiaFileBySlug(slug) || findMiscelaneaFileBySlug(slug);
    }
  }

  if (!filePath || !fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');
  return { markdown: content, title: book.fullName };
}

