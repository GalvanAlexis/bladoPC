# Bases de Datos I: Modelado ER, SQL Básico, Normalización (MySQL, Workbench)

Las **bases de datos relacionales** organizan datos en tablas (filas y columnas) relacionadas entre sí. **MySQL** es el sistema de gestión (DBMS) más usado del mundo. **Workbench** es la herramienta visual oficial.

---

## 1. Modelado Entidad-Relación (ER)

Es un diagrama conceptual que representa los datos y sus relaciones antes de crear la base de datos.

### Componentes
| Elemento | Descripción | Ejemplo |
|---------|-------------|---------|
| **Entidad** | Objeto del mundo real | `Estudiante`, `Curso` |
| **Atributo** | Propiedad de la entidad | `Nombre`, `Edad` |
| **Relación** | Cómo se relacionan | `Estudiante` **toma** `Curso` |
| **Clave Primaria (PK)** | Identificador único | `EstudianteID` |
| **Clave Foránea (FK)** | Referencia a otra tabla | `CursoID` dentro de `Estudiante` |

### Cardinalidad (Multiplicidad)
*   **1:1 (Uno a Uno):** Un `Pasaporte` pertenece a un solo `Ciudadano`.
*   **1:N (Uno a Muchos):** Un `Profesor` dicta muchas `Clases`.
*   **M:N (Muchos a Muchos):** Muchos `Alumnos` se inscriben en muchos `Cursos` (Requiere una **tabla intermedia**).

---

## 2. SQL Básico (Structured Query Language)

SQL es el lenguaje estándar para interactuar con bases de datos relacionales.

### Tipos de Datos Comunes en MySQL
| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `INT` | Entero | `25` |
| `VARCHAR(n)` | Cadena de longitud variable | `'Juan'` |
| `DECIMAL(m,d)` | Número decimal preciso | `99.99` |
| `DATE` | Fecha | `'2023-10-05'` |
| `BOOLEAN` / `TINYINT(1)` | Booleano | `1` (True), `0` (False) |

### Comandos DDL (Definición de Datos)
Crean la estructura (`CREATE`, `ALTER`, `DROP`).

```sql
-- Crear Base de Datos
CREATE DATABASE universidad;
USE universidad;

-- Crear Tabla (DDL)
CREATE TABLE Estudiante (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Fecha_Nac DATE
);

-- Modificar Tabla
ALTER TABLE Estudiante ADD COLUMN Edad INT;
```

### Comandos DML (Manipulación de Datos)
Gestionan la información (`INSERT`, `UPDATE`, `DELETE`).

```sql
-- Insertar (Alta)
INSERT INTO Estudiante (Nombre, Email, Fecha_Nac) 
VALUES ('Ana Lopez', 'ana@email.com', '2000-05-10');

-- Actualizar (Cambio)
UPDATE Estudiante SET Edad = 24 WHERE Nombre = 'Ana Lopez';

-- Eliminar (Baja)
DELETE FROM Estudiante WHERE ID = 5;
```

### Comandos DQL (Consulta - `SELECT`)
La operación más usada.

```sql
-- Seleccionar todo
SELECT * FROM Estudiante;

-- Con filtro
SELECT Nombre, Email FROM Estudiante WHERE Edad > 20;

-- Ordenar
SELECT * FROM Estudiante ORDER BY Nombre ASC;

-- Agrupar
SELECT COUNT(*), Edad FROM Estudiante GROUP BY Edad;
```

### Joins (Uniones)
Combinan datos de múltiples tablas.

```sql
-- INNER JOIN (Solo coincidencias)
SELECT Estudiante.Nombre, Cursos.Nombre
FROM Estudiante
INNER JOIN Inscripciones ON Estudiante.ID = Inscripciones.EstudianteID
INNER JOIN Cursos ON Inscripciones.CursoID = Cursos.ID;
```

---

## 3. Normalización (Teoría de Diseño)

Proceso para organizar las tablas para reducir la **redundancia** (datos repetidos) y mejorar la integridad.

