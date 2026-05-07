# Algoritmos: Ordenamiento, Búsqueda, Complexidade (C++)

Nesta seção, focaremos em algoritmos fundamentais usando a sintaxe e as estruturas da **STL (Standard Template Library)** do C++.

---

## 1. Complexidade Computacional (Big O)

A tabela de complexidade é a mesma, independentemente da linguagem.

| Notação | Nome | Exemplo em C++ |
|---------|------|-----------------|
| **O(1)** | Constante | `vector[0]`, `unordered_map::find()` |
| **O(log n)** | Logarítmico | `std::sort` (introsort), Búsqueda Binária |
| **O(n)** | Linear | `for` loop, `std::find` |
| **O(n log n)** | Logilinear | `std::sort` (padrão) |
| **O(n²)** | Quadrático | Loops aninhados (`for` dentro de `for`) |

---

## 2. Algoritmos de Ordenamento (Sorting)

### Bubble Sort - **O(n²)** (Apenas educativo)
```cpp
#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]); // Função da STL
            }
        }
    }
}
```

### Selection Sort - **O(n²)**
```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}
```

### Merge Sort - **O(n log n)** (Eficiente)
Divide e conquista.
```cpp
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin()+l, arr.begin()+m+1);
    vector<int> R(arr.begin()+m+1, arr.begin()+r+1);
    // Lógica de intercalação (merge)...
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}
```

### Uso da STL (O padrão industrial)
**Jamais** escreva seus próprios algoritmos em produção. Use `std::sort`.
```cpp
#include <algorithm> // Necessário para sort

vector<int> nums = {5, 2, 9, 1};
sort(nums.begin(), nums.end()); // O(n log n) -> [1, 2, 5, 9]

// Ordenar decrescente
sort(nums.begin(), nums.end(), greater<int>());
```

---

## 3. Algoritmos de Búsqueda (Searching)

### Búsqueda Linear (Linear Search) - **O(n)**
```cpp
#include <algorithm>
vector<int> nums = {4, 2, 5, 1};

// Usando STL
auto it = find(nums.begin(), nums.end(), 5);
if (it != nums.end()) {
    cout << "Encontrado na posição: " << distance(nums.begin(), it);
}
```

### Búsqueda Binária (Binary Search) - **O(log n)**
**Requer:** Array ordenado.
```cpp
#include <algorithm>
#include <vector>

vector<int> nums = {1, 2, 4, 5, 9};

// Usando STL (Requer ordenado!)
bool found = binary_search(nums.begin(), nums.end(), 4); // true

// Para obter o índice:
auto it = lower_bound(nums.begin(), nums.end(), 4);
if (it != nums.end() && *it == 4) {
    cout << "Índice: " << (it - nums.begin()); // 2
}
```

---

## 4. Uso de `std::set` e `std::map` (Árvores Auto-balanceadas)

O C++ não tem um "Binary Search Tree" simples na STL, mas tem `set` e `map` que são implementados como **Red-Black Trees** (O(log n)).

### `std::set` (Conjunto ordenado)
```cpp
#include <set>
set<int> nums = {5, 2, 5, 1}; // {1, 2, 5} (sem duplicatas)

auto it = nums.find(2); // O(log n)
if (it != nums.end()) cout << "Encontrado!";
```

### `std::map` (Dicionário/Tabela Hash ordenada)
```cpp
#include <map>
map<string, int> idades;
idades["Ana"] = 25; // O(log n)

auto it = idades.find("Ana"); // O(log n)
if (it != idades.end()) cout << it->second; // 25
```

---

## 5. Uso de `std::unordered_set` e `std::unordered_map` (Hash Tables)

São mais rápidos **O(1)** em média, mas não mantêm a ordem.

```cpp
#include <unordered_map>

unordered_map<string, int> cache;
cache["user_1"] = 100;

if (cache.find("user_1") != cache.end()) {
    cout << "Cache hit!";
}
```

---

## Resumo Visual (C++ STL)

| Estrutura | Melhor para | Complexidade (Acesso) | Ordenado? |
|------------|-------------|-------------------------|-----------|
| `vector` | Acesso aleatório | O(1) | N/A |
| `list` | Inserção/Remoção | O(1) op, O(n) busca | N/A |
| `set` / `map` | Busca eficiente | O(log n) | **Sim** |
| `unordered_set` / `unordered_map` | Busca muito rápida | O(1) *médio* | Não |

---

## Recursos Recomendados

### Livros
*   **"The C++ Programming Language"** - Bjarne Stroustrup (Capítulos sobre STL).
*   **"Data Structures and Algorithms in C++"** - Adam Drozdek.

### Documentação
*   **cplusplus.com:** https://www.cplusplus.com/reference/algorithm/
*   **CPPReference:** https://en.cppreference.com/w/cpp/algorithm

### Tutoriais
*   **LearnCpp:** https://www.learncpp.com/cpp-tutorial/stl-containers/
*   **GeeksforGeeks - C++ Algorithms:** https://www.geeksforgeeks.org/cpp-algorithms/
