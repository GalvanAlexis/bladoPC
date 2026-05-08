# Lenguaje: Java

## Introducción
Java es un lenguaje de programación orientado a objetos, robusto y multiplataforma. Es ampliamente utilizado en sistemas empresariales, aplicaciones Android y backend.

---

## 1. Características Principales

### 1.1 Write Once, Run Anywhere (WORA)
Java compila a bytecode que se ejecuta en cualquier máquina virtual (JVM) sin necesidad de recompilar.

### 1.2 Orientado a Objetos
Todo en Java está basado en clases y objetos (excepto tipos primitivos).

### 1.3 Tipado Fuerte y Estático
Las variables deben declararse con un tipo específico y no pueden cambiar.

---

## 2. Configuración del Entorno

### 2.1 JDK (Java Development Kit)
- Incluye JRE (Java Runtime Environment) y herramientas de desarrollo
- Verificar instalación: `java -version` y `javac -version`

### 2.2 IDEs Recomendados
- **IntelliJ IDEA**: Más popular, gran integración
- **Eclipse**: Tradicional, ampliamente usado
- **NetBeans**: Alternativa gratuita

---

## 3. Sintaxis Básica

### 3.1 Estructura de un Programa
```java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("Hola, Mundo!");
    }
}
```

### 3.2 Variables y Tipos
```java
int edad = 25;               // Entero
double precio = 99.99;       // Decimal
boolean activo = true;       // Booleano
String nombre = "Blado";     // Cadena (objeto)
char letra = 'A';            // Carácter
```

### 3.3 Estructuras de Control
```java
// Condicional
if (edad >= 18) {
    System.out.println("Mayor de edad");
} else {
    System.out.println("Menor de edad");
}

// Bucle
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

---

## 4. Programación Orientada a Objetos en Java

### 4.1 Clases y Objetos
```java
public class Persona {
    // Atributos
    private String nombre;
    private int edad;
    
    // Constructor
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    // Métodos
    public void saludar() {
        System.out.println("Hola, soy " + nombre);
    }
}

// Uso
Persona p = new Persona("Blado", 25);
p.saludar();
```

### 4.2 Herencia
```java
public class Estudiante extends Persona {
    private String carrera;
    
    public Estudiante(String nombre, int edad, String carrera) {
        super(nombre, edad);
        this.carrera = carrera;
    }
}
```

### 4.3 Polimorfismo e Interfaces
```java
interface Trabajable {
    void trabajar();
}

class Ingeniero implements Trabajable {
    public void trabajar() {
        System.out.println("Diseñando sistemas");
    }
}
```

---

## 5. Colecciones (Collections Framework)

### 5.1 Listas (ArrayList)
```java
import java.util.ArrayList;

ArrayList<String> nombres = new ArrayList<>();
nombres.add("Blado");
nombres.add("Ana");
String primero = nombres.get(0);
```

### 5.2 Mapas (HashMap)
```java
import java.util.HashMap;

HashMap<String, Integer> edades = new HashMap<>();
edades.put("Blado", 25);
int edad = edades.get("Blado");
```

---

## 6. Manejo de Excepciones
```java
try {
    int resultado = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Bloque final");
}
```

---

## 7. Recursos de Aprendizaje
- Documentación oficial: docs.oracle.com/javase/tutorial/
- Libro: "Head First Java"
- Práctica: HackerRank, LeetCode (problemas en Java)
