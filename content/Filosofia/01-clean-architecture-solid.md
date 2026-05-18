# Clean Architecture + SOLID

## Filosofía de Ingeniería de Software Moderna

Autor principal:

- Robert C. Martin ("Uncle Bob")

Libros fundamentales:

- Clean Code
- Clean Architecture
- The Clean Coder

---

# ¿Qué es realmente Clean Architecture?

Clean Architecture es una filosofía de diseño de software enfocada en:

- Robustez
- Escalabilidad
- Mantenibilidad
- Separación de responsabilidades
- Independencia tecnológica
- Claridad estructural

La idea principal es:

> El negocio debe estar separado de los detalles técnicos.

Es decir:

- la lógica del negocio no debería depender de:
  - frameworks,
  - bases de datos,
  - APIs,
  - UI,
  - librerías externas.

Porque esas cosas cambian constantemente.

Mientras que:

- las reglas de negocio,
- la lógica central,
- el dominio real,

deberían permanecer estables.

---

# Problema que intenta resolver

Sin arquitectura limpia, muchos proyectos terminan así:

- lógica mezclada con UI,
- SQL dentro del controlador,
- reglas de negocio dentro del frontend,
- dependencias cruzadas,
- código imposible de testear,
- acoplamiento extremo,
- "código espagueti".

Resultado:

- mantenimiento caro,
- bugs constantes,
- onboarding difícil,
- refactorización peligrosa,
- deuda técnica acumulativa.

Clean Architecture intenta evitar eso mediante estructura estricta.

---

# Principio fundamental

## Dependencia hacia adentro

La regla más importante:

> Las dependencias siempre apuntan hacia el núcleo del sistema.

Nunca al revés.

---

# Estructura clásica por capas

La arquitectura suele representarse como círculos concéntricos.

```text
+-----------------------------------+
| Frameworks / Drivers              |
| Express / NestJS / PostgreSQL     |
+-----------------------------------+

+-----------------------------------+
| Interface Adapters                |
| Controllers / Presenters / DTOs   |
+-----------------------------------+

+-----------------------------------+
| Use Cases                         |
| Lógica de aplicación              |
+-----------------------------------+

+-----------------------------------+
| Entities                          |
| Reglas del dominio                |
+-----------------------------------+
```

---

# Explicación de cada capa

# 1. Entities (Dominio)

Es el núcleo más importante.

Contiene:

- reglas de negocio puras,
- entidades,
- lógica central.

NO debe conocer:

- HTTP,
- SQL,
- React,
- NestJS,
- MongoDB,
- frameworks.

Ejemplo:

- Usuario
- Factura
- Pedido
- Transacción bancaria

## Características

- Código puro
- Alta estabilidad
- Independencia tecnológica
- Reutilizable

---

# 2. Use Cases

Contiene:

- casos de uso,
- lógica de aplicación,
- orquestación del sistema.

Ejemplos:

- Crear usuario
- Realizar pago
- Iniciar sesión
- Generar factura

El caso de uso:

- coordina entidades,
- valida reglas,
- ejecuta flujo de negocio.

## Importante

Aquí NO debería haber:

- SQL directo,
- Express,
- React,
- UI.

---

# 3. Interface Adapters

Adaptadores entre el mundo externo y el núcleo.

Ejemplos:

- Controllers
- DTOs
- Presenters
- Mappers
- Gateways

Transforman:

- JSON,
- HTTP,
- requests,
- responses,
- datos externos

en estructuras internas del sistema.

---

# 4. Frameworks & Drivers

Es la capa más externa.

Incluye:

- NestJS
- Express
- PostgreSQL
- MongoDB
- Redis
- Docker
- RabbitMQ

La filosofía dice:

> Los frameworks son herramientas, no el centro del sistema.

Esto es extremadamente importante.

Muchos proyectos están mal diseñados porque:

- "la aplicación ES el framework".

En Clean Architecture:

- el framework es reemplazable.

---

# ¿Qué es SOLID?

SOLID es un conjunto de principios de diseño OO.

Son la base filosófica de Clean Architecture.

---

# S — Single Responsibility Principle

## Una clase = una responsabilidad

Malo:

```ts
class UserService {
  createUser() {}
  sendEmail() {}
  generatePDF() {}
  saveToDatabase() {}
}
```

Bueno:

```ts
class UserCreator {}
class EmailSender {}
class PDFGenerator {}
class UserRepository {}
```

## Objetivo

Reducir complejidad y acoplamiento.

---

# O — Open/Closed Principle

## Abierto para extensión, cerrado para modificación

La idea:

- agregar comportamiento,
- sin romper código existente.

Muy usado con:

- interfaces,
- polimorfismo,
- estrategias.

