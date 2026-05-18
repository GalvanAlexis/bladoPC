# Domain-Driven Design (DDD)

## Filosofía de Modelado de Software Complejo

Autor principal:

- Eric Evans

Libro fundamental:

- Domain-Driven Design: Tackling Complexity in the Heart of Software

---

# ¿Qué es Domain-Driven Design?

DDD (Domain-Driven Design) es una filosofía de ingeniería de software enfocada en:

- modelar correctamente el negocio,
- reducir complejidad,
- organizar sistemas grandes,
- alinear programación con realidad empresarial.

La idea central es:

> El software debe representar el dominio real del negocio.

Es decir:

- el código debe reflejar cómo funciona realmente la organización,
- no solo cómo funcionan las tecnologías.

DDD intenta resolver uno de los problemas más difíciles del software:

```text
La complejidad del negocio.
```

---

# ¿Qué significa "Dominio"?

El dominio es:

- el área de negocio,
- el problema real que el software intenta resolver.

Ejemplos de dominios:

- banca,
- logística,
- medicina,
- e-commerce,
- transporte,
- seguros,
- IA empresarial.

---

# Idea principal de DDD

Muchos sistemas fracasan porque:

- los programadores entienden mal el negocio.

Resultado:

- lógica inconsistente,
- caos conceptual,
- reglas duplicadas,
- comportamiento incorrecto,
- arquitectura rota.

DDD propone:

```text
El modelo del software debe ser el mismo modelo mental del negocio.
```

---

# Problema que intenta resolver

En sistemas grandes suelen aparecer:

- conceptos ambiguos,
- módulos mezclados,
- reglas contradictorias,
- lógica distribuida caóticamente,
- nombres inconsistentes,
- modelos incorrectos.

Ejemplo típico:

```text
cliente
usuario
comprador
cuenta
persona
usuario_activo
```

Todos significan cosas distintas.
Pero en sistemas mal diseñados:

- se mezclan.

DDD intenta evitar eso.

---

# Conceptos fundamentales de DDD

---

# 1. Ubiquitous Language

## Lenguaje Ubicuo

Uno de los conceptos más importantes.

La idea:

- desarrolladores y negocio deben hablar el mismo lenguaje.

Ejemplo:

Si el negocio dice:

- "Factura"
- "Orden"
- "Pago"
- "Suscripción"

Entonces el código también debería llamarse igual.

NO:

- InvoiceManagerFinal2
- UserTransactionObject
- PaymentHandlerTemp

---

# Objetivo

Eliminar traducción mental entre:

- negocio,
- análisis,
- código.

---

# Resultado

El código se vuelve:

- más claro,
- más alineado,
- más mantenible.

---

# 2. Entities

## Entidades

Objetos con:

- identidad propia,
- continuidad en el tiempo.

Ejemplo:

- Usuario
- Pedido
- Factura
- Cuenta bancaria

Aunque cambien atributos:

- siguen siendo la misma entidad.

Ejemplo:

```ts
Usuario {
  id: 10
  nombre: "Juan"
}
```

Si cambia el nombre:

- sigue siendo el mismo usuario.

Porque:

- la identidad importa.

---

# 3. Value Objects

## Objetos de Valor

Objetos definidos por sus valores, no por identidad.

Ejemplo:

- Dinero
- Dirección
- Coordenadas
- Fecha
- Color

Ejemplo:

```ts
Money {
  amount: 100
  currency: "USD"
}
```

Si dos objetos tienen:

- mismo valor,
- son equivalentes.

---

# Características

- Inmutables
- Pequeños
- Reutilizables
- Muy seguros

DDD usa muchísimo Value Objects.

---

# 4. Aggregates

## Agregados

Uno de los conceptos más complejos e importantes.

Un Aggregate es:

- un grupo de objetos relacionados
- tratados como una unidad consistente.

Ejemplo:

```text
Pedido
 ├── Items
 ├── Pago
 └── Dirección
```

Todo eso forma:

- un agregado.

---

# Aggregate Root

El objeto principal controla el agregado.

Ejemplo:

- Pedido

Los demás objetos:

- no deberían modificarse directamente desde afuera.

---

# Objetivo

Mantener:

- consistencia,
- reglas de negocio,
- integridad del sistema.

---

# 5. Repositories

Abstracciones para acceder a datos.

La idea:

- el dominio NO debe conocer SQL.

Malo:

```ts
SELECT * FROM users
```

Dentro del dominio.

Bueno:

```ts
UserRepository.findById();
```

---

# Beneficios

- desacoplamiento,
- testing,
- independencia tecnológica.

---

# 6. Domain Services

Servicios para lógica de negocio compleja.

Se usan cuando:

- la lógica no pertenece naturalmente a una entidad.

Ejemplo:

- cálculo financiero,
- validaciones globales,
- reglas complejas.

---

# 7. Application Services

Orquestan:

- casos de uso,
- flujo de aplicación.

NO contienen:

- lógica profunda del dominio.

---

# 8. Bounded Contexts

## Contextos delimitados

