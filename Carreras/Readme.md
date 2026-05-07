# INSTRUCCIONES PARA AGENTES IA - Progresos Academicos

## 👤 Identidad
**Blado** es el estudiante. Está cursando 3 carreras técnicas en simultáneo.

## 📂 Estructura del Proyecto
```
Progresos-Academicos/
├── Readme.md (este archivo - presentación humana)
└── Carreras/
    ├── Readme.md (ESTE archivo - instrucciones para IA)
    ├── 1 Ing Sistemas/
    │   ├── 0X_año_Y.md (checkboxes de temas)
    │   ├── año X/
    │   │   ├── Materias/ (teoría .md por materia)
    │   │   ├── Tecnologias/ (teoría .md por tecnología)
    │   │   └── Proyecto/ (proyecto anual)
    ├── 2 Ing Datos/ (misma estructura)
    └── 3 Lic IA/ (misma estructura)
```

## 🔄 Flujo de Trabajo para el Agente
1. **Leer este archivo primero** para entender la estructura.
2. **Archivos Anuales** (`0X_año_Y.md`): Tienen checkboxes `- [ ]` para marcar al completar.
3. **Mapeo a Teoría**: Cada checkbox tiene su archivo `.md` en la carpeta correspondiente.
4. **Progreso**: Blado marca checkboxes `- [x]` al terminar temas.
5. **Ajuste**: Continuar desde el **Año 2** de la **1 Ing Sistemas**, un tema a la vez.

## 📌 Estado Actual (Para referencia del agente)
- **Año 1 (3 carreras)**: Planificado. Checkboxes listos.
- **Año 2 (1 Ing Sistemas)**: Planificado. Teoría completa en `Materias/` (10), `Tecnologias/` (14), `Proyecto/` (1).
- **Año 2 (2 Ing Datos y 3 Lic IA)**: Pendiente de crear carpetas y teoría.
- **Años 3-6**: Pendientes.

## 🤖 Instrucciones MCP para el Agente
- **memory**: Cargar contexto de sesiones anteriores de Blado.
- **sequential-thinking**: Usar para análisis complejos.
- **engram**: Registrar aprendizajes al terminar tareas.
- **GitHub**: Repositorio en `GalvanAlexis/Progresos-Academicos`.

## ⚠️ Notas Importantes
- Blado **aún no inicia** el estudio. Todo está en fase de **planificación**.
- No modificar estructura sin consentimiento de Blado.
- Respetar convenciones: `[orden]_[Nombre].md` para archivos de teoría.
- La carpeta raíz es `3 CARRERAS` localmente, pero en GitHub es `Progresos-Academicos`.

---
*Instrucciones para agentes IA - Próxima sesión*  
*Repositorio: https://github.com/GalvanAlexis/Progresos-Academicos*
