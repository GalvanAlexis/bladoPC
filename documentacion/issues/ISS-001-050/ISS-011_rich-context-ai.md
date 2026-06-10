# ISS-011 — Contexto enriquecido para IA Blado

**Estado:** 🔴 OPEN  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `ai`, `groq`  
**Depende de:** ISS-009  

---

## Descripción

El contexto actual que recibe Blado es solo una lista de nombres + estado de nodos:
```
- [MATERIA] Álgebra: Estado -> completed
- [TECNOLOGIA] Python: Estado -> completed
```

Esto es insuficiente para responder preguntas profundas sobre qué aprendió el creador, cómo funciona un proyecto, o qué involucra una materia.

## Problema actual

```typescript
// route.ts — contexto actual
const contextLines = nodes.map(n => 
  `- [${n.type.toUpperCase()}] ${n.label}: Estado -> ${n.status}`
);
```

Blado no puede responder: "¿Qué aprendiste en Cálculo I?" o "¿Cómo funciona InmoVoz?"

## Solución propuesta

### 1. Leer el contenido completo de los `.md`

```typescript
// lib/markdown.ts — nueva función
export function getFullContextString(): string {
  const sections: string[] = [];
  
  // Lee todos los .md y extrae su contenido completo
  const allFiles = getAllMarkdownFiles();
  for (const { career, year, content } of allFiles) {
    sections.push(`\n=== ${career} — Año ${year} ===\n${content}`);
  }
  
  return sections.join('\n');
}
```

### 2. Usar `gray-matter` para leer frontmatter

Si los `.md` tienen frontmatter YAML, extraer metadatos adicionales:
```markdown
---
carrera: Ingeniería en Sistemas
año: 1
periodo: 2024
---
## Materias
...
```

### 3. Sistema RAG básico (opcional, avanzado)

Para evitar sobrepasar el límite de tokens de Groq, implementar búsqueda semántica simple:
- Dividir el contenido en chunks de ~500 caracteres
- Buscar los chunks más relevantes a la pregunta del usuario (por keyword matching)
- Solo enviar los top-3 chunks como contexto

### 4. Actualizar system prompt

```typescript
const systemPrompt = `
Eres "Blado", guardián del conocimiento de Alexis Galván.

GRIMORIO COMPLETO:
${fullContextString}

INSTRUCCIONES:
1. Usa el Grimorio para responder con detalles técnicos reales
2. Si el conocimiento no está en el Grimorio, dilo claramente
3. Mantén el roleplay oscuro pero sé técnicamente preciso
4. Para proyectos: menciona stack, objetivo, aprendizajes
5. Para materias: menciona temas clave que aparecen en los apuntes
`;
```

## Criterios de aceptación

- [ ] La API lee el contenido completo de los `.md` (no solo nombres)
- [ ] El contexto incluye descripciones de materias, proyectos y tecnologías
- [ ] Blado puede responder preguntas sobre contenido específico de las materias
- [ ] El token count del contexto no supera 4000 tokens (límite safe para Groq)
- [ ] Si el contexto es muy largo, se aplica truncado o chunking básico

## Estimación

~4-5 horas de desarrollo
