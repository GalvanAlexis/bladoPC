# Bases de Datos: SQL Estándar

## Introducción
SQL (Structured Query Language) es el lenguaje estándar para gestionar bases de datos relacionales. El SQL estándar (ANSI SQL) define la sintaxis base que todos los sistemas deben soportar.

---

## 1. SQL Estándar vs Dialectos

### 1.1 SQL Estándar (ANSI SQL)
Es el lenguaje base definido por el instituto ANSI. Funciona en cualquier RDBMS.

### 1.2 Dialectos Comunes
- **MySQL**: Extensiones propietarias
- **PostgreSQL**: Soporta la mayoría del estándar SQL
- **SQL Server**: Transact-SQL (T-SQL)
- **Oracle**: PL/SQL

---

## 2. Tipos de Datos Estándar

### 2.1 Tipos Numéricos
```sql
INTEGER, SMALLINT, BIGINT    -- Enteros
DECIMAL(p, s), NUMERIC(p, s) -- Decimales exactos
FLOAT, REAL, DOUBLE PRECISION -- Decimales aproximados
```

### 2.2 Tipos de Texto
```sql
CHAR(n)      -- Cadena de longitud fija
VARCHAR(n)   -- Cadena de longitud variable
TEXT         -- Texto largo (no estándar en algunos)
```

### 2.3 Tipos de Fecha/Hora
```sql
DATE        -- Solo fecha (YYYY-MM-DD)
TIME        -- Solo hora (HH:MM:SS)
TIMESTAMP   -- Fecha y hora
```

---

## 3. DDL (Data Definition Language)

### 3.1 Crear y Modificar Estructuras
```sql
-- Crear tabla
CREATE TABLE empleados (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    salario DECIMAL(10, 2)
);

-- Agregar columna
ALTER TABLE empleados ADD COLUMN departamento VARCHAR(50);

-- Eliminar tabla
DROP TABLE empleados;
```

---

## 4. DML (Data Manipulation Language)

### 4.1 Consultas SELECT
```sql
-- Selección básica
SELECT columna1, columna2 FROM tabla;

-- Filtrado
SELECT * FROM tabla WHERE condición;

-- Ordenamiento
SELECT * FROM tabla ORDER BY columna ASC;

-- Limitar resultados (no estándar en algunos)
SELECT * FROM tabla LIMIT 10;  -- MySQL, PostgreSQL
SELECT * FROM tabla FETCH FIRST 10 ROWS ONLY;  -- SQL estándar
```

### 4.2 Inserción, Actualización, Eliminación
```sql
INSERT INTO tabla (col1, col2) VALUES (val1, val2);
UPDATE tabla SET col1 = valor WHERE condición;
DELETE FROM tabla WHERE condición;
```

---

## 5. DCL (Data Control Language)

### 5.1 Permisos
```sql
-- Otorgar permisos
GRANT SELECT, INSERT ON tabla TO usuario;

-- Revocar permisos
REVOKE INSERT ON tabla FROM usuario;
```

---

## 6. Consultas Avanzadas Estándar

### 6.1 Subconsultas
```sql
SELECT nombre, salario 
FROM empleados
WHERE salario > (SELECT AVG(salario) FROM empleados);
```

### 6.2 Conjuntos (UNION, INTERSECT, EXCEPT)
```sql
-- UNION: Combinar resultados (sin duplicados)
SELECT columna FROM tabla1
UNION
SELECT columna FROM tabla2;

-- INTERSECT: Elementos comunes
SELECT columna FROM tabla1
INTERSECT
SELECT columna FROM tabla2;
```

---

## 7. Funciones de Agregación Estándar

```sql
COUNT(*)       -- Contar filas
SUM(columna)   -- Suma
AVG(columna)   -- Promedio
MIN(columna)   -- Mínimo
MAX(columna)   -- Máximo
```

---

## 8. Recursos de Aprendizaje
- Estándar ANSI: ANSI SQL-92, SQL:1999, SQL:2003
- Práctica: SQLZoo, LeetCode (Database section)
- Documentación: Adaptar según el RDBMS utilizado