### Primera Forma Normal (1FN)
*   **Regla:** Cada celda debe tener un **valor atómico** (no listas ni conjuntos).
*   **Incorrecto:** `Telefonos: "12345, 67890"`.
*   **Correcto:** Crear otra tabla `Telefonos` o asegurar que solo haya un número por fila.

### Segunda Forma Normal (2FN)
*   **Regla:** Debe cumplir 1FN y **no debe haber dependencias parciales**. Los atributos que no son clave deben depender de **toda** la clave primaria.
*   **Incorrecto (Tabla con clave compuesta):** `(PedidoID, ProductoID, Cantidad, NombreProducto)`. `NombreProducto` depende solo de `ProductoID`, no de `PedidoID`.
*   **Correcto:** Separar en `Pedidos` y `DetallePedido`.

### Tercera Forma Normal (3FN)
*   **Regla:** Debe cumplir 2FN y **no debe haber dependencias transitivas**. Los atributos no clave no deben depender de otros atributos no clave.
*   **Incorrecto:** `(EmpleadoID, Nombre, Departamento, JefeDepartamento)`. `JefeDepartamento` depende de `Departamento`, que no es la clave.
*   **Correcto:** Tabla `Empleados` y Tabla `Departamentos`.

---

## 4. MySQL Workbench (Interfaz Visual)

### Conexión
1.  Abrir MySQL Workbench.
2.  Clic en el `+` junto a "MySQL Connections".
3.  Configurar: `Hostname: localhost`, `Port: 3306`, `Username: root`.
4.  Probar conexión y OK.

### Uso Básico
*   **SQL Editor:** Lado derecho. Aquí escribes el código SQL.
*   **Schema (Esquema):** Panel izquierdo. Muestra las bases de datos (schemas).
*   **Sending to SQL Editor:** Clic derecho en una tabla -> "Send to SQL Editor" -> "Select All".

### Ejemplo: Crear Diagrama ER
1.  Ir a `Database` -> `Reverse Engineer`.
2.  Seleccionar la base de datos.
3.  Workbench dibujará el diagrama ER automáticamente basado en las tablas existentes.

---

## 5. Herencia en Bases de Datos (Patrones)

Aunque SQL no tiene POO, simulamos herencia:

### Tabla Única con Tipo (Single Table Inheritance)
```sql
CREATE TABLE Usuario (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Tipo ENUM('Estudiante', 'Profesor') -- Discriminador
);
```

### Tablas Separadas (Concrete Table Inheritance)
```sql
CREATE TABLE Persona (ID INT PRIMARY KEY, Nombre VARCHAR(100)));
CREATE TABLE Estudiante (ID INT PRIMARY KEY, Carrera VARCHAR(100), FOREIGN KEY (ID) REFERENCES Persona(ID));
CREATE TABLE Profesor (ID INT PRIMARY KEY, Departamento VARCHAR(100), FOREIGN KEY (ID) REFERENCES Persona(ID));
```

---

## Resumen Visual (Diagrama ER Simple)

```text
      [ESTUDIANTE]                     [CURSO]
      PK: ID                         PK: ID
      Nombre: VARCHAR(100)            Nombre: VARCHAR(100)
      Email: VARCHAR(100)            Creditos: INT
            |                             |
            |                             |
            +------[INSCRIPCIONES]------+
                     PK: ID
                     FK: EstudianteID
                     FK: CursoID
                     Fecha: DATE
```

---

## Recursos Recomendados

### Libros
*   **"Learning SQL"** - Alan Beaulieu (O'Reilly).
*   **"MySQL Crash Course"** - Ben Forta.

### Documentación
*   **MySQL 8.0 Reference Manual:** https://dev.mysql.com/doc/refman/8.0/en/
*   **W3Schools SQL Tutorial:** https://www.w3schools.com/sql/

### Tutoriales
*   **MySQLTutorial.org:** https://www.mysqltutorial.org/
*   **YouTube (Fazt):** "Curso de MySQL" (Para lectura).
