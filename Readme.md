# 3 CARRERAS - Plan de Estudios Simultáneos

## 👤 Sobre Blado
**Blado** es el estudiante que gestiona este proyecto. Está cursando **3 carreras técnicas en simultáneo**:
1. Ingeniería en Sistemas
2. Ingeniería en Ciencia de Datos  
3. Licenciatura en Inteligencia Artificial

## 🎯 Propósito
Repositorio personal de Blado para gestionar el progreso académico de las 3 carreras, con seguimiento mediante checkboxes y archivos de teoría desglosados tema por tema.

## 📂 Estructura del Proyecto
```
3 CARRERAS/
├── Readme.md (este archivo)
├── Carreras/
│   ├── 1 Ing Sistemas/
│   │   ├── 01_año_1.md, 02_año_2.md, ..., 06_año_6.md
│   │   ├── año 1/
│   │   │   ├── Materias/ (teoría por materia)
│   │   │   ├── Tecnologias/ (teoría por tecnología)
│   │   │   └── Proyecto/ (proyecto anual)
│   │   └── año 2/
│   │       ├── Materias/ (teoría por materia)
│   │       ├── Tecnologias/ (teoría por tecnología)
│   │       └── Proyecto/ (proyecto anual: Sistema de Gestión de Biblioteca)
│   ├── 2 Ing Datos/
│   │   └── (misma estructura: archivos anuales + carpetas por año)
│   └── 3 Lic IA/
│       └── (misma estructura: archivos anuales + carpetas por año)
├── ingenieria_en_sistemas.md (descripción general de la carrera)
├── ingenieria_ciencia_de_datos.md (descripción general de la carrera)
└── licenciatura_en_ia.md (descripción general de la carrera)
```

## 🔄 Flujo de Trabajo
1. **Archivos Anuales** (`0X_año_Y.md`): Contienen checkboxes `- [ ]` con temas/materias a completar.
2. **Mapeo a Teoría**: Cada checkbox se desglosa en un archivo `.md` dentro de la carpeta correspondiente de la carrera:
   - Ej: `02_año_2.md` tiene "Arquitectura de Computadoras"
   - Su teoría está en `Carreras/1 Ing Sistemas/año 2/Materias/09_Arquitectura_de_Computadoras.md`
3. **Progreso**: Blado marca los checkboxes como completados (`- [x]`) a medida que termina cada tema.
4. **Ajuste**: Se comienza ajustando desde el **año 2** en adelante, un tema a la vez.

## 📌 Convenciones de Nombres
- **Archivos anuales**: `0X_año_Y.md` (X = número de carrera, Y = año académico)
- **Archivos de teoría**: `[orden]_[Nombre_del_tema].md` (ej. `09_Arquitectura_de_Computadoras.md`)
- **Carpetas por año**: `año X/` (con espacio, ej. `año 1/`, `año 2/`)

## 🤖 Instrucciones para el Siguiente Agente
Al iniciar una nueva sesión:
1. **Leer este README primero** para entender la estructura completa.
2. **Usar `memory` MCP** para cargar contexto previo de sesiones anteriores de Blado.
3. **Usar `sequential-thinking`** para análisis complejos de tareas.
4. **Usar `engram`** para registrar aprendizajes al finalizar tareas.
5. **Verificar el progreso actual** leyendo los archivos anuales y chequeando checkboxes.
6. **Respetar las convenciones** de nombres y estructura de carpetas.
7. **No modificar la estructura base** sin consentimiento de Blado.

## 📊 Estado Actual del Proyecto
- **Fase**: Planificación (estructura y documentación)
- **Año 1**: Planificado (checkboxes listos para marcar al estudiar)
- **Año 2**: Planificado (teoría desglosada en archivos .md, checkboxes listos)
- **Años 3-6**: Pendientes de planificación

**Nota**: Blado aún no inicia el estudio. Todos los checkboxes están desmarcados (`- [ ]`) como parte de la planificación previa.

---
*Proyecto personal de Blado - Estudio simultáneo de 3 carreras técnicas*  
*Fase actual: Planificación de contenidos*  
*Última actualización: Mayo 2026*
