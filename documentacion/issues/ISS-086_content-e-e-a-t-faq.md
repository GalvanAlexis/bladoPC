# ISS-086: Contenido E-E-A-T, keywords locales y FAQ section

## Resumen
Reforzar las senales de E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) en el contenido del home, agregar keywords locales estrategicas de forma natural, y crear una seccion FAQ para capturar busquedas de voz y AI Agents.

## Archivos a modificar
- src/components/home/HeroSection.tsx
- src/components/home/ServicesSection.tsx
- src/components/home/AboutSection.tsx
- src/components/home/SkillsSection.tsx
- src/components/home/StatsSection.tsx
- src/components/home/ContactSection.tsx
- src/components/home/HomeLayout.tsx
- src/lib/structured-data.ts (si se creo en ISS-084)

## Archivos nuevos
- src/components/home/FAQSection.tsx
- src/data/faq-data.ts

## Tareas

### HeroSection: reforzar propuesta local
- [ ] El badge actual dice "Soporte IT / Soluciones Digitales / Ciencia de Datos" -> agregar "en Chascomus" al final
- [ ] Evaluar si las preguntas animadas cubren busquedas reales de clientes
- [ ] Agregar una pregunta mas orientada a negocio local: "Necesitas una pagina web para tu negocio?"

### AboutSection: senales de E-E-A-T
- [ ] Agregar seccion de "Certificaciones y formacion" con badges visibles (no solo en modal)
- [ ] Agregar metricas de experiencia al About (proyectos, clientes, anos) si no estan
- [ ] Mencionar explícitamente "Chascomus" en el texto de perfil tecnico
- [ ] Agregar enlace a LinkedIn/GitHub verificable (authority signal)
- [ ] Considerar agregar foto de perfil profesional (trustworthiness)

### StatsSection: reforzar con datos reales
- [ ] Los stats actuales (15 proyectos, 12 clientes, 5 anos, 20 tecnologias) deben tener contexto
- [ ] Agregar aria-labels descriptivos en cada contador animado

### ServicesSection: keywords de servicios locales
- [ ] En el tag "Exclusivo Chascomus", expandir a keywords naturales
- [ ] Agregar "Chascomus" en las descripciones de servicio donde aplique
- [ ] Agregar boton CTA "Contratar servicio en Chascomus" o similar

### FAQSection: capturar busquedas de voz y AI Agents (NUEVO)
- [ ] Crear `src/data/faq-data.ts` con preguntas y respuestas reales basadas en:
  - "Que servicios de desarrollo web ofreces?"
  - "Cuanto cuesta desarrollar una pagina web?"
  - "Haces reparacion de PC en Chascomus?"
  - "Que tecnologias usas?"
  - "Tomas proyectos remotos?"
  - "Que es Blado? Como funciona el asistente IA?"
  - "Cuanto tiempo toma desarrollar un sitio web?"
  - "Ofreces soporte continuo despues del proyecto?"
- [ ] Crear `FAQSection.tsx` con schema JSON-LD FAQPage incluido inline
- [ ] La FAQ debe ser expandible/collapsable (accordion) con `<details>` / `<summary>` nativo de HTML para que Google indexe el contenido inmediatamente
- [ ] El componente debe inyectar el schema FAQPage en el head
- [ ] Integrar FAQSection en HomeLayout despues de SkillsSection y antes de ContactSection

### ContactSection: confianza y ubicacion
- [ ] Agregar disponibilidad explicita: "Disponible para proyectos en Chascomus y remoto"
- [ ] Agregar respuesta tipica: "Respondo en menos de 24h"
- [ ] El telefono debe tener link `tel:+542241567142` para mobile

### Optimizacion de keywords locales (general)
- [ ] Keywords naturales a integrar sin saturar:
  - "desarrollador web Chascomus"
  - "desarrollo software Chascomus"  
  - "reparacion de PC Chascomus"
  - "automatizaciones Chascomus"
  - "cientifico de datos Chascomus"
- [ ] Cada keyword debe aparecer 1-2 veces de forma natural en el contenido visible
- [ ] En el schema JSON-LD (ISS-084) ya se cubre la ubicacion y servicio

## QA
- [ ] npm test
- [ ] npm run build
- [ ] Verificar que FAQPage schema aparezca en Rich Results Test
- [ ] Verificar que no haya keyword stuffing (penalizable)
- [ ] Leer el home completo en voz alta para verificar naturalidad del texto

## Branch
`feature/ISS-086-content-eeat-faq`
