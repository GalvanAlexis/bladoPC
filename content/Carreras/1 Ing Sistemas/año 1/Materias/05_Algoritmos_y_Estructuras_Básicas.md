# Algoritmos y Estructuras Básicas: Ciclos, Arreglos, Búsquedas Simples

## Fundamentos de Algoritmos

Un **algoritmo** es una secuencia finita, ordenada y lógica de pasos para resolver un problema. Debe ser:
1.  **Preciso:** Instrucciones claras sin ambigüedad.
2.  **Definido:** Produce el mismo resultado con los mismos datos de entrada.
3.  **Finito:** Debe terminar en un tiempo finito.

### Complejidad Computacional (Intro a Big O)
Medimos qué tan eficiente es un algoritmo en tiempo y espacio.
*   **O(1):** Tiempo constante (acceso a un elemento de un array por índice).
*   **O(n):** Tiempo lineal (recorrer una lista de n elementos).
*   **O(n²):** Tiempo cuadrático (bucle anidado: for dentro de for).

---

## Estructuras de Datos: Arreglos (Arrays) y Listas

### Arreglos (Concepto Teórico)
Un arreglo es una estructura de datos que almacena elementos del **mismo tipo** en posiciones de memoria **contiguas**.
*   **Índice:** Cada posición tiene un número (índice) que comienza en 0.
*   **Tamaño Fijo:** En muchos lenguajes (C, Java), el tamaño se define al crearlo.

### Listas en Python (`list`)
Python no tiene "arreglos" nativos en el sentido estricto de C, pero las **listas (`list`)** son el equivalente más cercano, aunque son **dinámicas** (pueden crecer) y pueden contener tipos mixtos.

#### Creación y Acceso
```python
# Crear lista (arreglo)
frutas = ["manzana", "banana", "cereza"]

# Acceso por índice (Indexing)
print(frutas[0])  # "manzana" (primer elemento)
print(frutas[-1]) # "cereza" (último elemento, índice negativo)
```

#### Rebanado (Slicing)
Permite obtener una sublista sin modificar la original.
*   **Sintaxis:** `lista[inicio:fin:paso]` (el índice `fin` no se incluye).
```python
numeros = [0, 1, 2, 3, 4, 5]
print(numeros[1:4])    # [1, 2, 3]
print(numeros[:3])     # [0, 1, 2] (desde el inicio)
print(numeros[::2])    # [0, 2, 4] (cada 2 elementos)
print(numeros[::-1])   # [5, 4, 3, 2, 1, 0] (invertir lista)
```

#### Métodos Importantes
*   `append(x)`: Añade x al final.
*   `insert(i, x)`: Inserta x en la posición i.
*   `pop(i)`: Elimina y devuelve el elemento en la posición i (si no se da i, el último).
*   `len(lista)`: Devuelve el número de elementos (tamaño).

---

## Ciclos (Bucles / Loops)

Los ciclos permiten ejecutar un bloque de código repetidamente.

### 1. Bucle `while` (Mientras)
Ejecuta el bloque **mientras** la condición sea `True`. **Cuidado con los bucles infinitos.**

```python
contador = 0
while contador < 5:
    print(f"Iteración: {contador}")
    contador += 1  # Esencial: actualizar la variable para que termine
```

**Control de flujo dentro de bucles:**
*   `break`: Sale inmediatamente del bucle (rompe el ciclo).
*   `continue`: Salta el resto del código en esta iteración y pasa a la siguiente.

```python
num = 0
while num < 10:
    num += 1
    if num % 2 == 0:  # Si es par
        continue     # Salta el print, va a la siguiente iteración
    if num == 7:
        break         # Sale del bucle cuando llega a 7
    print(num)
```

### 2. Bucle `for` (Para)
Itera sobre una secuencia (lista, string, rango) desde el inicio hasta el final. Es más seguro y común para recorrer arreglos.

