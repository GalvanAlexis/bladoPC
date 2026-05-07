# Algoritmos: Ordenamiento, Búsqueda, Complejidad (Java)

Un **algoritmo** es una secuencia de pasos para resolver un problema. La **complejidad (Big O)** mide qué tan eficiente es en tiempo y espacio.

---

## 1. Complejidad Computacional (Big O Notation)

| Notación | Nombre | Ejemplo | Descripción |
|-----------|--------|---------|-------------|
| **O(1)** | Constante | Acceso a array por índice | No importa el tamaño, siempre tarda lo mismo |
| **O(log n)** | Logarítmico | Búsqueda Binaria | El tiempo crece muy lento (divide el problema) |
| **O(n)** | Lineal | Recorrer un array | Tarda 2x si el tamaño es 2x |
| **O(n log n)** | Logilineal | Merge Sort, Quick Sort | Muy eficiente para ordenar |
| **O(n²)** | Cuadrático | Bucle anidado (for dentro de for) | Ineficiente para n grandes |

---

## 2. Algoritmos de Ordenamiento (Sorting)

### Burbuja (Bubble Sort) - **O(n²)** (Malo, solo educativo)
Compara pares adyacentes y los intercambia si están en orden incorrecto.
```java
public class BubbleSort {
    static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    // Intercambiar
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
}
```

### Selección (Selection Sort) - **O(n²)**
Busca el mínimo en la parte no ordenada y lo pone al inicio.  
```java
void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // Intercambiar arr[i] y arr[minIdx]
        int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
    }
}
```

### Inserción (Insertion Sort) - **O(n²)** (Bueno para listas casi ordenadas)
Toma un elemento y lo inserta en su lugar correcto en la parte ya ordenada.  
```java
void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i-1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}
```

### Merge Sort (Divide y Vencerá) - **O(n log n)** (Eficiente)
Divide el array a la mitad, ordena recursivamente y mezcla.  
```java
void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

void merge(int[] arr, int l, int m, int r) {
    // Implementación de mezcla (complicada, aquí simplificada)
    int n1 = m - l + 1, n2 = r - m;
    int[] L = new int[n1], R = new int[n2];
    // Copiar datos...
    // Mezclar...
}
```

---

## 3. Algoritmos de Búsqueda (Searching)

### Búsqueda Lineal (Linear Search) - **O(n)**
Recorre elemento por elemento.  
```java
int linearSearch(int[] arr, int x) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == x) return i;
    }
    return -1; // No encontrado
}
```

### Búsqueda Binaria (Binary Search) - **O(log n)** (Requiere array ordenado)
Divide el espacio de búsqueda a la mitad.  
```java
int binarySearch(int[] arr, int x) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
```

---

## 4. Uso de la Java Collections API (Para la vida real)

En la práctica profesional, NO escribes tus propios algoritmos de ordenamiento. Usas la librería estándar.

### `Arrays.sort()` (Para arreglos)
```java
import java.util.Arrays;

int[] nums = {5, 2, 8, 1};
Arrays.sort(nums); // O(n log n) usando TimSort (híbrido)
System.out.println(Arrays.toString(nums)); // [1, 2, 5, 8]
```

### `Collections.sort()` (Para Listas)
```java
import java.util.*;

List<String> nombres = new ArrayList<>();
nombres.add("Zara");
nombres.add("Ana");
Collections.sort(nombres); // Orden lexicográfico
System.out.println(nombres); // [Ana, Zara]
```

### Búsqueda en Java
```java
// Búsqueda lineal
int idx = Collections.binarySearch(nombres, "Ana"); // Devuelve índice

// Búsqueda Binaria requiere que esté ordenado!
if (idx >= 0) System.out.println("Encontrado en " + idx);
```

---

## 5. Resumen de Complejidad (Java Collections)

| Estructura | Acceso | Inserción | Eliminación | Búsqueda |
|------------|--------|-----------|------------|----------|
| `ArrayList` | O(1) | O(1)* | O(n) | O(n) |
| `LinkedList` | O(n) | O(1) | O(1) | O(n) |
| `HashSet` | N/A | O(1)* | O(1)* | O(1)* |
| `HashMap` | N/A | O(1)* | O(1)* | O(1)* |
| `TreeSet` | N/A | O(log n) | O(log n) | O(log n) |

*Amortizado / Promedio.

---

## Recursos Recomendados

### Libros
*   **"Algorithms"** - Robert Sedgewick (Libro estándar para Java).
*   **"Introduction to Algorithms" (CLRS)** - Cormen et al. (La "biblia" teórica).

### Visualización
*   **VisuAlgo:** https://visualgo.net/en (Mira los algoritmos en acción).
*   **Sorting.at:** https://sorting.at/ (Compara velocidades de ordenamiento).

### Tutoriales
*   **GeeksforGeeks Java:** https://www.geeksforgeeks.org/java/#algorithms
*   **Baeldung:** https://www.baeldung.com/java-arrays-sort (Artículos profundos).
