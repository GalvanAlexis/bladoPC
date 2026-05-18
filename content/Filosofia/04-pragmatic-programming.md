# Pragmatic Programming

## Filosofía Realista y Adaptativa de Ingeniería de Software

Autores principales:

- Andrew Hunt
- David Thomas

Libro fundamental:

- The Pragmatic Programmer

---

# ¿Qué es Pragmatic Programming?

Pragmatic Programming es una filosofía de desarrollo de software basada en:

- adaptabilidad,
- pensamiento crítico,
- responsabilidad profesional,
- pragmatismo técnico,
- aprendizaje continuo.

La idea central es:

```text
No existe una solución universal.
El contexto importa.
```

Es una de las filosofías más maduras intelectualmente dentro de la ingeniería de software.

No es:

- dogmática,
- fanática,
- rígida técnicamente.

Busca:

- resultados sostenibles,
- ingeniería profesional,
- equilibrio entre teoría y práctica.

---

# Problema que intenta resolver

Muchos desarrolladores caen en extremos:

- seguir reglas ciegamente,
- usar tecnologías por moda,
- sobreingeniería,
- improvisación constante,
- fanatismo arquitectónico.

Pragmatic Programming intenta evitar eso.

La filosofía propone:

```text
Pensar antes de aplicar patrones o tecnologías.
```

---

# Filosofía central

El pragmatismo significa:

```text
Elegir la mejor solución posible
según el contexto real.
```

No:

- la solución más elegante,
- la más académica,
- la más popular,
- la más compleja.

---

# Idea profunda

Un ingeniero pragmático entiende que:

- toda decisión tiene trade-offs,
- no existen arquitecturas perfectas,
- el software vive en el mundo real,
- el tiempo y recursos son limitados.

---

# Principios fundamentales

---

# 1. Responsabilidad personal

Uno de los principios más importantes.

La filosofía dice:

```text
Tu código es tu responsabilidad.
```

No:

- el framework,
- el manager,
- el equipo,
- la empresa.

---

# Implica

- escribir código mantenible,
- entender consecuencias,
- pensar a largo plazo,
- evitar excusas técnicas.

---

# Filosofía profesional

El programador no es:

- un simple operador.

Es:

- un ingeniero responsable del sistema.

---

# 2. Pensamiento crítico

Pragmatic Programming rechaza:

- dogmas,
- fanatismos,
- modas tecnológicas.

Ejemplo:

```text
Microservicios no siempre son mejores.
```

o:

```text
Clean Architecture no siempre es necesaria.
```

---

# Idea central

```text
Entiende el problema antes de aplicar soluciones.
```

---

# 3. DRY

## Don't Repeat Yourself

Uno de los conceptos más famosos.

La idea:

```text
Cada conocimiento debe tener
una única representación.
```

---

# Problema que intenta resolver

Duplicación produce:

- inconsistencias,
- bugs,
- mantenimiento caro.

---

# Ejemplo malo

```ts
const TAX = 0.21;
```

repetido en:

- frontend,
- backend,
- reportes,
- scripts.

---

# Problema

Si cambia:

- todo puede romperse.

---

# Importante

DRY no significa:

- obsesión por abstraer todo.

Eso es una mala interpretación moderna.

---

# 4. Orthogonality

## Ortogonalidad

Uno de los conceptos más profundos del libro.

La idea:

```text
Los componentes deben afectar lo menos posible a otros componentes.
```

---

# Objetivo

Reducir:

- acoplamiento,
- dependencia,
- efectos colaterales.

---

# Ejemplo

Cambiar:

- base de datos

NO debería romper:

- lógica de negocio,
- frontend,
- autenticación.

---

# Relación

Muy relacionado con:

- Clean Architecture,
- SOLID,
- modularidad.

---

# 5. Automatización

La filosofía insiste mucho en:

```text
Automatiza todo lo repetitivo.
```

---

# Ejemplos

- testing,
- deploy,
- linting,
- formateo,
- builds,
- CI/CD,
- backups.

---

# Filosofía

La repetición manual:

- genera errores humanos.

---

# 6. Tracer Bullets

## Desarrollo incremental guiado

Concepto muy importante.

La idea:

```text
Construye versiones pequeñas funcionales
para validar dirección.
```

No:

- diseñar gigantesco sistema abstracto sin feedback.

---

# Diferencia con prototipo

Tracer Bullets:

- sí forman parte del sistema final.

---

# Beneficios

- feedback rápido,
- validación temprana,
- reducción de riesgo.

---

# 7. Prototipos

Pragmatic Programming acepta:

- experimentar,
- validar ideas.

Pero:

- diferencia prototipo
  de
- producción.

---

# Filosofía importante

```text
Un prototipo no es automáticamente software productivo.
```

Muchas empresas fallan porque:

- convierten hacks temporales
  en sistemas permanentes.

---

# 8. Aprendizaje continuo

Uno de los pilares filosóficos.

La idea:

```text
La tecnología cambia constantemente.
```

Por lo tanto:

