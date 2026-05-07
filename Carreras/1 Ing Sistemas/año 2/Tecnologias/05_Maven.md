# Herramienta: Maven

## Introducción
Apache Maven es una herramienta de gestión y construcción de proyectos Java. Se basa en el concepto de Project Object Model (POM) y proporciona gestión de dependencias.

---

## 1. Conceptos Fundamentales

### 1.1 POM (Project Object Model)
Archivo `pom.xml` que describe el proyecto, sus dependencias, plugins y configuración.

### 1.2 Ciclo de Vida de Construcción
- **default**: Compilación, pruebas, empaquetado, instalación
- **clean**: Limpieza de archivos generados
- **site**: Generación de documentación

### 1.3 Coordenadas de Maven
Identifican de forma única a un proyecto:
- **groupId**: Organización (ej. com.ejemplo)
- **artifactId**: Nombre del proyecto (ej. mi-app)
- **version**: Versión (ej. 1.0.0)

---

## 2. Instalación y Configuración

### 2.1 Descargar Maven
maven.apache.org. Agregar el directorio `bin` al PATH del sistema.

### 2.2 Verificar Instalación
```bash
mvn -version
```

---

## 3. Estructura de un Proyecto Maven

```
mi-proyecto/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/        # Código fuente
    │   └── resources/   # Recursos (configuraciones)
    └── test/
        ├── java/        # Código de pruebas
        └── resources/   # Recursos de prueba
```

---

## 4. Archivo pom.xml Básico

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.ejemplo</groupId>
    <artifactId>mi-app</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <!-- Dependencia de JUnit para pruebas -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

---

## 5. Gestión de Dependencias

### 5.1 Agregar una Dependencia
Buscar en mvnrepository.com, agregar al `<dependencies>` en pom.xml.

### 5.2 Alcance (Scope)
- **compile**: Disponible en compilación y ejecución (por defecto)
- **test**: Solo para pruebas
- **provided**: Proporcionado por el contenedor (ej. Servlet API)
- **runtime**: Necesario en ejecución, no en compilación

---

## 6. Comandos Básicos

```bash
# Compilar proyecto
mvn compile

# Ejecutar pruebas
mvn test

# Empaquetar (JAR/WAR)
mvn package

# Instalar en repositorio local
mvn install

# Limpiar proyecto
mvn clean
```

---

## 7. Repositorios de Maven

### 7.1 Repositorio Central
Repositorio público (repo.maven.apache.org) con miles de bibliotecas.

### 7.2 Repositorio Local
Por defecto en `~/.m2/repository`. Se llena al descargar dependencias.

---

## 8. Recursos de Aprendizaje
- Documentación oficial: maven.apache.org
- Tutorial: mkyong.com/maven/
- Práctica: Crear proyecto con `mvn archetype:generate`
