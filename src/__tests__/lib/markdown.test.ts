// ── Mock de fs ANTES de importar markdown.ts ─────────────────────────────────
jest.mock('fs');

import fs from 'fs';
import { getSkillTreeData, getFullContextString, getFilosofiaContextString } from '@/lib/markdown';

// ── Helpers ───────────────────────────────────────────────────────────────────

const YEAR1_CONTENT = `
## Materias
- [x] Matemática I: Álgebra lineal
- [ ] Matemática II: Cálculo
- [/] Física I: Mecánica

## Tecnologías
- [x] Python
- [ ] Git

## Proyectos
- [x] Nombre: Simulador Solar
- [ ] Stack: Python
`;

const YEAR2_CONTENT = `
## Materias
- [x] Matemática I: Álgebra lineal

## Tecnologías
- [x] Python

## Proyectos
- [x] Nombre: Monitor CLI
- [ ] Stack: Python
`;

const TRACKING_FILE = '01_año_1.md';
const TRACKING_FILE_2 = '02_año_2.md';

function setupFsMocks(content = YEAR1_CONTENT, files = [TRACKING_FILE]) {
  const mockedFs = jest.mocked(fs);

  // existsSync siempre true para las rutas de carrera
  mockedFs.existsSync = jest.fn().mockReturnValue(true) as typeof fs.existsSync;

  // readdirSync: para carpeta de '1 Ing Sistemas' devuelve los archivos, resto vacío
  mockedFs.readdirSync = jest.fn().mockImplementation((dir: unknown) => {
    const d = String(dir);
    if (d.includes('1 Ing Sistemas')) return files as unknown as fs.Dirent[];
    return [] as unknown as fs.Dirent[];
  }) as unknown as typeof fs.readdirSync;

  // statSync: ninguno es directorio
  mockedFs.statSync = jest.fn().mockReturnValue({
    isDirectory: () => false,
  }) as unknown as typeof fs.statSync;

  // readFileSync: devuelve el contenido mock para cualquier path
  if (files.length > 1) {
    mockedFs.readFileSync = jest.fn()
      .mockReturnValueOnce(content)
      .mockReturnValueOnce(YEAR2_CONTENT) as unknown as typeof fs.readFileSync;
  } else {
    mockedFs.readFileSync = jest.fn().mockReturnValue(content) as unknown as typeof fs.readFileSync;
  }
}

// ── Tests de parseStatus (indirectos a través de getSkillTreeData) ────────────

describe('getSkillTreeData — parseStatus', () => {
  beforeEach(() => setupFsMocks());

  it('parsea [x] como "completed"', () => {
    const { nodes } = getSkillTreeData();
    const matematica = nodes.find(n => n.label === 'Matemática I');
    expect(matematica?.status).toBe('completed');
  });

  it('parsea [ ] como "locked"', () => {
    const { nodes } = getSkillTreeData();
    const matematicaII = nodes.find(n => n.label === 'Matemática II');
    expect(matematicaII?.status).toBe('locked');
  });

  it('parsea [/] como "progress"', () => {
    const { nodes } = getSkillTreeData();
    const fisica = nodes.find(n => n.label === 'Física I');
    expect(fisica?.status).toBe('progress');
  });
});

// ── Tests de extractYear ──────────────────────────────────────────────────────

describe('getSkillTreeData — extractYear', () => {
  beforeEach(() => setupFsMocks());

  it('asigna year=1 para archivos con año_1', () => {
    const { nodes } = getSkillTreeData();
    expect(nodes.length).toBeGreaterThan(0);
    nodes.forEach(n => expect(n.year).toBe(1));
  });
});

// ── Tests de getSkillTreeData — estructura general ────────────────────────────

