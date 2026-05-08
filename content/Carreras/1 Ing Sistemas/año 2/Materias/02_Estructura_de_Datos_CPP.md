# Estructura de Datos: Listas, Pilas, Colas, Árboles (C++/STL)

## Introducción a la STL (Standard Template Library)

La **STL** es la librería estándar de C++ que provee implementaciones de estructuras de datos genéricas (templates). Es extremadamente eficiente y es el estándar industrial.

---

## 1. Listas (Vectors y Lists)

### `std::vector` (Arreglo Dinámico)
Similar a `ArrayList` en Java. Crece automáticamente. Acceso aleatorio rápido (O(1)).

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<string> frutas;
    
    // Insertar al final (O(1) amortizado)
    frutas.push_back("Manzana");
    frutas.push_back("Banana");
    
    // Acceso por índice (O(1))
    cout << frutas[0] << endl; // Manzana
    
    // Tamaño
    cout << "Tamaño: " << frutas.size() << endl;
    
    // Iterar
    for (const auto& f : frutas) {
        cout << f << " ";
    }
    return 0;
}
```

### `std::list` (Lista Doblemente Enlazada)
Inserción y borrado rápidos en cualquier posición (O(1)), pero acceso lento (O(n)).

```cpp
#include <list>

list<int> numeros = {1, 2, 3};
numeros.push_front(0); // O(1)
numeros.push_back(4); // O(1)
```

---

## 2. Pilas (Stacks)

### `std::stack`
Estructura LIFO (Last-In, First-Out). Usa un `deque` por defecto debajo.

```cpp
#include <stack>

stack<int> pila;
pila.push(10);  // Meter
pila.push(20);
cout << pila.top() << endl; // 20 (Ver cima)
pila.pop();       // Sacar
cout << pila.top() << endl; // 10
```

---

## 3. Colas (Queues)

### `std::queue`
Estructura FIFO (First-In, First-Out).

```cpp
#include <queue>

queue<string> cola;
cola.push("Primero");
cola.push("Segundo");
cout << cola.front() << endl; // Primero
cola.pop();
cout << cola.front() << endl; // Segundo
```

### `std::deque` (Double-Ended Queue)
Puede insertar y sacar por ambos extremos (Muy eficiente).

```cpp
#include <deque>

deque<int> dq;
dq.push_front(1);
dq.push_back(2);
cout << dq.front() << endl; // 1
```

---

## 4. Árboles Binarios (Manual Implementation)

C++ no tiene un árbol binario estándar en la STL (sí tiene `std::set` y `std::map` que son árboles auto-balanceables, pero aquí haremos uno manual).

```cpp
#include <iostream>
using namespace std;

struct Nodo {
    int valor;
    Nodo* izq;
    Nodo* der;
    
    Nodo(int v) : valor(v), izq(nullptr), der(nullptr) {}
};

class ArbolBinario {
public:
    Nodo* raiz = nullptr;
    
    void insertar(int valor) {
        raiz = insertarRec(raiz, valor);
    }
    
private:
    Nodo* insertarRec(Nodo* nodo, int valor) {
        if (nodo == nullptr) return new Nodo(valor);
        if (valor < nodo->valor)
            nodo->izq = insertarRec(nodo->izq, valor);
        else
            nodo->der = insertarRec(nodo->der, valor);
        return nodo;
    }
};

int main() {
    ArbolBinario arbol;
    arbol.insertar(10);
    arbol.insertar(5);
    return 0;
}
```

---

## 5. Grafos (Usando STL)

### Representación: Lista de Adyacencia
```cpp
#include <vector>
#include <unordered_map>
#include <iostream>

int main() {
    // mapa: vertice -> lista de adyacencia
    unordered_map<int, vector<int>> grafo;
    
    // Añadir aristas
    grafo[1].push_back(2);
    grafo[1].push_back(3);
    grafo[2].push_back(3);
    
    // Imprimir
    for (auto& par : grafo) {
        cout << par.first << ": ";
        for (int v : par.second) cout << v << " ";
        cout << endl;
    }
    // Salida: 1: 2 3 
    //         2: 3
    return 0;
}
```

---

## 6. Complejidad (Big O) Resumen

| Estructura | Inserción | Eliminación | Búsqueda (Acceso) |
|------------|-----------|------------|----------------------|
| `vector` | O(1)* al final | O(n) | O(1) índice / O(n) valor |
| `list` | O(1) | O(1) | O(n) |
| `stack` | O(1) | O(1) | O(1) cima |
| `queue` | O(1) | O(1) | O(1) frente |
| `deque` | O(1) extremos | O(1) extremos | O(n) |

*Amortizado (la mayoría de las veces es O(1), excepto cuando debe redimensionarse).

---

## Recursos Recomendados

### Libros
*   **"Data Structures and Algorithms in C++"** - Adam Drozdek.
*   **"The C++ Programming Language"** - Bjarne Stroustrup (El creador, Capítulos de STL).

### Documentación
*   **cplusplus.com:** https://www.cplusplus.com/reference/stl/
*   **CPPReference:** https://en.cppreference.com/w/cpp/container

### Tutoriales
*   **LearnCpp:** https://www.learncpp.com/cpp-tutorial/stl-containers/
*   **GeeksforGeeks - C++ STL:** https://www.geeksforgeeks.org/cpp-stl/
