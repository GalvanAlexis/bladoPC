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

## 🔄 Flujo de Trabajo con Ramas (CRÍTICO)

### Las ramas se crean DINÁMICAMENTE según la teoría estudiada.

1. **Cuando estudies una materia de `Materias/`:**
   - Crear rama: `año-X/materias/[nombre-materia]`
   - Ejemplo: Al estudiar Matemática I → `año-1/materias/matematica-1`
   - Ejemplo: Al estudiar Física I → `año-1/materias/fisica-1`

2. **Cuando estudies una tecnología de `Tecnologias/`:**
   - Crear rama: `año-X/tecnologias/[nombre-tecnologia]`
   - Ejemplo: Al estudiar Python → `año-1/tecnologias/python`
   - Ejemplo: Al estudiar Git → `año-1/tecnologias/git`

3. **Flujo por tema:**
   ```bash
   # Crear rama desde master
   git checkout -b año-X/materias/[tema] master
   
   # Estudiar el tema, actualizar checkbox `- [ ]` → `- [x]` en `0X_año_Y.md`
   # Hacer commit de los cambios
   git add .
   git commit -m "Complete: [Nombre Materia/Tecnologia] #issue"
   
   # Hacer push
   git push -u origin año-X/materias/[tema]
   
   # Volver a master
   git checkout master
   ```

## 🐛 Issues de GitHub (YA CREADOS)
Existen **5 GitHub Issues** para los **5 proyectos finales** del Año 1 (Ing Sistemas):
- Issue #1: Complete project: Simulador de Sistema Solar
- Issue #2: Complete project: Monitor de Sistema (CLI)
- Issue #3: Complete project: Analizador de Texto
- Issue #4: Complete project: Generador de Documentación Técnica
- Issue #5: Complete project: Juego de Adivinanza

Cuando trabajes en un proyecto:
- Crear rama: `proyecto/[nombre-proyecto]`
- Referenciar el issue en commits: `git commit -m "Complete: Simulador Solar #1"`

## 📌 Estado Actual (Para referencia del agente)
- **Año 1 (3 carreras)**: Planificado. Checkboxes listos. **5 PROYECTOS documentados** en `Proyecto/`:
  - `01_Simulador_Sistema_Solar.md`
  - `02_Monitor_Sistema.md`
  - `03_Analizador_Texto.md`
  - `04_Generador_Documentacion_Tecnica.md`
  - `05_Juego_Adivinanza.md`
- **Año 2 (1 Ing Sistemas)**: Planificado. Teoría completa en `Materias/` (10), `Tecnologias/` (14), `Proyecto/` (1).
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
- **RAMAS**: No crear todas las ramas ahora. Se crean cuando Blado estudie cada tema.
- **ENFOQUE**: Solo Año 1 de Ing Sistemas a menos que se indique lo contrario.
- La carpeta raíz es `3 CARRERAS` localmente, pero en GitHub es `Progresos-Academicos`.

---
*Instrucciones para agentes IA - Próxima sesión*  
*Repositorio: https://github.com/GalvanAlexis/Progresos-Academicos*
