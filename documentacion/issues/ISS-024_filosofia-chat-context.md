# ISS-024 — Conectar Carpeta Filosofía con Blado y Chat

**Estado:** 🔴 OPEN  
**Prioridad:** 🔴 Alta  
**Etiquetas:** `chat`, `markdown`, `context`, `api`  

---

## Descripción

Actualmente, el diablillo guardián **Blado** solo conoce los apuntes académicos del estudiante en `content/Carreras` (a través de `getFullContextString`), lo cual le permite hablar sobre materias (Álgebra, Física, etc.), tecnologías y proyectos.

Sin embargo, el estudiante ha creado una carpeta de **Filosofía de Ingeniería de Software** en `content/Filosofia` que contiene 5 pilares fundamentales:
1. **Clean Architecture + SOLID**
2. **Domain-Driven Design (DDD)**
3. **Unix Philosophy**
4. **Pragmatic Programming**
5. **DevOps + Platform Engineering**

Este ISS propone **conectar la carpeta Filosofía con Blado**, permitiéndole devorar este conocimiento e incorporarlo en su "Grimorio" para responder preguntas de reclutadores sobre patrones de diseño, clean code, arquitectura y prácticas modernas de desarrollo, todo en su icónico estilo RPG travieso.

---

## Análisis de Viabilidad

### ¿Es viable?
**Sí, 100% viable.** Los archivos markdown en `content/Filosofia` ya existen y son ricos en información técnica y definiciones. 
El principal desafío es el **límite de tokens/caracteres** en la API de Groq (`llama3-70b-8192`). Si cargamos los 5 archivos completos (~3,500 líneas en total), excederíamos el presupuesto óptimo y haríamos la consulta muy lenta o costosa.

### Solución propuesta:
1. Implementar un **filtro inteligente** para extraer únicamente los conceptos clave de cada archivo en `content/Filosofia`.
2. Conservar líneas de títulos (`#`, `##`), citas y lemas (`>`), y viñetas claves con definiciones (`- **Concepto**: Definición` o `- Concepto`).
3. Estructurar este contenido en una nueva función `getFilosofiaContextString(maxChars)` en `src/lib/markdown.ts`.
4. Combinar ambos contextos (Académico y Filosófico) en la API Route `/api/chat`, asignándoles un presupuesto balanceado de caracteres (ej. 10,000 para Carreras y 8,000 para Filosofía).

---

## Pasos de implementación

### 1. Implementar parser en `src/lib/markdown.ts`
Crear la función `getFilosofiaContextString(maxChars)`:
- Leer todos los archivos `.md` en la carpeta `content/Filosofia` (excluyendo subcarpetas como `libros/`).
- Filtrar cada línea con un criterio inteligente:
  ```typescript
  const relevant = lines.filter(line => {
    const t = line.trim();
    if (!t) return false;
    if (t.startsWith('#')) return true; // Títulos de secciones
    if (t.startsWith('>')) return true; // Bloques de citas / Lemas centrales
    if (t.startsWith('- **') || t.startsWith('* **')) return true; // Conceptos en negrita
    if (t.startsWith('-') && t.length < 120) return true; // Balas cortas informativas
    return false;
  });
  ```
- Retornar un string formateado como:
  ```markdown
  === Filosofía de Ingeniería: [Nombre del Archivo] ===
  [Líneas relevantes filtradas]
  ```

### 2. Integrar en la API Route `src/app/api/chat/route.ts`
- Importar `getFilosofiaContextString`.
- Obtener ambos fragmentos de contexto:
  ```typescript
  const carrerasContext = getFullContextString(10000);
  const filosofiaContext = getFilosofiaContextString(8000);
  ```
- Actualizar el `systemPrompt` para añadir la sección del Grimorio de Filosofía de Ingeniería de Software:
  ```typescript
  const systemPrompt = `
  ...
  A continuación te paso el "Grimorio" completo de apuntes académicos:
  ---
  ${carrerasContext}
  ---

  Y el "Grimorio de Filosofía de Ingeniería de Software" (mis convicciones y mejores prácticas de diseño):
  ---
  ${filosofiaContext}
  ---

  Instrucciones:
  ...
  5. Cuando los reclutadores te pregunten sobre metodologías de desarrollo, calidad de código o arquitectura de software, usa la sección de Filosofía de Ingeniería para deleitarlos con conceptos como SOLID, DDD (Domain-Driven Design), Unix Philosophy, acoplamiento, cohesión, automatización y observabilidad.
  `;
  ```

### 3. Crear Tests Unitarios
En `src/__tests__/lib/markdown.test.ts`, agregar pruebas para:
- Comprobar que `getFilosofiaContextString` lee correctamente los archivos de `content/Filosofia`.
- Verificar que el filtro ignora bloques de código extensos o PDF de libros pero extrae correctamente títulos y conceptos principales.
- Asegurar que respeta el límite de caracteres (`maxChars`).

---

## Archivos a crear/modificar

| Archivo | Acción | Descripción |
|---|---|---|
| `src/lib/markdown.ts` | Modificar | Agregar `getFilosofiaContextString()` |
| `src/app/api/chat/route.ts` | Modificar | Integrar el nuevo contexto filosófico en el prompt de Blado |
| `src/__tests__/lib/markdown.test.ts` | Modificar | Agregar tests para el extractor de contexto filosófico |

---

## Criterios de aceptación

- [ ] `getFilosofiaContextString` extrae con éxito títulos, citas y conceptos en negrita de `content/Filosofia`.
- [ ] La API Route `/api/chat` concatena el contexto académico y el filosófico correctamente sin crashear.
- [ ] Blado responde preguntas sobre "SOLID", "Clean Architecture", "Domain-Driven Design (DDD)" o "Unix Philosophy" con argumentos técnicos exactos de los apuntes, sin perder su personalidad traviesa de diablillo.
- [ ] `npm run test` pasa al 100% de manera exitosa.
- [ ] `npm run build` compila a producción sin lints o errores de tipado TypeScript.

---

## Estimación

~45 minutos
