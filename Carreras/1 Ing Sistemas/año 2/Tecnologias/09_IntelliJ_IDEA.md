# IDE: IntelliJ IDEA

## Introducción
IntelliJ IDEA es un IDE (Integrated Development Environment) desarrollado por JetBrains, ampliamente reconocido como el mejor para desarrollo en Java.

---

## 1. Ediciones

### 1.1 Community Edition (Gratuita)
Soporta desarrollo Java, Kotlin, Groovy, Scala. Ideal para aplicaciones de consola y librerías.

### 1.2 Ultimate Edition (De Pago)
Incluye soporte para frameworks web (Spring, Java EE), bases de datos, y herramientas de profiling.

---

## 2. Instalación y Primeros Pasos

### 2.1 Descargar
jetbrains.com/idea/. Seguir el instalador.

### 2.2 Configuración Inicial
- Tema (Dark/Light)
- Plugins recomendados (GitHub, Markdown)
- JDK a utilizar

---

## 3. Crear un Proyecto

### 3.1 Proyecto Java Básico
1. File → New → Project
2. Seleccionar "Java"
3. Elegir JDK
4. Next → Next → Nombrar proyecto

### 3.2 Estructura del Proyecto
```
MiProyecto/
├── src/
│   └── Main.java
├── .idea/          # Configuración de IntelliJ
└── MiProyecto.iml   # Archivo de módulo
```

---

## 4. Características Principales

### 4.1 Edición de Código
- **Autocompletado inteligente**: Sugiere métodos y clases relevantes
- **Refactorización**: Renombrar, extraer métodos, mover clases
- **Inspecciones de código**: Detecta errores y advertencias en tiempo real

### 4.2 Navegación
- `Ctrl + N`: Buscar clase
- `Ctrl + Shift + N`: Buscar archivo
- `Ctrl + B`: Ir a declaración
- `Ctrl + Alt + B`: Ver implementaciones

### 4.3 Depuración (Debugging)
- Puntos de interrupción (breakpoints)
- Evaluar expresiones en tiempo real
- Ver estado de variables

---

## 5. Integración con Maven/Gradle

### 5.1 Proyecto Maven
Al abrir un proyecto con `pom.xml`, IntelliJ lo detecta automáticamente y descarga dependencias.

### 5.2 Proyecto Gradle
Similar a Maven, detecta `build.gradle` y configura el proyecto.

---

## 6. Atajos de Teclado Esenciales

| Atajo (Windows/Linux) | Función |
|------------------------|---------|
| `Ctrl + Space` | Autocompletado |
| `Ctrl + Shift + Enter` | Completar declaración |
| `Ctrl + /` | Comentar/descomentar línea |
| `Ctrl + Shift + /` | Comentar/descomentar bloque |
| `Shift + F6` | Renombrar (refactorización) |
| `Ctrl + Q` | Ver documentación rápida |
| `Alt + Enter` | Sugerencias de corrección |

---

## 7. Plugins Útiles

- **GitHub**: Integración con Git y GitHub
- **Markdown**: Visualizar archivos .md
- **Lombok**: Soporte para librería Lombok
- **Key Promoter X**: Aprende atajos mientras usas el mouse

---

## 8. Recursos de Aprendizaje
- Documentación: jetbrains.com/help/idea/
- Tutorial: Importar y configurar un proyecto existente
- Práctica: Crear proyecto, escribir código, depurar
