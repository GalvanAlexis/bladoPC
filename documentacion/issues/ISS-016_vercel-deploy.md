# ISS-016 — Deploy a Vercel

**Estado:** 🔴 OPEN  
**Prioridad:** 🟢 Baja  
**Etiquetas:** `devops`, `deploy`  
**Depende de:** ISS-013 (variables de entorno)  

---

## Descripción

El proyecto necesita un URL público para compartir con recruiters y tech leads. Vercel es la plataforma ideal para proyectos Next.js (integración nativa, serverless functions para `/api/chat`).

## Pasos para el deploy

### 1. Verificar el build local primero
```bash
npm run build
# Debe terminar sin errores TypeScript ni warnings críticos
```

> ⚠️ Verificar que no haya errores de Server Components importando módulos de cliente, o uso de `fs` en código de cliente.

### 2. Preparar el repositorio
- [ ] Confirmar que `content/` está incluido en el repo (no en `.gitignore`)
  - Los archivos `.md` son la fuente de datos → **DEBEN** estar en el repositorio
- [ ] Confirmar que `public/` con los assets está commiteado
- [ ] `.env.local` NO debe estar commiteado

### 3. Configurar Vercel

```bash
# Opción A: Vercel CLI
npx vercel

# Opción B: Dashboard
# 1. Ir a vercel.com
# 2. "Add New Project" → Import Git Repository
# 3. Seleccionar GalvanAlexis/Progresos-Academicos
# 4. Framework: Next.js (detectado automático)
# 5. Build Command: npm run build
# 6. Output Directory: .next
```

### 4. Configurar variables de entorno en Vercel
En el dashboard de Vercel → Settings → Environment Variables:
```
GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. Verificar el deploy

Checklist post-deploy:
- [ ] La página carga en `https://[project].vercel.app`
- [ ] Los backgrounds y sprites cargan correctamente
- [ ] El diálogo de Blado funciona (scripted)
- [ ] El chat con IA responde (POST a `/api/chat` funciona)
- [ ] El Skill Tree se abre y muestra nodos

## Consideraciones especiales para Next.js con `fs`

La función `getSkillTreeData()` usa `fs.readFileSync`. En Vercel (serverless), el sistema de archivos es de solo lectura pero accesible si los archivos están en el bundle.

```typescript
// next.config.ts — verificar que los md están incluidos
// No debería requerir configuración extra para archivos en /content
```

> ⚠️ Si hay problemas con `fs` en producción, la alternativa es usar `next.config.ts` para copiar los archivos al build output, o migrar a una solución basada en API estática.

## Criterios de aceptación

- [ ] `npm run build` termina sin errores
- [ ] El proyecto está en Vercel con URL público
- [ ] `GROQ_API_KEY` configurada en Vercel
- [ ] El chat de Blado funciona en producción
- [ ] URL compartible para recruiters

## Estimación

~1-2 horas (incluyendo resolución de posibles problemas de build)
