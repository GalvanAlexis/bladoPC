# Programación Orientada a Objetos (Java): Clases, Herencia, Polimorfismo, Interfaces

Java es un lenguaje **puramente orientado a objetos** (salvo los tipos primitivos). Todo en Java vive dentro de **clases**.

---

## 1. Clases y Objetos (`class`)

### Definición
```java
public class Coche {
    // Atributos (Estado)
    String marca;
    int velocidad;
    
    // Constructor (Método especial para crear objetos)
    public Coche(String m) {
        this.marca = m;
        this.velocidad = 0;
    }
    
    // Métodos (Comportamiento)
    public void acelerar(int cantidad) {
        velocidad += cantidad;
    }
}
```

### Instanciación (Crear Objeto)
```java
public class Main {
    public static void main(String[] args) {
        Coche miCoche = new Coche("Toyota"); // Llamada al constructor
        miCoche.acelerar(50);
        System.out.println(miCoche.velocidad); // 50
    }
}
```

---

## 2. Modificadores de Acceso (Encapsulamiento)

| Modificador | Misma Clase | Mismo Paquete | Subclase | Otro Paquete |
|-------------|--------------|---------------|----------|--------------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| (default) | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

**Encapsulamiento (Getters/Setters):**
```java
public class Persona {
    private String nombre; // Ninguno puede ver esto directamente
    
    // Getter
    public String getNombre() { return nombre; }
    
    // Setter con validación
    public void setNombre(String n) {
        if (n != null && !n.isEmpty()) {
            this.nombre = n;
        }
    }
}
```

---

## 3. Herencia (`extends`)

Permite que una clase "hija" (subclase) **reutilice** y **extienda** una clase "padre" (superclase).

```java
// Superclase
class Animal {
    protected String nombre;
    
    public void hacerSonido() {
        System.out.println("Algun sonido...");
    }
}

// Subclase (Herencia)
class Perro extends Animal {
    public Perro(String n) {
        super.nombre = n; // Acceso a atributo de la padre
    }
    
    @Override // Anotación para verificar que estamos sobrescribiendo
    public void hacerSonido() {
        System.out.println("Guau!");
    }
}
```

---

## 4. Polimorfismo

Capacidad de un objeto de tomar **muchas formas**. Se logra mediante la sobrescritura (Override) y la referencia de tipo **superclase**.

### Uso (Polimorfismo de Inclusión)
```java
Animal miAnimal = new Perro("Fido"); // Un Animal puede ser un Perro
miAnimal.hacerSonido(); // Imprime "Guau!" (Llama al de Perro)
```

### Arrays Polimórficos
```java
Animal[] animales = { new Perro("Fido"), new Gato("Miau") };
for (Animal a : animales) {
    a.hacerSonido(); // Cada uno hace su propio sonido
}
```

---

## 5. Clases y Métodos `abstract`

Si una clase es demasiado abstracta para instanciarse sola.

```java
abstract class Figura {
    // Método abstracto (sin implementación, obliga a las hijas a implementarlo)
    public abstract double calcularArea();
}

class Circulo extends Figura {
    private double radio;
    
    public Circulo(double r) { this.radio = r; }
    
    @Override
    public double calcularArea() {
        return Math.PI * radio * radio;
    }
}
```

---

## 6. Interfaces (`interface`)

Una interfaz es un **contrato**. Una clase puede implementar múltiples interfaces.

```java
// Definición
interface Volable {
    void volar(); // Métodos son implícitamente public y abstract
}

interface Nadador {
    void nadar();
}

// Implementación múltiple
class Pato implements Volable, Nadador {
    @Override
    public void volar() { System.out.println("Pato volando"); }
    
    @Override
    public void nadar() { System.out.println("Pato nadando"); }
}
```

**Diferencia Clave:**
*   **Clase Abstracta:** "Es un" (Herencia simple).
*   **Interfaz:** "Sabe hacer" / "Tiene capacidad de" (Comportamiento múltiple).

---

## 7. `super` y `this`

| Palabra Clave | Significado |
|--------------|-------------|
| `this` | Referencia al objeto **actual**. |
| `super` | Referencia a la clase **padre** (superclase). |

```java
class Hijo extends Padre {
    String dato;
    
    Hijo(String d) {
        super(d + " procesado"); // Llama al constructor del padre
        this.dato = d; // Atributo propio
    }
}
```

---

## 8. Clase `Object` (La Madre de Todas)

Todas las clases en Java heredan implícitamente de `java.lang.Object`.

### Métodos Importantes
*   `toString()`: Devuelve la representación de texto. Debes sobrescribirla.
*   `equals(Object obj)`: Compara si dos objetos son "iguales" en lógica de negocio.
*   `hashCode()`: Usado por `HashMap` y `HashSet`. Si sobrescribes `equals`, **debes** sobrescribir también `hashCode`.

```java
class Usuario {
    String id;
    
    public Usuario(String id) { this.id = id; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario)) return false;
        Usuario u = (Usuario) o;
        return this.id.equals(u.id);
    }
    
    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
```

---

## Resumen Visual

```text
                  ┌─────────────────┐
                  │     Object        │ (Base)
                  └────────┬────────┘
                           │
            ┌──────────────▼──────────────┐
            │        Animal             │ (Superclase)
            └──────────────┬──────────────┘
                       │
          ┌────────────▼────────────┐   ┌────────────▼────────────┐
          │      Perro            │   │      Gato             │ (Subclases)
          └─────────────────────┘   └─────────────────────┘
          [implements Corredor]    [implements Corredor]
```

---

## Recursos Recomendados

### Libros
*   **"Head First Java"** - Sierra & Bates (Muy visual, excelente para POO en Java).
*   **"Effective Java"** - Joshua Bloch (Ítems sobre mejores prácticas).

### Documentación
*   **Official Java Tutorials:** https://docs.oracle.com/javase/tutorial/java/concepts/
*   **Baeldung (Spring):** https://www.baeldung.com/java-oop

### Tutoriales
*   **Programming with Mosh (YouTube):** "Java Tutorial for Beginners" (Capítulos de OOP).
*   **Telusko (YouTube):** "Java OOP Concepts" (Playlist completa).
