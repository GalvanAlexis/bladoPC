# Herramienta: Gradle

## Introducción
Gradle es una herramienta de automatización de construcción moderna, que combina lo mejor de Maven y Ant. Utiliza un lenguaje de dominio específico (DSL) basado en Groovy o Kotlin.

---

## 1. Características Principales

### 1.1 Flexible y Extensible
Soporta múltiples lenguajes (Java, C++, Python, etc.) y plataformas.

### 1.2 Incremental
Solo reconstruye lo que ha cambiado, acelerando el proceso.

### 1.3 Basado en Tareas (Tasks)
La unidad básica de trabajo en Gradle es la tarea.

---

## 2. Instalación y Configuración

### 2.1 Descargar Gradle
gradle.org. Agregar el directorio `bin` al PATH.

### 2.2 Verificar Instalación
```bash
gradle -v
```

---

## 3. Estructura de un Proyecto Gradle

```
mi-proyecto/
├── build.gradle      # Script de construcción (Groovy DSL)
├── settings.gradle  # Configuración del proyecto
└── src/
    ├── main/
    │   ├── java/        # Código fuente
    │   └── resources/   # Recursos
    └── test/
        ├── java/        # Código de pruebas
        └── resources/   # Recursos de prueba
```

---

## 4. Archivo build.gradle Básico (Groovy)

```groovy
plugins {
    id 'java'
}

group = 'com.ejemplo'
version = '1.0.0'

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'junit:junit:4.13.2'
}

test {
    useJUnitPlatform()
}
```

---

## 5. Gestión de Dependencias

### 5.1 Configuraciones (Configurations)
- **implementation**: Dependencias necesarias para compilar y ejecutar
- **testImplementation**: Dependencias solo para pruebas
- **compileOnly**: Disponible en compilación, no en ejecución

### 5.2 Ejemplo de Dependencias
```groovy
dependencies {
    implementation 'org.springframework:spring-core:5.3.23'
    testImplementation 'junit:junit:4.13.2'
}
```

---

## 6. Comandos Básicos

```bash
# Compilar proyecto
gradle build

# Ejecutar pruebas
gradle test

# Limpiar proyecto
gradle clean

# Ver tareas disponibles
gradle tasks

# Ejecutar una tarea específica
gradle jar
```

---

## 7. Gradle Wrapper

### 7.1 ¿Qué es?
Script (`gradlew` / `gradlew.bat`) que descarga y usa una versión específica de Gradle. No requiere instalación previa.

### 7.2 Generar Wrapper
```bash
gradle wrapper
```

### 7.3 Usar Wrapper
```bash
./gradlew build    # Linux/Mac
gradlew.bat build  # Windows
```

---

## 8. Diferencias con Maven

| Característica | Maven | Gradle |
|---------------|-------|--------|
| Lenguaje DSL | XML | Groovy/Kotlin |
| Flexibilidad | Estructurado | Altamente flexible |
| Velocidad | Más lento | Más rápido (incremental) |
| Curva aprendizaje | Más fácil | Más pronunciada |

---

## 9. Recursos de Aprendizaje
- Documentación: docs.gradle.org
- Guía: gradle.org/guides/
- Práctica: Migrar un proyecto Maven a Gradle