#### Función `range()`
Genera una secuencia de números.
*   `range(n)`: 0, 1, 2, ..., n-1.
*   `range(inicio, fin)`: inicio, inicio+1, ..., fin-1.
*   `range(inicio, fin, paso)`: Salta de `paso` en `paso`.

```python
# Imprimir del 0 al 4
for i in range(5):
    print(i)

# Recorrer una lista (arreglo) usando índices
frutas = ["manzana", "banana", "cereza"]
for i in range(len(frutas)):
    print(f"Índice {i}: {frutas[i]}")

# Iteración directa (Pythonic)
for fruta in frutas:
    print(fruta.upper())
```

### `enumerate()`
Función muy útil que devuelve el índice y el valor al mismo tiempo.
```python
for index, value in enumerate(["a", "b", "c"]):
    print(index, value)
# Salida: 0 a, 1 b, 2 c
```

---

## Búsquedas Simples (Searching Algorithms)

### 1. Búsqueda Lineal (Linear Search)
Es el algoritmo más simple. Consiste en recorrer elemento por elemento desde el inicio hasta encontrar el valor buscado o llegar al final.

**Lógica:**
1.  Empezar en el índice 0.
2.  Comparar el elemento actual con el valor buscado.
3.  Si coinciden, devolver la posición (índice).
4.  Si no, pasar al siguiente.
5.  Si se llega al final y no se encontró, devolver -1 (o `None`).

**Complejidad:** O(n) - En el peor caso (no está el elemento), mirás todos los n elementos.

```python
def busqueda_lineal(lista, objetivo):
    """
    Busca un objetivo en una lista.
    Devuelve el índice si lo encuentra, sino -1.
    """
    for i in range(len(lista)):
        if lista[i] == objetivo:
            return i  # ¡Éxito! Termina aquí.
    return -1  # No encontrado

# Uso
datos = [10, 25, 30, 15, 40]
resultado = busqueda_lineal(datos, 30)
print(f"Encontrado en índice: {resultado}")  # 2

resultado = busqueda_lineal(datos, 99)
print(f"Encontrado en índice: {resultado}")  # -1
```

### 2. Búsqueda Binaria (Binary Search) - *Introducción*
**Requisito:** La lista debe estar **ordenada**.
Divide el espacio de búsqueda a la mitad en cada paso.

**Lógica:**
1.  Mirar el elemento del medio.
2.  Si es el buscado, terminar.
3.  Si el buscado es menor, descartar la mitad derecha.
4.  Si es mayor, descartar la mitad izquierda.
5.  Repetir hasta encontrar o que el espacio sea vacío.

**Complejidad:** O(log n) - Muy eficiente, crece muy lento respecto a n.

```python
def busqueda_binaria(lista_ordenada, objetivo):
    bajo = 0
    alto = len(lista_ordenada) - 1
    
    while bajo <= alto:
        medio = (bajo + alto) // 2
        estimacion = lista_ordenada[medio]
        
        if estimacion == objetivo:
            return medio
        elif estimacion < objetivo:
            bajo = medio + 1  # Buscar en la mitad derecha
        else:
            alto = medio - 1   # Buscar en la mitad izquierda
            
    return -1

# Uso (Nota: la lista está ordenada)
numeros_ordenados = [1, 3, 5, 7, 9, 11]
print(busqueda_binaria(numeros_ordenados, 7))   # 3
print(busqueda_binaria(numeros_ordenados, 10)) # -1
```

---

## Recursos Recomendados

### Libros
*   **"Grokking Algorithms"** - Aditya Bhargava (Ilustrado, muy visual, ideal para iniciantes).
*   **"Introduction to Algorithms"** - Cormen, Leiserson (CLRS - El libro de referencia académica).

### Documentación
*   **Python Data Structures:** https://docs.python.org/3/tutorial/datastructures.html
*   **Visualizing Algorithms:** https://visualgo.net/en (Excelente para ver cómo funcionan los bucles y búsquedas).

### Tutoriales
*   **FreeCodeCamp:** "Python Algorithms for Beginners" (YouTube).
*   **LeetCode:** Empezar con problemas "Easy" de Array/Strings.
