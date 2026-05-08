# Ciclos: Bucles en Python (`while` y `for`)

Los **ciclos** (o bucles) permiten ejecutar un bloque de código **repetidamente** hasta que se cumpla una condición o se terminen los elementos a iterar.

---

## 1. Bucle `while` (Mientras)

Ejecuta el bloque de código **mientras** la condición sea `True`. Es un bucle "controlado por condición".

### Sintaxis
```python
while condicion:
    # Código a repetir (indentado 4 espacios)
```

### Ejemplo Básico
```python
contador = 0
while contador < 5:
    print(f"Iteración: {contador}")
    contador += 1  # ¡Esencial! Si olvidas esto, bucle infinito.
```
**Salida:**
```
Iteración: 0
Iteración: 1
Iteración: 2
Iteración: 3
Iteración: 4
```

### ¡Peligro! Bucle Infinito
Ocurre si la condición nunca se vuelve `False`.
```python
# ¡NUNCA LO HAGAS!
# while True:
#     print("Nunca pararé")
```

### `break` (Romper)
Sale **inmediatamente** del bucle, sin importar si la condición es `True` o si quedan elementos.
```python
num = 0
while num < 10:
    if num == 5:
        print("¡Llegué a 5, me detengo!")
        break  # Sale del while, no revisa el 6, 7, 8, 9
    print(num)
    num += 1
```

### `continue` (Continuar)
Salta el resto del código en **esta iteración** y vuelve al inicio del bucle para la siguiente (si aplica).
```python
num = 0
while num < 5:
    num += 1
    if num == 3:
        continue  # Salta el print de abajo, pasa a la siguiente iteración (num=4)
    print(num)  # No imprime el 3
```

---

## 2. Bucle `for` (Para)

Itera sobre una **secuencia** (lista, string, rango) desde el inicio hasta el final. Es más seguro y el más usado para recorrer colecciones.

### Iterar sobre una Lista
```python
frutas = ["manzana", "banana", "cereza"]
for fruta in frutas:
    print(fruta)
```

### Iterar sobre un String
```python
for letra in "Hola":
    print(letra)
# Salida: H, o, l, a
```

### Función `range()` (Rangos)
Genera una secuencia de números.
*   `range(n)`: 0, 1, 2, ..., n-1.
*   `range(inicio, fin)`: inicio, inicio+1, ..., fin-1.
*   `range(inicio, fin, paso)`: Salta de `paso` en `paso`.

```python
# Imprimir del 0 al 4
for i in range(5):
    print(i)

# Imprimir del 2 al 6
for i in range(2, 7):
    print(i)

# Imprimir números pares del 0 al 10
for i in range(0, 11, 2):
    print(i)
```

### `enumerate()` (Enumerar)
Devuelve el índice y el valor al mismo tiempo. Muy útil para saber en qué posición vas.
```python
colores = ["rojo", "verde", "azul"]
for indice, color in enumerate(colores):
    print(f"Índice {indice}: {color}")
```

---

## 3. `break` y `continue` en `for`

Funcionan igual que en `while`.

```python
# Buscar un número y salir
numeros = [10, 20, 30, 40]
buscar = 30

for num in numeros:
    if num == buscar:
        print(f"¡Encontrado {buscar}!")
        break  # Sale del for
    print(f"Revisando {num}...")
```

---

## 4. `else` en Bucles (Poco conocido)

Puedes poner un `else` después de un `while` o `for`.
*   Se ejecuta **solo si** el bucle **terminó naturalmente** (no se usó `break`).

```python
# Ejemplo: Verificar si un número es primo
numero = 17
divisor = 2

while divisor < numero:
    if numero % divisor == 0:
        print(f"{numero} no es primo, divisible por {divisor}")
        break
    divisor += 1
else:
    # Esto se ejecuta porque el while terminó sin break
    print(f"{numero} es primo")
```

---

## 5. Bucles Anidados (Nested Loops)

Un bucle dentro de otro. El interno se ejecuta completo por cada iteración del externo.
**Complejidad:** O(n*m) o O(n²) si ambos son del mismo tamaño.

```python
# Tabla de multiplicar del 1 al 3
for i in range(1, 4):  # Externo: 1, 2, 3
    for j in range(1, 4):  # Interno: 1, 2, 3 (por cada i)
        print(f"{i} x {j} = {i*j}")
    print("---")
```

---

## 6. Compresión de Listas (List Comprehensions)

Forma elegante y rápida (aunque no es un bucle tradicional, genera lo mismo).

```python
# Forma tradicional con for
cuadrados = []
for x in range(5):
    cuadrados.append(x**2)

# Con comprensión de listas (equivalente)
cuadrados = [x**2 for x in range(5)]
print(cuadrados)  # [0, 1, 4, 9, 16]
```

**Con condicional:**
```python
# Solo pares
pares = [x for x in range(10) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]
```

---

## 7. `pass` (Instrucción Nula)

No hace nada. Se usa como marcador de posición cuando la sintaxis exige una instrucción pero no quieres hacer nada aún.

```python
for i in range(5):
    if i == 3:
        pass  # Placeholder, no hace nada, pero evita error de sintaxis
    else:
        print(i)
```

---

## Resumen Comparativo

| Característica | `while` | `for` |
|-----------|---------|-------|
| **Control** | Por condición (Booleano) | Por secuencia (Iterable) |
| **Riesgo** | Bucle infinito si olvidas actualizar | Muy seguro (termina solo) |
| **Uso ideal** | Cuando no sabes cuántas iteraciones | Recorrer listas, strings, rangos |
| **`else`** | Sí soporta | Sí soporta |

---

## Recursos Recomendados

### Documentación Oficial
*   **Python Control Flow:** https://docs.python.org/3/tutorial/controlflow.html#more-control-flow-tools

### Tutoriales
*   **Real Python - For and While Loops:** https://realpython.com/python-for-loop/
*   **Corey Schafer (YouTube):** "Python Tutorial for Beginners - For Loops and Range".

### Ejercicios Prácticos
1.  Imprimir todos los números del 1 al 100 que sean divisibles por 3 y 5 a la vez.
2.  Pedir al usuario números hasta que ingrese un 0 (usar `while True` y `break`).
3.  Dibujar un triángulo de asteriscos con bucles anidados:
    ```
    *
    **
    ***
    ****
    ```
