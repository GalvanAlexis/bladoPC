# ISS-014 — Parsear multi-año dentro de cada carrera

**Estado:** ✅ CLOSED  
**Prioridad:** 🟡 Media  
**Etiquetas:** `feature`, `data`, `markdown`  
**Depende de:** ISS-009  
**Bloquea:** ISS-011  

---

## Descripción

Dentro de `1 Ing Sistemas` ya existen archivos `02_año_2.md`, `03_año_3.md`, etc., en la raíz de la carpeta de carrera, además del subdirectorio `año 1/`. Estos archivos no se leen actualmente.

## Estructura actual detectada

```
content/Carreras/1 Ing Sistemas/
├── año 1/
│   └── 01_año_1.md      ← YA PARSEADO
├── año 2/               ← CARPETA EXISTE, contenido desconocido
├── 02_año_2.md          ← NO PARSEADO (en raíz de carrera)
├── 03_año_3.md          ← NO PARSEADO
├── 04_año_4.md          ← NO PARSEADO
├── 05_año_5.md          ← NO PARSEADO
├── 06_año_6.md          ← NO PARSEADO
└── ingenieria_en_sistemas.md  ← Descripción general de carrera
```

> ⚠️ Hay redundancia: los años están tanto como archivos `.md` directos como en carpetas. Hay que auditar si tienen el mismo contenido o son complementarios.

## Tareas

### 1. Auditar los archivos existentes
- [ ] Leer `02_año_2.md` y comparar con el contenido de `año 2/`
- [ ] Determinar si son el mismo formato que `01_año_1.md`
- [ ] Documentar la estructura real

### 2. Actualizar el parser para leer todos los años
```typescript
// Estrategia sugerida: leer todos los .md de una carrera
function getCareerFiles(careerDir: string): string[] {
  const files: string[] = [];
  
  // 1. Buscar archivos en subdirectorios (año 1/, año 2/, etc.)
  const subdirs = fs.readdirSync(careerDir)
    .filter(f => fs.statSync(path.join(careerDir, f)).isDirectory());
  
  for (const dir of subdirs) {
    const subpath = path.join(careerDir, dir);
    const mdFiles = fs.readdirSync(subpath).filter(f => f.endsWith('.md'));
    files.push(...mdFiles.map(f => path.join(subpath, f)));
  }
  
  // 2. Buscar archivos en la raíz de la carrera (02_año_2.md, etc.)
  const rootMds = fs.readdirSync(careerDir)
    .filter(f => f.match(/^\d+_año_\d+\.md$/))
    .map(f => path.join(careerDir, f));
  
  files.push(...rootMds);
  return files;
}
```

### 3. Agregar `year` al SkillNode
```typescript
// Extraer el año del nombre del archivo o de la carpeta
function extractYear(filePath: string): number {
  const match = filePath.match(/(\d+)_año_(\d+)/) || filePath.match(/año\s*(\d+)/);
  return match ? parseInt(match[2] || match[1]) : 0;
}
```

## Criterios de aceptación

- [ ] Se auditan los archivos de años 2-6 para confirmar el formato
- [ ] El parser lee todos los años disponibles en cada carrera
- [ ] Cada nodo tiene `year` como metadato
- [ ] El Skill Tree puede filtrar por año además de por carrera

## Estimación

~2-3 horas (incluye auditoría de archivos)
