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
}

export interface SkillEdge {
  id: string;
  source: string;
  target: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'Carreras', '1 Ing Sistemas');

/**
 * Parsea el texto del estado de un checkbox markdown
 */
function parseStatus(checkStr: string): SkillStatus {
  if (checkStr === 'x' || checkStr === 'X') return 'completed';
  if (checkStr === '/') return 'progress';
  return 'locked';
}

/**
 * Procesa un archivo markdown de seguimiento (como 01_año_1.md)
 */
export function getSkillTreeData(): { nodes: SkillNode[]; edges: SkillEdge[] } {
  const nodes: SkillNode[] = [];
  const edges: SkillEdge[] = [];

  try {
    const year1Path = path.join(CONTENT_DIR, 'año 1', '01_año_1.md');
    if (!fs.existsSync(year1Path)) return { nodes, edges };

    const content = fs.readFileSync(year1Path, 'utf8');
    const lines = content.split('\n');

    let currentSection: SkillType | null = null;
    let currentProject: SkillNode | null = null;

    const regexCheck = /-\s\[([ xX\/])\]\s(.+)/;

    for (const line of lines) {
      // Identificar sección
      if (line.startsWith('## Materias')) currentSection = 'materia';
      else if (line.startsWith('## Tecnologías')) currentSection = 'tecnologia';
      else if (line.startsWith('## Proyectos')) currentSection = 'proyecto';

      if (!currentSection) continue;

      const match = line.match(regexCheck);
      if (match) {
        const status = parseStatus(match[1]);
        const text = match[2].trim();

        if (currentSection === 'materia' || currentSection === 'tecnologia') {
          // Extraer nombre (ignorando descripciones despues de ':')
          const namePart = text.split(':')[0].trim();
          nodes.push({
            id: namePart,
            label: namePart,
            type: currentSection,
            status: status,
            description: text
          });
        } 
        else if (currentSection === 'proyecto') {
          if (text.startsWith('Nombre:')) {
            const projName = text.replace('Nombre:', '').trim();
            currentProject = {
              id: projName,
              label: projName,
              type: 'proyecto',
              status: status
            };
            nodes.push(currentProject);
          } else if (currentProject && text.startsWith('Stack:')) {
            // Crear Edge automático del proyecto hacia la tecnología
            const techName = text.replace('Stack:', '').trim();
            edges.push({
              id: `e-${currentProject.id}-${techName}`,
              source: techName, // Depende de la tech
              target: currentProject.id
            });
          }
        }
      }
    }

  } catch (error) {
    console.error("Error leyendo archivos markdown:", error);
  }

  return { nodes, edges };
}
