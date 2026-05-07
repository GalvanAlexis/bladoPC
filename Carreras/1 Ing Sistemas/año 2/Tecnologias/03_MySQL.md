# Bases de Datos: MySQL

## Introducción
MySQL es un sistema de gestión de bases de datos relacional (RDBMS) de código abierto, ampliamente utilizado en aplicaciones web y empresariales.

---

## 1. Características Principales

### 1.1 Relacional
Datos organizados en tablas con relaciones entre ellas.

### 1.2 SQL como Lenguaje
Utiliza SQL (Structured Query Language) para consultas y manipulación.

### 1.3 Multiplataforma
Funciona en Windows, Linux, macOS y otros sistemas operativos.

---

## 2. Instalación y Configuración

### 2.1 MySQL Server
Descargar desde mysql.com. Incluye el servidor y herramientas básicas.

### 2.2 MySQL Workbench
Interfaz gráfica para administrar bases de datos (recomendada).

### 2.3 Conexión desde Java
```java
// JDBC
String url = "jdbc:mysql://localhost:3306/mi_basedatos";
String user = "usuario";
String password = "contraseña";

Connection conn = DriverManager.getConnection(url, user, password);
```

---

## 3. SQL Básico

### 3.1 Crear Base de Datos y Tabla
```sql
CREATE DATABASE universidad;
USE universidad;

CREATE TABLE estudiantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    edad INT,
    carrera VARCHAR(100)
);
```

### 3.2 Operaciones CRUD
```sql
-- INSERT (Crear)
INSERT INTO estudiantes (nombre, edad, carrera) 
VALUES ('Blado', 25, 'Ingeniería en Sistemas');

-- SELECT (Leer)
SELECT * FROM estudiantes;
SELECT nombre, carrera FROM estudiantes WHERE edad >= 20;

-- UPDATE (Actualizar)
UPDATE estudiantes SET edad = 26 WHERE nombre = 'Blado';

-- DELETE (Eliminar)
DELETE FROM estudiantes WHERE id = 1;
```

---

## 4. Consultas Avanzadas

### 4.1 JOINs (Uniones)
```sql
-- INNER JOIN
SELECT estudiantes.nombre, carreras.nombre_carrera
FROM estudiantes
INNER JOIN carreras ON estudiantes.carrera_id = carreras.id;

-- LEFT JOIN
SELECT estudiantes.nombre, carreras.nombre_carrera
FROM estudiantes
LEFT JOIN carreras ON estudiantes.carrera_id = carreras.id;
```

### 4.2 Agregaciones
```sql
SELECT carrera, COUNT(*) as total
FROM estudiantes
GROUP BY carrera;

SELECT AVG(edad) as promedio_edad FROM estudiantes;
```

---

## 5. Modelado de Datos

### 5.1 Diagramas ER (Entity-Relationship)
- **Entidad**: Objeto del mundo real (Estudiante, Curso)
- **Atributo**: Propiedad de la entidad (nombre, edad)
- **Relación**: Conexión entre entidades (Estudiante INSCRITO_EN Curso)

### 5.2 Normalización
Proceso para reducir redundancia:
- **1NF**: Valores atómicos (sin listas)
- **2NF**: Dependencias parciales eliminadas
- **3NF**: Dependencias transitivas eliminadas

---

## 6. Integridad Referencial

### 6.1 Claves Foráneas (Foreign Keys)
```sql
CREATE TABLE cursos (
    id INT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE inscripciones (
    estudiante_id INT,
    curso_id INT,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
```

---

## 7. Recursos de Aprendizaje
- Documentación: dev.mysql.com/doc/
- Tutorial interactivo: w3schools.com/sql/
- Práctica: SQLZoo, HackerRank (SQL)
