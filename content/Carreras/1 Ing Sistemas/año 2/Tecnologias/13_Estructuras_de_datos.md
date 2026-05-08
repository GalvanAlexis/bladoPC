# Conceptos: Estructuras de Datos

## Introducción
Las estructuras de datos son formas de organizar y almacenar datos para que puedan ser accedidos y modificados eficientemente.

---

## 1. Clasificación de Estructuras de Datos

### 1.1 Estructuras Lineales
- **Arreglos (Arrays)**: Tamaño fijo, acceso rápido O(1)
- **Listas Enlazadas**: Tamaño dinámico, inserción/eliminación O(1) (en posición conocida)
- **Pilas (Stacks)**: LIFO (Last In, First Out)
- **Colas (Queues)**: FIFO (First In, First Out)
- **Listas Dobles (Deque)**: Cola que permite inserción/eliminación en ambos extremos

### 1.2 Estructuras No Lineales
- **Árboles (Trees)**: Estructura jerárquica con nodo raíz
- **Grafos (Graphs)**: Conjunto de vértices conectados por aristas
- **Tablas Hash (Hash Tables)**: Mapeo clave-valor con acceso promedio O(1)

---

## 2. Arreglos y Listas

### 2.1 Arreglos (Array)
```java
int[] arr = new int[5];  // Arreglo de 5 enteros
arr[0] = 10;            // Asignación
int x = arr[0];          // Acceso O(1)
```

### 2.2 Listas Enlazadas (Linked List)
Cada elemento (nodo) contiene un valor y una referencia al siguiente nodo.

```java
class Nodo {
    int valor;
    Nodo siguiente;
    
    Nodo(int v) { valor = v; }
}
```

---

## 3. Pilas (Stack)

### 3.1 Operaciones
- **Push**: Agregar elemento al tope
- **Pop**: Quitar elemento del tope
- **Peek/Top**: Ver el tope sin quitarlo

### 3.2 Implementación (usando ArrayList en Java)
```java
class Pila {
    private ArrayList<Integer> elementos = new ArrayList<>();
    
    public void push(int x) { elementos.add(x); }
    public int pop() { return elementos.remove(elementos.size()-1); }
    public int peek() { return elementos.get(elementos.size()-1); }
}
```

---

## 4. Colas (Queue)

### 4.1 Operaciones
- **Enqueue**: Agregar al final
- **Dequeue**: Quitar del frente
- **Front**: Ver el frente sin quitarlo

### 4.2 Implementación
```java
class Cola {
    private LinkedList<Integer> elementos = new LinkedList<>();
    
    public void enqueue(int x) { elementos.addLast(x); }
    public int dequeue() { return elementos.removeFirst(); }
}
```

---

## 5. Árboles (Trees)

### 5.1 Árbol Binario
Cada nodo tiene a lo más dos hijos (izquierdo y derecho).

```java
class NodoArbol {
    int valor;
    NodoArbol izquierdo, derecho;
    
    NodoArbol(int v) { valor = v; }
}
```

### 5.2 Recorridos de Árboles
- **Inorder**: Izquierdo → Raíz → Derecho
- **Preorder**: Raíz → Izquierdo → Derecho
- **Postorder**: Izquierdo → Derecho → Raíz

```java
void inorder(NodoArbol nodo) {
    if (nodo != null) {
        inorder(nodo.izquierdo);
        System.out.println(nodo.valor);
        inorder(nodo.derecho);
    }
}
```

---

## 6. Grafos (Graphs)

### 6.1 Representación
- **Lista de adyacencia**: Cada vértice tiene una lista de sus vecinos
- **Matriz de adyacencia**: Matriz donde `matriz[i][j]` indica si hay arista

### 6.2 Recorridos de Grafos
- **BFS (Breadth-First Search)**: Usa cola, explora nivel por nivel
- **DFS (Depth-First Search)**: Usa pila (o recursión), explora en profundidad

---

## 7. Tablas Hash (HashMap)

### 7.1 Concepto
Mapea claves a valores usando una función hash.

### 7.2 Colisiones
Cuando dos claves tienen el mismo hash. Soluciones:
- **Encadenamiento**: Cada casilla tiene una lista enlazada
- **Direccionamiento abierto**: Buscar otra casilla disponible

---

## 8. Complejidad (Big O)

| Estructura | Acceso | Búsqueda | Inserción | Eliminación |
|------------|--------|----------|-----------|-------------|
| Arreglo    | O(1)   | O(n)     | O(n)      | O(n)        |
| Lista Enlazada | O(n) | O(n)   | O(1)*     | O(1)*       |
| Pila/Cola  | O(n)   | O(n)     | O(1)      | O(1)        |
| Árbol Binario Balanceado | O(log n) | O(log n) | O(log n) | O(log n) |
| Tabla Hash | N/A    | O(1)*    | O(1)*     | O(1)*       |

*Promedio (mejor caso). Peor caso puede ser O(n).

---

## 9. Recursos de Aprendizaje
- Libro: "Introduction to Algorithms" (CLRS)
- Visualización: visualgo.net
- Práctica: Implementar cada estructura desde cero
