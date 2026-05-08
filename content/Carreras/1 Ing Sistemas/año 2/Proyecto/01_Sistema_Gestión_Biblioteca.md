# Proyecto: Sistema de Gestión de Biblioteca

## 📋 Descripción
Aplicación de consola con base de datos para gestionar libros, usuarios y préstamos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una biblioteca real o simulada.

---

## 🛠️ Stack Tecnológico
- **Lenguaje**: Java (POO avanzado)
- **Base de Datos**: MySQL
- **Conectividad**: JDBC (Java Database Connectivity)
- **Control de Versiones**: Git
- **IDE Recomendado**: IntelliJ IDEA o Eclipse

---

## 🎯 Objetivos de Aprendizaje
- [ ] Aplicar POO (clases Libro, Usuario, Préstamo)
- [ ] Diseñar esquema de base de datos relacional
- [ ] Implementar operaciones CRUD
- [ ] Manejo de excepciones y validaciones

---

## 📂 Estructura Sugerida del Proyecto
```
SistemaBiblioteca/
├── src/
│   ├── Main.java
│   ├── model/
│   │   ├── Libro.java
│   │   ├── Usuario.java
│   │   └── Prestamo.java
│   ├── dao/
│   │   ├── LibroDAO.java
│   │   ├── UsuarioDAO.java
│   │   └── PrestamoDAO.java
│   ├── database/
│   │   └── ConexionDB.java
│   └── util/
│       └── Validador.java
├── sql/
│   └── schema.sql
└── README.md
```

---

## 🗄️ Esquema de Base de Datos (MySQL)

### script: `sql/schema.sql`
```sql
CREATE DATABASE biblioteca;
USE biblioteca;

-- Tabla Libros
CREATE TABLE libros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    disponible BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(15),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Préstamos
CREATE TABLE prestamos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    libro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    estado ENUM('ACTIVO', 'DEVUELTO', 'VENCIDO') DEFAULT 'ACTIVO',
    
    FOREIGN KEY (libro_id) REFERENCES libros(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

---

## 💻 Ejemplo de Clase: Libro.java

```java
package model;

public class Libro {
    private int id;
    private String titulo;
    private String autor;
    private String isbn;
    private boolean disponible;
    
    // Constructor
    public Libro(String titulo, String autor, String isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.disponible = true;
    }
    
    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }
    
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    
    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
    
    @Override
    public String toString() {
        return "Libro [ID: " + id + ", Título: " + titulo + 
               ", Autor: " + autor + ", Disponible: " + disponible + "]";
    }
}
```

---

## 💻 Ejemplo de DAO: LibroDAO.java (CRUD básico)

```java
package dao;

import model.Libro;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LibroDAO {
    private Connection conexion;
    
    public LibroDAO(Connection conexion) {
        this.conexion = conexion;
    }
    
    // CREATE
    public void insertar(Libro libro) throws SQLException {
        String sql = "INSERT INTO libros (titulo, autor, isbn) VALUES (?, ?, ?)";
        PreparedStatement stmt = conexion.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        stmt.setString(1, libro.getTitulo());
        stmt.setString(2, libro.getAutor());
        stmt.setString(3, libro.getIsbn());
        stmt.executeUpdate();
        
        // Obtener ID generado
        ResultSet rs = stmt.getGeneratedKeys();
        if (rs.next()) {
            libro.setId(rs.getInt(1));
        }
    }
    
    // READ (todos)
    public List<Libro> listarTodos() throws SQLException {
        List<Libro> libros = new ArrayList<>();
        String sql = "SELECT * FROM libros";
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        
        while (rs.next()) {
            Libro l = new Libro(rs.getString("titulo"), 
                                  rs.getString("autor"), 
                                  rs.getString("isbn"));
            l.setId(rs.getInt("id"));
            l.setDisponible(rs.getBoolean("disponible"));
            libros.add(l);
        }
        return libros;
    }
    
    // UPDATE
    public void actualizar(Libro libro) throws SQLException {
        String sql = "UPDATE libros SET titulo=?, autor=?, isbn=?, disponible=? WHERE id=?";
        PreparedStatement stmt = conexion.prepareStatement(sql);
        stmt.setString(1, libro.getTitulo());
        stmt.setString(2, libro.getAutor());
        stmt.setString(3, libro.getIsbn());
        stmt.setBoolean(4, libro.isDisponible());
        stmt.setInt(5, libro.getId());
        stmt.executeUpdate();
    }
    
    // DELETE
    public void eliminar(int id) throws SQLException {
        String sql = "DELETE FROM libros WHERE id=?";
        PreparedStatement stmt = conexion.prepareStatement(sql);
        stmt.setInt(1, id);
        stmt.executeUpdate();
    }
}
```

---

## 📝 Menú Principal (Consola)

```java
public class Main {
    public static void main(String[] args) {
        // Inicializar conexión
        // Mostrar menú:
        // 1. Registrar libro
        // 2. Listar libros
        // 3. Actualizar libro
        // 4. Eliminar libro
        // 5. Registrar usuario
        // 6. Realizar préstamo
        // 7. Devolver libro
        // 8. Ver préstamos activos
        // 9. Salir
    }
}
```

---

## ✅ Criterios de Aceptación
1. **POO**: Uso correcto de clases, herencia (si aplica), encapsulamiento
2. **Base de Datos**: Esquema normalizado, relaciones correctas
3. **CRUD**: Todas las operaciones funcionando para Libros y Usuarios
4. **Préstamos**: Lógica de préstamo y devolución con validaciones
5. **Excepciones**: Manejo de errores (ej. libro no encontrado, usuario duplicado)
6. **Git**: Repositorio con commits descriptivos (mínimo 5 commits)

---

## 📚 Recursos de Apoyo
- JDBC Tutorial: docs.oracle.com/javase/tutorial/jdbc/
- MySQL Workbench: Para diseñar el esquema visualmente
- Ejemplo de flujo: Crear base → Conectar Java → Implementar DAO → Probar CRUD

---

## 🚀 Pasos Sugeridos de Implementación
1. Diseñar y crear la base de datos en MySQL (script sql/schema.sql)
2. Crear las clases del modelo (Libro, Usuario, Préstamo)
3. Implementar la clase de conexión (ConexionDB.java)
4. Implementar DAOs para cada entidad (operaciones CRUD)
5. Crear el menú principal en consola
6. Implementar validaciones (ej. no prestar libro no disponible)
7. Probar todo el flujo
8. Hacer commits en Git por cada funcionalidad completa
