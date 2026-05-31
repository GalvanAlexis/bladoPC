# Ajuste de Diálogos: Duelo con Golpes Bajos (ISS-034)

## Descripción
En la implementación inicial del "Duelo con Golpes Bajos" (ISS-033) se integró un set base de diálogos e insultos, algunos de los cuales contenían relleno adicional o no correspondían a los 7 insultos originales indicados por el usuario.

El objetivo de esta tarea es **sanear** el archivo de configuración `duelInsults.ts` y la mecánica de respuestas para utilizar estrictamente los 7 insultos canon, con sus 7 respuestas correctas, eliminando texto inventado o "dialogos extra".

## Tareas a Realizar
- [ ] Revisar `src/lib/duelInsults.ts`.
- [ ] Eliminar los insultos de relleno o autogenerados.
- [ ] Validar que queden exactamente los 7 insultos/respuestas que proveerá el usuario.
- [ ] Asegurarse de que el motor de duelo maneja correctamente este set reducido (ya que actualmente selecciona de una lista).

## Estado
- **Status:** To Do
- **Branch:** `docs/ISS-034-dialogos-duelo`