Probablemente el concepto MÁS importante de DDD moderno.

La idea:

- distintos sectores del negocio tienen modelos distintos.

Ejemplo:

En e-commerce:

- "Cliente"
  no significa lo mismo en:
  - facturación,
  - soporte,
  - marketing,
  - logística.

Cada contexto:

- tiene sus propias reglas,
- modelos,
- lenguaje.

---

# Ejemplo

```text
[Facturación]
Cliente = entidad fiscal

[Marketing]
Cliente = usuario segmentado

[Soporte]
Cliente = ticket activo
```

DDD dice:

- NO mezclar esos modelos.

---

# Beneficio enorme

Evita:

- caos conceptual,
- acoplamiento masivo,
- sistemas imposibles de entender.

---

# Arquitectura típica DDD

```text
src/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── repositories/
│   ├── services/
│   └── aggregates/
│
├── application/
│   ├── use-cases/
│   └── dto/
│
├── infrastructure/
│   ├── database/
│   ├── messaging/
│   └── external-services/
│
└── interfaces/
```

---

# Relación con Clean Architecture

DDD y Clean Architecture suelen combinarse.

DDD:

- modela el negocio.

Clean Architecture:

- organiza dependencias.

Juntas forman:

- arquitectura empresarial moderna.

---

# Relación con Microservicios

DDD influyó muchísimo en:

- microservicios,
- arquitectura distribuida.

Cada Bounded Context puede convertirse en:

- un microservicio independiente.

Ejemplo:

```text
Auth Service
Payment Service
Inventory Service
Shipping Service
```

Cada uno:

- con su propio dominio,
- reglas,
- base de datos.

---

# Event-Driven Architecture

DDD combina muy bien con eventos.

Ejemplo:

```text
PedidoCreado
PagoAprobado
StockReservado
FacturaEmitida
```

Esto genera:

- sistemas desacoplados,
- escalables,
- distribuidos.

---

# Ventajas reales

# 1. Excelente para sistemas complejos

DDD brilla cuando:

- el negocio es complicado.

---

# 2. Reduce caos conceptual

Muy importante.

---

# 3. Facilita escalabilidad organizacional

Equipos distintos:

- trabajan en contextos distintos.

---

# 4. Mejor comunicación negocio-dev

Extremadamente importante.

---

# 5. Mayor robustez lógica

Las reglas quedan centralizadas.

---

# 6. Arquitectura más mantenible

El sistema envejece mejor.

---

# Desventajas reales

# 1. Curva de aprendizaje muy alta

DDD es difícil.

---

# 2. Mucha abstracción

Puede sentirse excesivo.

---

# 3. Overengineering

Aplicarlo a sistemas pequeños:

- suele ser un error.

---

# 4. Requiere negocio claro

Si la empresa no entiende su propio negocio:

- DDD falla.

---

# DDD NO es para todos

Excelente para:

- fintech,
- ERP,
- SaaS grandes,
- banca,
- logística,
- seguros,
- sistemas gubernamentales,
- IA empresarial compleja.

---

# Mala opción para

- landing pages,
- scripts simples,
- MVP pequeños,
- apps temporales,
- prototipos rápidos.

---

# DDD Estratégico vs Táctico

---

# DDD Estratégico

Nivel organizacional.

Incluye:

- bounded contexts,
- integración,
- equipos,
- separación del negocio.

---

# DDD Táctico

Nivel código.

Incluye:

- entities,
- value objects,
- repositories,
- aggregates.

---

# Filosofía profunda detrás de DDD

DDD nace de una idea central:

```text
La complejidad real del software no es técnica.
Es complejidad del negocio.
```

Bases de datos:

- se aprenden.

Frameworks:

- cambian.

Pero:

- modelar correctamente una empresa
  es extremadamente difícil.

DDD intenta resolver eso.

---

# Influencia moderna

DDD influye muchísimo en:

- backend moderno,
- microservicios,
- arquitectura cloud,
- fintech,
- event-driven systems,
- CQRS,
- sistemas distribuidos.

---

# Tecnologías donde suele verse

Backend:

- NestJS
- Spring Boot
- .NET
- FastAPI

Mensajería:

- Kafka
- RabbitMQ

Bases:

- PostgreSQL
- MongoDB
- EventStoreDB

Infraestructura:

- Docker
- Kubernetes

---

# Relación con tu perfil

DDD probablemente encaja mucho con:

- backend robusto,
- arquitectura seria,
- sistemas complejos,
- planificación rígida,
- modelado formal,
- organización fuerte.

Porque DDD es:

- extremadamente estructurado,
- disciplinado,
- orientado a ingeniería profesional.

---

# Conclusión

DDD es una filosofía para:

- dominar complejidad,
- modelar negocio correctamente,
- construir sistemas grandes y longevos.

No busca:

- velocidad inmediata,
- simplicidad extrema,
- prototipado rápido.

Busca:

- coherencia,
- robustez,
- claridad conceptual,
- escalabilidad organizacional,
- ingeniería seria.