describe('getSkillTreeData — parsing', () => {
  beforeEach(() => setupFsMocks());

  it('genera nodos de tipo materia', () => {
    const { nodes } = getSkillTreeData();
    const materias = nodes.filter(n => n.type === 'materia');
    expect(materias.length).toBeGreaterThan(0);
  });

  it('genera nodos de tipo tecnologia', () => {
    const { nodes } = getSkillTreeData();
    const techs = nodes.filter(n => n.type === 'tecnologia');
    expect(techs.length).toBeGreaterThan(0);
  });

  it('genera nodos de tipo proyecto', () => {
    const { nodes } = getSkillTreeData();
    const proyectos = nodes.filter(n => n.type === 'proyecto');
    expect(proyectos.length).toBeGreaterThan(0);
    expect(proyectos[0].label).toBe('Simulador Solar');
  });

  it('asigna career a cada nodo', () => {
    const { nodes } = getSkillTreeData();
    nodes.forEach(n => expect(n.career).toBe('1 Ing Sistemas'));
  });

  it('no duplica nodos con el mismo id', () => {
    // Python aparece tanto en Tecnologías como referenciado en Stack
    const { nodes } = getSkillTreeData();
    const ids = nodes.map(n => n.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });
});

// ── Tests de deduplicación de nodos ──────────────────────────────────────────

describe('getSkillTreeData — deduplicación', () => {
  beforeEach(() => {
    // Dos archivos de año con la misma materia
    const mockedFs = jest.mocked(fs);
    mockedFs.existsSync = jest.fn().mockReturnValue(true) as typeof fs.existsSync;
    mockedFs.readdirSync = jest.fn().mockImplementation((dir: unknown) => {
      const d = dir as string;
      if (d.includes('1 Ing Sistemas')) return ['01_año_1.md', '02_año_2.md'];
      return [];
    }) as typeof fs.readdirSync;
    mockedFs.statSync = jest.fn().mockReturnValue({
      isDirectory: () => false,
    }) as unknown as typeof fs.statSync;
    mockedFs.readFileSync = jest.fn()
      .mockReturnValueOnce(YEAR1_CONTENT)
      .mockReturnValueOnce(YEAR2_CONTENT) as unknown as typeof fs.readFileSync;
  });

  it('no crea nodos duplicados entre años', () => {
    // "Matemática I" aparece en año 1 y año 2 — solo debe haber 1 nodo
    const { nodes } = getSkillTreeData();
    const matematicaI = nodes.filter(n => n.label === 'Matemática I');
    expect(matematicaI.length).toBe(1);
  });
});

// ── Tests de filtrado de edges colgados (BUG-07) ─────────────────────────────

describe('getSkillTreeData — cleanEdges (BUG-07)', () => {
  beforeEach(() => {
    const contentWithOrphanStack = `
## Materias
- [x] Matemática I: Álgebra

## Tecnologías
- [x] Python

## Proyectos
- [x] Nombre: Proyecto X
- [ ] Stack: Python
- [ ] Stack: TechInexistente
`;
    setupFsMocks(contentWithOrphanStack);
  });

  it('filtra edges cuyo source no existe como nodo', () => {
    const { nodes, edges } = getSkillTreeData();
    const nodeIds = new Set(nodes.map(n => n.id));
    const dangling = edges.filter(e => !nodeIds.has(e.source) || !nodeIds.has(e.target));
    expect(dangling.length).toBe(0);
  });
});

// ── Tests de getFullContextString ─────────────────────────────────────────────

describe('getFullContextString', () => {
  beforeEach(() => setupFsMocks());

  it('devuelve un string no vacío', () => {
    const ctx = getFullContextString();
    expect(typeof ctx).toBe('string');
    expect(ctx.length).toBeGreaterThan(0);
  });

  it('respeta el límite de caracteres', () => {
    const limit = 100;
    const ctx = getFullContextString(limit);
    expect(ctx.length).toBeLessThanOrEqual(limit + 50); // +50 por el sufijo de truncado
  });
});

// ── Tests de getFilosofiaContextString ──────────────────────────────────────────

describe('getFilosofiaContextString', () => {
  beforeEach(() => {
    const mockedFs = jest.mocked(fs);

    // existsSync devuelve true para la carpeta Filosofia
    mockedFs.existsSync = jest.fn().mockImplementation((dir: unknown) => {
      return String(dir).includes('Filosofia');
    }) as typeof fs.existsSync;

    // readdirSync devuelve un archivo md y una carpeta (que debe ser ignorada)
    mockedFs.readdirSync = jest.fn().mockImplementation((dir: unknown) => {
      if (String(dir).includes('Filosofia')) {
        return ['01-clean-architecture-solid.md', 'libros'] as unknown as fs.Dirent[];
      }
      return [] as unknown as fs.Dirent[];
    }) as unknown as typeof fs.readdirSync;

    // statSync: el archivo es file, libros es directory
    mockedFs.statSync = jest.fn().mockImplementation((filePath: unknown) => {
      const isDir = String(filePath).includes('libros');
      return {
        isDirectory: () => isDir,
      } as unknown as fs.Stats;
    }) as unknown as typeof fs.statSync;

    // readFileSync devuelve contenido estructurado de filosofia
    mockedFs.readFileSync = jest.fn().mockImplementation((filePath: unknown) => {
      if (String(filePath).includes('01-clean-architecture-solid.md')) {
        return `
# Clean Architecture + SOLID
## Filosofía de Ingeniería de Software
> El negocio debe estar separado de los detalles técnicos.

- **SOLID**: Los cinco principios fundamentales de diseño.
- Viñeta corta que debe incluirse.
Este párrafo no tiene prefijo especial y debe ser ignorado por el filtro para ahorrar tokens.
`;
      }
      return '';
    }) as unknown as typeof fs.readFileSync;
  });

  it('filtra y extrae el contexto de filosofía correctamente', () => {
    const ctx = getFilosofiaContextString();
    expect(ctx).toContain('Filosofía de Ingeniería: Clean Architecture Solid');
    expect(ctx).toContain('# Clean Architecture + SOLID');
    expect(ctx).toContain('## Filosofía de Ingeniería de Software');
    expect(ctx).toContain('> El negocio debe estar separado de los detalles técnicos.');
    expect(ctx).toContain('- **SOLID**: Los cinco principios fundamentales de diseño.');
    expect(ctx).toContain('- Viñeta corta que debe incluirse.');
    // Debe ignorar la línea sin prefijo
    expect(ctx).not.toContain('Este párrafo no tiene prefijo especial');
  });

  it('respeta el límite de caracteres (maxChars)', () => {
    const limit = 50;
    const ctx = getFilosofiaContextString(limit);
    expect(ctx.length).toBeLessThanOrEqual(limit + 60); // +60 por el sufijo de truncado
  });
});
