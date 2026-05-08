# Matemática Discreta: Lógica, Conjuntos, Grafos, Combinatoria (Python)

## Introducción
La matemática discreta estudia estructuras que son fundamentalmente discretas (no continuas). Es la base teórica de la informática.

---

## 1. Lógica Proposicional

### 1.1 Proposiciones y Conectivos
Una **proposición** es una afirmación que es verdadera o falsa.
- **Conectivos**: AND (∧), OR (∨), NOT (¬), IMPLICA (→), SI Y SOLO SI (↔)

### 1.2 Tablas de Verdad
Método para evaluar el valor de verdad de expresiones complejas.

### 1.3 Cuantificadores
- **Universal (∀)**: "Para todo"
- **Existencial (∃)**: "Existe al menos uno"

---

## 2. Conjuntos

### 2.1 Definiciones Básicas
- **Conjunto**: Colección de elementos únicos
- **Subconjunto**: A ⊆ B (todos los elementos de A están en B)
- **Conjunto vacío**: ∅

### 2.2 Operaciones con Conjuntos
- **Unión (A ∪ B)**: Elementos en A o en B
- **Intersección (A ∩ B)**: Elementos en A y en B
- **Diferencia (A - B)**: Elementos en A que no están en B
- **Complemento (A')**: Elementos que no están en A

### 2.3 Diagramas de Venn
Representación gráfica de operaciones entre conjuntos.

---

## 3. Teoría de Grafos

### 3.1 Definiciones
- **Grafo**: G = (V, E) donde V son vértices y E son aristas
- **Grafo dirigido**: Aristas tienen dirección
- **Grafo no dirigido**: Aristas no tienen dirección
- **Peso**: Valor asociado a una arista

### 3.2 Tipos de Grafos
- **Árbol**: Grafo conexo sin ciclos
- **Grafo completo**: Todos los vértices conectados entre sí
- **Grafo bipartito**: Vértices divididos en dos conjuntos

### 3.3 Recorridos de Grafos
- **BFS (Breadth-First Search)**: Ancho
- **DFS (Depth-First Search)**: Profundidad

---

## 4. Combinatoria

### 4.1 Principio de Multiplicación
Si hay m formas de hacer A y n formas de hacer B, hay m × n formas de hacer A y B.

### 4.2 Permutaciones
Ordenamiento de elementos donde importa el orden.
- **Fórmula**: P(n, r) = n! / (n-r)!

### 4.3 Combinaciones
Selección de elementos donde no importa el orden.
- **Fórmula**: C(n, r) = n! / (r! × (n-r)!)

---

## 5. Implementación en Python

```python
# Conjuntos en Python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Operaciones
union = A | B
interseccion = A & B
diferencia = A - B

# Grafos con networkx
import networkx as nx
G = nx.Graph()
G.add_edges_from([(1, 2), (2, 3), (3, 4)])
```

---

## 6. Aplicaciones en Computación
- **Lógica**: Diseño de circuitos digitales, programación lógica
- **Conjuntos**: Bases de datos (operaciones SQL), teoría de lenguajes
- **Grafos**: Redes, algoritmos de ruta, estructuras de datos
- **Combinatoria**: Análisis de algoritmos, criptografía
