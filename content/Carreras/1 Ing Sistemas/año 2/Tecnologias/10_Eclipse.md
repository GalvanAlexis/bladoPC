# IDE: Eclipse

## Introducción
Eclipse es un IDE de código abierto, históricamente uno de los más utilizados para desarrollo en Java. Es extensible mediante plugins.

---

## 1. Ediciones y Versiones

### 1.1 Eclipse IDE for Java Developers
Versión estándar para desarrollo Java.

### 1.2 Eclipse IDE for Enterprise Java Developers
Incluye herramientas para desarrollo web y empresarial (JSP, EJB, etc.).

---

## 2. Instalación y Configuración

### 2.1 Descargar
eclipse.org. Descomprimir (no requiere instalador tradicional).

### 2.2 Workspace
Al iniciar, Eclipse pide un directorio de trabajo (workspace). Aquí se guardarán los proyectos.

---

## 3. Crear un Proyecto Java

### 3.1 Pasos
1. File → New → Java Project
2. Ingresar nombre del proyecto
3. Seleccionar JRE (Java Runtime Environment)
4. Finish

### 3.2 Estructura del Proyecto
```
MiProyecto/
├── src/           # Código fuente
├── JRE System Library/  # Bibliotecas del JRE
└── .project       # Configuración de Eclipse
```

---

## 4. Características Principales

### 4.1 Edición de Código
- **Content Assist**: Autocompletado (Ctrl + Space)
- **Quick Fix**: Corrección rápida de errores (Ctrl + 1)
- **Refactoring**: Renombrar, mover, extraer métodos

### 4.2 Perspectivas (Perspectives)
- **Java Perspective**: Vista estándar para desarrollo
- **Debug Perspective**: Para depuración
- **Git Perspective**: Integración con Git (EGit)

### 4.3 Vistas (Views)
- **Package Explorer**: Explorador de proyectos
- **Console**: Salida de la aplicación
- **Problems**: Lista de errores y advertencias

---

## 5. Depuración (Debugging)

### 5.1 Puntos de Interrupción (Breakpoints)
Hacer doble clic en el margen izquierdo del editor.

### 5.2 Iniciar Depuración
Click derecho → Debug As → Java Application.

### 5.3 Controles de Depuración
- **Step Over (F6)**: Ejecutar línea y avanzar
- **Step Into (F5)**: Entrar en método
- **Step Return (F7)**: Salir de método
- **Resume (F8)**: Continuar hasta siguiente breakpoint

---

## 6. Integración con Maven

### 6.1 M2Eclipse (Incluido)
Soporte para proyectos Maven integrado en las versiones modernas.

### 6.2 Importar Proyecto Maven
File → Import → Maven → Existing Maven Projects.

---

## 7. Atajos de Teclado Esenciales

| Atajo | Función |
|-------|---------|
| `Ctrl + Space` | Autocompletado |
| `Ctrl + Shift + F` | Formatear código |
| `Ctrl + 1` | Quick Fix |
| `Ctrl + Shift + O` | Organizar imports |
| `F3` | Ir a declaración |
| `Ctrl + D` | Eliminar línea actual |
| `Alt + ↑/↓` | Mover línea arriba/abajo |

---

## 8. Plugins Populares

- **EGit**: Soporte para Git
- **Checkstyle**: Verificación de estilo de código
- **FindBugs**: Detección de bugs potenciales
- **PMD**: Análisis de código estático

---

## 9. Recursos de Aprendizaje
- Documentación: eclipse.org/documentation/
- Tutorial: Crear un "Hello World" y depurarlo
- Práctica: Explorar las diferentes vistas y perspectivas
