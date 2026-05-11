import fs from 'fs';
import path from 'path';

export type SkillStatus = 'locked' | 'progress' | 'completed';
export type SkillType = 'materia' | 'tecnologia' | 'proyecto';

export interface SkillNode {
  id: string;
  label: string;
  type: SkillType;
  status: SkillStatus;
  description?: string;
  career?: string;
  year?: number;
}

export interface SkillEdge {
  id: string;
  source: string;
  target: string;
}

const CONTENT_DIR_BASE = path.join(process.cwd(), 'content', 'Carreras');

/**
 * Parsea el texto del estado de un checkbox markdown
 */
function parseStatus(checkStr: string): SkillStatus {
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
  const CAREERS = ['1 Ing Sistemas', '2 Ing Datos', '3 Lic IA'];

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

/**
 * Procesa todos los archivos markdown de seguimiento de todas las carreras
 */
export function getSkillTreeData(): { nodes: SkillNode[]; edges: SkillEdge[] } {
  const nodes: SkillNode[] = [];
  const edges: SkillEdge[] = [];
  const processedNodes = new Set<string>();

  try {
    const CAREERS = ['1 Ing Sistemas', '2 Ing Datos', '3 Lic IA'];

    for (const career of CAREERS) {
      const careerDir = path.join(CONTENT_DIR_BASE, career);
      const trackingFiles = findAllTrackingFiles(careerDir);

      for (const filePath of trackingFiles) {
        const year = extractYear(path.basename(filePath));
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        let currentSection: SkillType | null = null;
        let currentProject: SkillNode | null = null;

        const regexCheck = /-\s\[([ xX\/])\]\s(.+)/;

        for (const line of lines) {
          // Identificar sección
          if (line.startsWith('## Materias')) currentSection = 'materia';
          else if (line.startsWith('## Tecnolog')) currentSection = 'tecnologia';
          else if (line.startsWith('## Proyecto')) currentSection = 'proyecto';

          if (!currentSection) continue;

          const match = line.match(regexCheck);
          if (match) {
            const status = parseStatus(match[1]);
            const text = match[2].trim();

            if (currentSection === 'materia' || currentSection === 'tecnologia') {
              // Extraer nombre (ignorando descripciones despues de ':')
              const namePart = text.split(':')[0].trim();
              const globalId = `${career}-${namePart}`;
              
              if (!processedNodes.has(globalId)) {
                nodes.push({
                  id: globalId,
                  label: namePart,
                  type: currentSection,
                  status: status,
                  description: text,
                  career: career,
                  year: year
                });
                processedNodes.add(globalId);
              }
            } 
            else if (currentSection === 'proyecto') {
              if (text.startsWith('Nombre:')) {
                const projName = text.replace('Nombre:', '').trim();
                const globalId = `${career}-${projName}`;
                
                if (!processedNodes.has(globalId)) {
                  currentProject = {
                    id: globalId,
                    label: projName,
                    type: 'proyecto',
                    status: status,
                    career: career,
                    year: year
                  };
                  nodes.push(currentProject);
                  processedNodes.add(globalId);
                } else {
                  currentProject = nodes.find(n => n.id === globalId) || null;
                }
              } else if (currentProject && text.startsWith('Stack:')) {
                // Parsear el Stack como lista de tecnologías separadas por coma
                // Antes: "Python, FastAPI" generaba UN edge con ID que nunca coincidía con ningún nodo
                // Ahora: genera un edge individual por cada tecnología
                const techNames = text.replace('Stack:', '').split(',').map(t => t.trim()).filter(Boolean);
                for (const tn of techNames) {
                  const globalTechId = `${career}-${tn}`;
                  const edgeId = `e-${currentProject.id}-${globalTechId}`;
                  if (!edges.some(e => e.id === edgeId)) {
                    edges.push({
                      id: edgeId,
                      source: globalTechId, // tech → proyecto
                      target: currentProject.id
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error leyendo archivos markdown:", error);
  }

  // BUG-07: Filtrar edges cuyos nodos source/target no existen (evita edges colgados)
  const nodeIds = new Set(nodes.map(n => n.id));
  const cleanEdges = edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

  return { nodes, edges: cleanEdges };
}
