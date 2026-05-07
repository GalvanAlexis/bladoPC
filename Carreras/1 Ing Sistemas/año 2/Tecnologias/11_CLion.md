# IDE: CLion

## Introducción
CLion es un IDE desarrollado por JetBrains, diseñado específicamente para desarrollo en C y C++. Incluye herramientas avanzadas de análisis de código y depuración.

---

## 1. Características Principales

### 1.1 Análisis de Código Inteligente
Detección de errores en tiempo real, sugerencias de optimización y advertencias.

### 1.2 Refactorización
Renombrar símbolos, extraer funciones, cambiar signatures, etc.

### 1.3 Depuración Integrada
Interfaz gráfica para GDB/LLDB, puntos de interrupción condicionales, vista de memoria.

---

## 2. Instalación y Configuración

### 2.1 Descargar
jetbrains.com/clion/. Licencia gratuita para estudiantes.

### 2.2 Toolchains (Cadenas de Herramientas)
CLion requiere un compilador y debugger instalados:
- **Windows**: MinGW, Cygwin, o WSL
- **Linux**: GCC o Clang
- **macOS**: Xcode Command Line Tools

---

## 3. Crear un Proyecto

### 3.1 Proyecto C++ Básico
1. File → New Project
2. Seleccionar "C++ Executable"
3. Elegir toolchain
4. Nombrar proyecto

### 3.2 Estructura del Proyecto
```
MiProyecto/
├── CMakeLists.txt   # Archivo de configuración de CMake
├── src/
│   └── main.cpp
└── cmake-build-debug/  # Archivos generados por CMake
```

---

## 4. CMake (Sistema de Build)

### 4.1 ¿Qué es CMake?
CMake es un generador de sistemas de build. No compila directamente, sino que genera archivos para herramientas como Make o Ninja.

### 4.2 CMakeLists.txt Básico
```cmake
cmake_minimum_required(VERSION 3.16)
project(MiProyecto)

set(CMAKE_CXX_STANDARD 14)

add_executable(MiProyecto main.cpp)
```

---

## 5. Características del Editor

### 5.1 Navegación
- `Ctrl + N`: Buscar clase/archivo
- `Ctrl + B`: Ir a definición
- `Ctrl + Alt + B`: Ver implementaciones

### 5.2 Edición
- Autocompletado sensible al contexto
- Generación de código (constructores, getters/setters)
- Formateo de código

---

## 6. Depuración

### 6.1 Configurar Debug
Run → Edit Configurations. Seleccionar ejecutable y argumentos.

### 6.2 Puntos de Interrupción (Breakpoints)
Click en el margen izquierdo del editor.

### 6.3 Vista Durante Depuración
- **Variables**: Estado de variables locales
- **Watches**: Vigilar expresiones específicas
- **Memory View**: Ver memoria en direcciones específicas
- **Disassembly**: Ver código ensamblador

---

## 7. Integración con Valgrind (Linux/macOS)

### 7.1 ¿Qué es Valgrind?
Herramienta para detección de fugas de memoria (memory leaks) y errores en el uso de memoria.

### 7.2 Uso en CLion
Run → Valgrind Memcheck. Analiza el programa y reporta fugas.

---

## 8. Atajos de Teclado Esenciales

| Atajo (Windows/Linux) | Función |
|------------------------|---------|
| `Ctrl + Space` | Autocompletado |
| `Ctrl + Shift + Enter` | Completar declaración |
| `Shift + F6` | Renombrar |
| `Ctrl + Q` | Ver documentación rápida |
| `Alt + Enter` | Sugerencias |
| `F9` | Toggle breakpoint |
| `Shift + F9` | Debug |

---

## 9. Recursos de Aprendizaje
- Documentación: jetbrains.com/help/clion/
- Tutorial: Crear proyecto, configurar CMake, depurar
- Práctica: Resolver problemas de C++ en CLion
