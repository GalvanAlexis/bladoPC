# Estructura de Datos: Listas, Pilas, Colas, Árboles (Java/Collections)

La **Java Collections Framework (JCF)** es un conjunto de clases e interfaces en `java.util` que implementan estructuras de datos estándar. Es la forma profesional de manejar colecciones en Java.

---

## 1. `List` (Listas Ordenadas)

Permite duplicados y mantiene el orden de inserción.

### `ArrayList` (Arreglo Dinámico)
Basado en un arreglo redimensionable. Acceso rápido **O(1)**, inserción/eliminación en medio lento **O(n)**.

```java
import java.util.ArrayList;
import java.util.List;

public class EjemploList {
    public static void main(String[] args) {
        List<String> frutas = new ArrayList<>();
        
        // Añadir (O(1) amortizado)
        frutas.add("Manzana");
        frutas.add("Banana");
        
        // Acceso por índice (O(1))
        System.out.println(frutas.get(0)); // Manzana
        
        // Tamaño
        System.out.println(frutas.size()); // 2
    }
}
```

### `LinkedList` (Lista Doblemente Enlazada)
Mejor para inserciones/eliminaciones frecuentes **O(1)**, pero acceso lento **O(n)**.

```java
import java.util.LinkedList;

LinkedList<Integer> numeros = new LinkedList<>();
numeros.addFirst(10); // O(1)
numeros.addLast(20);  // O(1)
```

---

## 2. `Stack` (Pila - LIFO)

Aunque Java tiene la clase `Stack` (hereda de `Vector`), hoy se recomienda usar `Deque` (Double Ended Queue).

```java
import java.util.ArrayDeque;
import java.util.Deque;

Deque<String> pila = new ArrayDeque<>();
pila.push("Primero"); // Meter
pila.push("Segundo");

System.out.println(pila.pop()); // Segundo (Sacar)
```

---

## 3. `Queue` (Cola - FIFO)

Se usa `LinkedList` o `ArrayDeque` para implementar colas.

```java
import java.util.Queue;
import java.util.LinkedList;

Queue<String> cola = new LinkedList<>();
cola.offer("A"); // Encolar (offer es seguro)
cola.offer("B");

System.out.println(cola.poll()); // A (Desencolar)
```

---

## 4. `Set` (Conjuntos - Sin Duplicados)

### `HashSet` (Tabla Hash)
Sin orden garantizado. Inserción, eliminación y búsqueda **O(1)** promedio.

```java
import java.util.HashSet;
import java.util.Set;

Set<String> conjunto = new HashSet<>();
conjunto.add("Rojo");
conjunto.add("Azul");
conjunto.add("Rojo"); // No se añade (duplicado)

System.out.println(conjunto.size()); // 2
```

### `TreeSet` (Árbol Rojo-Negro)
Mantiene elementos ordenados. Operaciones **O(log n)**.

```java
import java.util.TreeSet;

TreeSet<Integer> ordenados = new TreeSet<>();
ordenados.add(5);
ordenados.add(1);
ordenados.add(3);

System.out.println(ordenados); // [1, 3, 5] (Ordenado)
```

---

## 5. `Map` (Diccionarios / Tablas Hash)

Almacena pares **Clave-Valor**.

### `HashMap`
Sin orden. O(1) promedio para `get` y `put`.

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> edades = new HashMap<>();
edades.put("Ana", 25);
edades.put("Luis", 30);

System.out.println(edades.get("Ana")); // 25
System.out.println(edades.containsKey("Juan")); // false
```

### `TreeMap`
Ordenado por clave. O(log n).

---

## 6. Árboles Binarios de Búsqueda (BST - Manual)

La JCF no tiene un BST simple, así que implementamos uno manual para entender.

```java
class Nodo {
    int valor;
    Nodo izq, der;
    
    Nodo(int v) { valor = v; }
}

class ArbolBinario {
    Nodo raiz;
    
    void insertar(int valor) {
        raiz = insertarRec(raiz, valor);
    }
    
    private Nodo insertarRec(Nodo nodo, int valor) {
        if (nodo == null) return new Nodo(valor);
        if (valor < nodo.valor)
            nodo.izq = insertarRec(nodo.izq, valor);
        else if (valor > nodo.valor)
            nodo.der = insertarRec(nodo.der, valor);
        return nodo;
    }
}
```

---

## 7. Grafos (Usando `Map` de Java)

```java
import java.util.*;

public class Grafo {
    // Lista de adyacencia: Vertice -> Lista de vecinos
    private Map<Integer, List<Integer>> adj = new HashMap<>();
    
    void añadirArista(int v1, int v2) {
        adj.computeIfAbsent(v1, k -> new ArrayList<>()).add(v2);
        adj.computeIfAbsent(v2, k -> new ArrayList<>()).add(v1); // No dirigido
    }
    
    void imprimir() {
        for (var entry : adj.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}
```

---

## 8. Complejidad (Big O) Resumen Java

| Estructura | Inserción | Eliminación | Búsqueda | Acceso |
|------------|-----------|------------|----------|--------|
| `ArrayList` | O(1)* | O(n) | O(n) | O(1) |
| `LinkedList` | O(1) | O(1) | O(n) | O(n) |
| `HashSet`/`HashMap` | O(1)* | O(1)* | O(1)* | N/A |
| `TreeSet`/`TreeMap` | O(log n) | O(log n) | O(log n) | N/A |
| `PriorityQueue` | O(log n) | O(log n) | O(n) peek | N/A |

*Amortizado / Promedio.

---

## Recursos Recomendados

### Libros
*   **"Core Java Volume I"** - Cay S. Horstmann (Capítulos sobre Colecciones).
*   **"Effective Java"** - Joshua Bloch (Ítems sobre genéricos y colecciones).

### Documentación
*   **Java Collections:** https://docs.oracle.com/javase/tutorial/collections/

### Tutoriales
*   **Jenkov.com:** http://tutorials.jenkov.com/java-collections/index.html
*   **Baeldung:** https://www.baeldung.com/java-collections
