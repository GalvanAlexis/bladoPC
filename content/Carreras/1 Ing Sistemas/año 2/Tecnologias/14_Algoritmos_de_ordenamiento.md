# Conceptos: Algoritmos de Ordenamiento

## Introducción
Los algoritmos de ordenamiento organizan los elementos de una colección en un orden específico (ascendente o descendente).

---

## 1. Clasificación de Algoritmos

### 1.1 Por Complejidad
- **O(n²)**: Bubble Sort, Insertion Sort, Selection Sort
- **O(n log n)**: Merge Sort, Quick Sort, Heap Sort
- **O(n)**: Counting Sort, Radix Sort (algoritmos no comparativos)

### 1.2 Por Lugar de Ordenamiento
- **In-place**: Ordenan en la misma estructura (p. ej. Quick Sort)
- **Out-of-place**: Requieren estructura adicional (p. ej. Merge Sort)

### 1.3 Por Estabilidad
- **Estable**: Mantiene el orden relativo de elementos iguales
- **Inestable**: No garantiza el orden relativo

---

## 2. Bubble Sort (Intercambio)

### 2.1 Algoritmo
Compara elementos adyacentes e intercambia si están en orden incorrecto.

```java
void bubbleSort(int[] arr) {
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
```

### 2.2 Complejidad
- **Tiempo**: O(n²) en el peor y promedio
- **Espacio**: O(1) (in-place)
- **Estable**: Sí

---

## 3. Selection Sort (Selección)

### 3.1 Algoritmo
Encuentra el mínimo en la parte no ordenada y lo coloca al inicio.

```java
void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Intercambiar arr[i] y arr[minIdx]
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}
```

### 3.2 Complejidad
- **Tiempo**: O(n²) siempre
- **Espacio**: O(1) (in-place)
- **Estable**: No

---

## 4. Insertion Sort (Inserción)

### 4.1 Algoritmo
Construye el arreglo ordenado un elemento a la vez, insertando en la posición correcta.

```java
void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

### 4.2 Complejidad
- **Tiempo**: O(n²) peor/promedio, O(n) mejor (ya ordenado)
- **Espacio**: O(1) (in-place)
- **Estable**: Sí

---

## 5. Merge Sort (Mezcla)

### 5.1 Algoritmo
Divide el arreglo en mitades, ordena cada mitad recursivamente y luego mezcla.

```java
void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
```

### 5.2 Complejidad
- **Tiempo**: O(n log n) siempre
- **Espacio**: O(n) (requiere arreglo auxiliar)
- **Estable**: Sí

---

## 6. Quick Sort (Rápido)

### 6.1 Algoritmo
Elige un pivote, particiona el arreglo en elementos menores y mayores, y recursivamente ordena.

```java
void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

### 6.2 Complejidad
- **Tiempo**: O(n log n) promedio, O(n²) peor (pivote malo)
- **Espacio**: O(log n) (recursión en promedio)
- **Estable**: No

---

## 7. Comparación de Algoritmos

| Algoritmo | Mejor | Promedio | Peor | Espacio | Estable |
|-----------|-------|----------|------|---------|---------|
| Bubble    | O(n)  | O(n²)    | O(n²)| O(1)    | Sí      |
| Selection | O(n²) | O(n²)    | O(n²)| O(1)    | No      |
| Insertion | O(n)  | O(n²)    | O(n²)| O(1)    | Sí      |
| Merge     | O(n log n) | O(n log n) | O(n log n) | O(n) | Sí |
| Quick     | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

---

## 8. ¿Cuándo usar cuál?
- **Arreglos pequeños**: Insertion Sort
- **Uso general**: Quick Sort (rápido en promedio)
- **Necesitas estabilidad**: Merge Sort
- **Memoria limitada**: Heap Sort (O(1) espacio, O(n log n) tiempo)

---

## 9. Recursos de Aprendizaje
- Visualización: visualgo.net/sorting
- Práctica: Implementar todos los algoritmos y medir tiempos
- Libro: "Introduction to Algorithms" (CLRS)