- el ingeniero debe evolucionar siempre.

---

# Recomiendan

- aprender lenguajes nuevos,
- paradigmas distintos,
- herramientas diferentes,
- lectura técnica constante.

---

# 9. Evitar programación por coincidencia

Concepto extremadamente importante.

Ejemplo malo:

```text
"No sé por qué funciona,
pero funciona."
```

---

# Problema

Eso genera:

- sistemas frágiles,
- bugs impredecibles,
- deuda técnica.

---

# Filosofía

```text
Comprende completamente lo que haces.
```

---

# 10. Código comunicativo

El código debe:

- expresar intención,
- ser legible,
- ser mantenible.

---

# Idea central

```text
El código se lee más de lo que se escribe.
```

---

# 11. Pensar en trade-offs

Pragmatic Programming ama el concepto de:

```text
Trade-offs
```

Toda decisión técnica tiene:

- ventajas,
- costos,
- limitaciones.

---

# Ejemplo

Microservicios:

- mejor escalabilidad,
- peor complejidad operativa.

---

# Filosofía pragmática

No existe:

- arquitectura perfecta.

Solo:

- arquitectura adecuada al contexto.

---

# Relación con Agile

Pragmatic Programming influyó muchísimo en:

- Agile,
- XP,
- DevOps,
- cultura moderna de ingeniería.

---

# Diferencia importante

Agile:

- más organizacional.

Pragmatic Programming:

- más filosófico e ingenieril.

---

# Relación con Clean Code

Compatibles.
Pero Pragmatic Programming:

- es menos rígido,
- menos dogmático.

---

# Diferencia clave

Clean Code a veces dice:

```text
"Esto debe hacerse así."
```

Pragmatic Programming suele decir:

```text
"Depende del contexto."
```

---

# Relación con Unix Philosophy

Muy compatible.

Comparten:

- simplicidad,
- modularidad,
- pragmatismo,
- herramientas pequeñas,
- automatización.

---

# Ventajas reales

# 1. Flexibilidad mental

Evita fanatismo técnico.

---

# 2. Excelente para seniors

Porque obliga a:

- pensar,
- analizar trade-offs,
- entender contexto.

---

# 3. Muy adaptable

Funciona en:

- startups,
- enterprise,
- backend,
- cloud,
- IA,
- DevOps.

---

# 4. Reduce sobreingeniería

Importante.

---

# 5. Profesionalismo técnico

Promueve:

- responsabilidad,
- disciplina,
- pensamiento crítico.

---

# 6. Excelente para arquitectura moderna

Muy compatible con:

- Clean Architecture,
- DDD,
- DevOps,
- cloud-native.

---

# Desventajas reales

# 1. Difícil para juniors

Porque:

- no da reglas rígidas.

---

# 2. Puede malinterpretarse

Algunos confunden:

- pragmatismo
  con
- improvisación.

No es lo mismo.

---

# 3. Requiere experiencia

Los trade-offs reales:

- se entienden con años.

---

# Crítica implícita a dogmas

Pragmatic Programming critica indirectamente:

- fanatismo SOLID,
- sobrearquitectura,
- frameworks gigantes,
- reglas absolutas.

---

# Filosofía profunda

La idea profunda del libro es:

```text
La ingeniería de software es una disciplina práctica.
```

No:

- una religión,
- un conjunto de rituales,
- un catálogo de reglas fijas.

---

# Ingeniero pragmático ideal

Un programador pragmático:

- entiende fundamentos,
- analiza contexto,
- evita fanatismos,
- aprende constantemente,
- automatiza,
- piensa a largo plazo,
- prioriza mantenibilidad real.

---

# Influencia moderna

Pragmatic Programming influyó muchísimo en:

- DevOps
- Agile
- Clean Code
- XP
- backend moderno
- cultura senior engineering
- arquitectura cloud

---

# Tecnologías donde encaja muy bien

Backend:

- NestJS
- Spring Boot
- FastAPI
- .NET

Infraestructura:

- Docker
- Kubernetes

Cloud:

- AWS
- GCP
- Azure

DevOps:

- GitHub Actions
- Terraform

---

# Relación con tu perfil

Por lo que vienes preguntando:

- arquitectura,
- backend,
- robustez,
- planificación,
- sistemas profesionales,

Pragmatic Programming probablemente te aporte algo muy importante:

```text
Evitar rigidez excesiva.
```

Porque:

- estructura fuerte es buena,
  pero:
- exceso de rigidez puede volverse burocracia técnica.

Pragmatic Programming ayuda a:

- mantener criterio,
- adaptabilidad,
- pensamiento estratégico.

---

# Conclusión

Pragmatic Programming es una filosofía de:

- pensamiento crítico,
- responsabilidad profesional,
- adaptabilidad,
- ingeniería realista,
- pragmatismo técnico.

No busca:

- perfección académica,
- dogmas,
- arquitectura por moda.

Busca:

- software sostenible,
- decisiones inteligentes,
- equilibrio técnico,
- mantenibilidad real,
- ingeniería profesional madura.