---

# L — Liskov Substitution Principle

## Las subclases deben poder reemplazar a la clase base

Si una clase hija rompe comportamiento esperado:

- el diseño está mal.

---

# I — Interface Segregation Principle

## Interfaces pequeñas y específicas

Malo:

```ts
interface Animal {
  fly();
  swim();
  walk();
}
```

Porque:

- un perro no vuela.

Bueno:

- interfaces separadas.

---

# D — Dependency Inversion Principle

## Depender de abstracciones

Malo:

```ts
class UserService {
  db = new PostgreSQLDatabase();
}
```

Bueno:

```ts
class UserService {
  constructor(private db: DatabaseInterface)
}
```

Esto permite:

- testing,
- reemplazo,
- desacoplamiento.

---

# Inyección de Dependencias (DI)

Muy importante.

La idea:

- las dependencias vienen desde afuera.

Ejemplo:

- NestJS Dependency Injection.

Ventajas:

- testing fácil,
- desacoplamiento,
- modularidad.

---

# Testing en Clean Architecture

Una gran ventaja:

- el núcleo puede testearse sin infraestructura.

Puedes probar:

- lógica de negocio,
- casos de uso,
- validaciones

sin:

- base de datos,
- servidor,
- APIs.

Esto es enorme en sistemas serios.

---

# Arquitectura típica en NestJS

Ejemplo:

```text
src/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── services/
│
├── application/
│   ├── use-cases/
│   └── dto/
│
├── infrastructure/
│   ├── database/
│   ├── repositories/
│   └── external-services/
│
├── interfaces/
│   ├── http/
│   └── controllers/
│
└── main.ts
```

---

# Ventajas reales

# 1. Escalabilidad

El proyecto puede crecer durante años.

---

# 2. Mantenibilidad

Más fácil modificar sin romper todo.

---

# 3. Testing profesional

Tests unitarios muy sólidos.

---

# 4. Bajo acoplamiento

Componentes independientes.

---

# 5. Reemplazo tecnológico

Puedes cambiar:

- PostgreSQL,
- MongoDB,
- Express,
- NestJS

sin destruir el negocio.

---

# 6. Equipos grandes

Muy importante para:

- empresas,
- fintech,
- bancos,
- SaaS grandes.

---

# Desventajas reales

# 1. Complejidad

Puede ser excesiva para proyectos pequeños.

---

# 2. Mucha estructura

Más carpetas,
más interfaces,
más abstracciones.

---

# 3. Curva de aprendizaje

Difícil para juniors.

---

# 4. Riesgo de sobreingeniería

Muchos desarrolladores:

- crean capas innecesarias,
- abstraen demasiado,
- complican sistemas simples.

---

# Críticas modernas

Actualmente hay críticas importantes.

Algunos ingenieros dicen que:

- Clean Architecture exagera abstracciones,
- SOLID se usa dogmáticamente,
- demasiadas interfaces dañan legibilidad,
- exceso de capas reduce productividad.

Especialmente en:

- startups,
- productos rápidos,
- MVPs.

---

# Cuándo usarla

## Excelente para

- Backend serio
- APIs grandes
- SaaS
- Sistemas bancarios
- ERP
- IA empresarial
- Microservicios
- Sistemas distribuidos

---

## Mala opción para

- Scripts simples
- MVP ultra rápido
- Proyectos pequeños
- Prototipos
- Apps descartables

---

# Relación con DDD

DDD y Clean Architecture suelen combinarse.

DDD:

- modela el negocio.

Clean Architecture:

- organiza el sistema.

Juntas forman una arquitectura extremadamente profesional.

---

# Stack moderno típico

Frontend:

- React
- Next.js

Backend:

- NestJS
- Fastify

Base de datos:

- PostgreSQL

Infraestructura:

- Docker
- Kubernetes

Mensajería:

- RabbitMQ
- Kafka

Observabilidad:

- Prometheus
- Grafana

CI/CD:

- GitHub Actions

---

# Filosofía profunda detrás de Clean Architecture

La idea central realmente es:

> El software debe sobrevivir al tiempo.

Los frameworks cambian.
Las bases de datos cambian.
Las modas cambian.

Pero:

- las reglas del negocio,
- la lógica central,
- el dominio,

deben permanecer estables.

Clean Architecture intenta proteger eso.

---

# Conclusión

Clean Architecture es:

- una filosofía de robustez,
- organización,
- mantenibilidad,
- ingeniería profesional.

Es especialmente poderosa para:

- backend,
- sistemas complejos,
- equipos grandes,
- software de larga vida útil.

No busca velocidad inmediata.

Busca:

- estabilidad,
- claridad,
- escalabilidad,
- longevidad técnica.
