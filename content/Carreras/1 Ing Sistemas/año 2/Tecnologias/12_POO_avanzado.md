# Conceptos: POO Avanzado

## Introducción
La Programación Orientada a Objetos (POO) avanzada incluye conceptos más allá de clases y objetos básicos. Estos patrones y técnicas permiten diseñar sistemas más flexibles y mantenibles.

---

## 1. Principios SOLID

### 1.1 S - Single Responsibility (Responsabilidad Única)
Una clase debe tener una, y solo una, razón para cambiar.

**Ejemplo incorrecto**: Una clase `Empleado` que gestiona datos y también genera reportes.
**Ejemplo correcto**: Clase `Empleado` (datos) y clase `ReporteEmpleado` (reportes).

### 1.2 O - Open/Closed (Abierto/Cerrado)
Las entidades deben estar abiertas para extensión, pero cerradas para modificación.

**Ejemplo**: Usar herencia o interfaces para agregar nuevos tipos sin modificar código existente.

### 1.3 L - Liskov Substitution (Sustitución de Liskov)
Los objetos de una clase derivada deben poder sustituir a los de la clase base sin alterar el comportamiento.

**Ejemplo**: Si `Pato` hereda de `Ave` y `Ave` vuela, entonces `Pato` debe poder volar.

### 1.4 I - Interface Segregation (Segregación de Interfaces)
Los clientes no deben depender de interfaces que no utilizan.

**Ejemplo**: En lugar de una interfaz `Trabajador` con todos los métodos, crear interfaces específicas: `Cocinero`, `Programador`.

### 1.5 D - Dependency Inversion (Inversión de Dependencias)
Depender de abstracciones, no de concreciones.

**Ejemplo**: Una clase `Servicio` que depende de una interfaz `Repositorio`, no de `RepositorioMySQL` directamente.

---

## 2. Patrones de Diseño (Básicos)

### 2.1 Singleton
Garantiza que una clase tenga una única instancia y proporciona un punto de acceso global.

**Java**:
```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

### 2.2 Factory Method
Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.

### 2.3 Observer
Define una dependencia de uno-a-muchos donde cuando un objeto cambia, todos sus dependientes son notificados.

---

## 3. Clases y Métodos Abstractos

### 3.1 Clase Abstracta
No se puede instanciar. Define una estructura base para sus subclases.

**Java**:
```java
public abstract class Figura {
    public abstract double area();  // Método abstracto
}
```

### 3.2 Interfaz vs Clase Abstracta
- **Interfaz**: Solo define el "qué" (métodos), sin implementación (generalmente)
- **Clase Abstracta**: Define el "qué" y puede incluir el "cómo" (métodos implementados)

---

## 4. Polimorfismo Avanzado

### 4.1 Sobrecarga (Overloading)
Múltiples métodos con el mismo nombre pero diferentes parámetros.

```java
public void imprimir(String texto) { ... }
public void imprimir(int numero) { ... }
```

### 4.2 Sobreescritura (Overriding)
Una subclase redefine un método de la superclase.

```java
@Override
public void area() { ... }  // En subclase
```

---

## 5. Composición vs Herencia

### 5.1 Herencia ("Es un")
`Pato` es un `Ave`. Reutilización mediante jerarquía.

### 5.2 Composición ("Tiene un")
`Coche` tiene un `Motor`. Reutilización mediante delegación.

**Preferir composición sobre herencia** cuando sea posible, ya que es más flexible.

---

## 6. Principio DRY (Don't Repeat Yourself)
Evitar duplicación de código. Extraer lógica común a métodos o clases reutilizables.

---

## 7. Recursos de Aprendizaje
- Libro: "Head First Design Patterns"
- Libro: "Clean Code" (Robert C. Martin)
- Práctica: Refactorizar código para cumplir SOLID
