// ── Mock de fs ANTES de importar markdown.ts ─────────────────────────────────
jest.mock('fs');

import fs from 'fs';
import { getFullContextString, getFilosofiaContextString } from '@/lib/markdown';

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
