# Variables: Conceptos Avanzados y Gestión de Memoria

En programación, una **variable** es un nombre simbólico que se refiere a un valor almacenado en la memoria de la computadora. En Python, las variables actúan como **referencias** (punteros) a objetos, no como contenedores de datos en sí mismos.

---

## 1. Naming Rules (Reglas de Nombramiento)

Python tiene reglas estrictas y convenciones (PEP 8) para nombrar variables.

### Reglas Sintácticas (Obligatorias)
1.  **Caracteres válidos:** Letras (`a-z`, `A-Z`), números (`0-9`) y guion bajo (`_`).
2.  **No pueden empezar con números:** `1var` es inválido. `var1` es válido.
3.  **No pueden ser palabras reservadas (keywords):**
    ```python
    # Palabras prohibidas:
    # False, None, True, and, as, assert, async, await, break,
    # class, continue, def, del, elif, else, except, finally,
    # for, from, global, if, import, in, is, lambda, nonlocal,
    # not, or, pass, raise, return, try, while, with, yield
    ```

### Convenciones (PEP 8 - Estilo)
*   **snake_case:** Minúsculas con guiones bajos. `mi_variable`, `contador_total`.
*   **Evitar nombres de un solo carácter** (excepto en bucles cortos): `x`, `i`, `j` están bien en `for i in range(10)`, pero no para variables de negocio.
*   **Nombres descriptivos:** `tiempo_segundos` es mejor que `t`.

---

## 2. Asignación de Variables (Assignment)

### Asignación Simple
```python
x = 10  # Se crea un objeto entero 10 y x referencia a él
```

### Asignación Múltiple (Packing / Unpacking)
```python
# Asignar múltiples variables en una línea
a, b, c = 1, 2, 3
print(a, b, c)  # 1 2 3

# Intercambiar variables sin variable temporal
x, y = y, x
```

### Asignación Aumentada (Augmented Assignment)
Combina una operación aritmética con la asignación.
```python
contador = 10
contador += 5  # Equivale a: contador = contador + 5
contador *= 2  # contador = contador * 2
```

---

## 3. Referencias y Memoria (Cómo funciona "bajo el capó")

En Python, las variables son **nombres** que apuntan a objetos en memoria.

### Función `id()`
Devuelve la identidad del objeto (dirección de memoria).
```python
a = [1, 2, 3]
b = a          # b referencia al MISMO objeto que a

print(id(a) == id(b))  # True (misma dirección de memoria)

b.append(4)
print(a)  # [1, 2, 3, 4] (a se modificó porque b apuntaba a lo mismo)
```

### Función `is` vs `==`
*   `==` compara **valores**.
*   `is` compara **identidad** (si es el mismo objeto en memoria).
```python
lista_a = [1, 2, 3]
lista_b = [1, 2, 3]

print(lista_a == lista_b)  # True (mismo contenido)
print(lista_a is lista_b)  # False (objetos diferentes en memoria)

lista_c = lista_a
print(lista_a is lista_c)  # True (misma referencia)
```

---

## 4. Mutabilidad vs Inmutabilidad

Esta es una distinción **crucial** en Python que afecta cómo se comportan las variables.

### Tipos Inmutables (Immutable)
Una vez creado el objeto, **no puede cambiar su valor interno**. Modificar la variable crea un **nuevo objeto**.
*   Tipos: `int`, `float`, `str`, `bool`, `tuple`.

```python
x = 10
print(id(x))  # Dirección A

x = x + 1  # Se crea un nuevo entero 11
print(id(x))  # Dirección B (Diferente!)
```

### Tipos Mutables (Mutable)
Se pueden modificar **sin cambiar la dirección de memoria**.
*   Tipos: `list`, `dict`, `set`.

```python
mi_lista = [1, 2]
print(id(mi_lista))  # Dirección A

mi_lista.append(3)  # Modificación in-place
print(id(mi_lista))  # Dirección A (¡Igual!)
```

---

## 5. Alcanze de Variables (Scope)

El "Scope" define desde dónde se puede acceder a una variable.

### 1. Variable Local
Definida dentro de una función. No existe fuera de ella.
```python
def mi_funcion():
    local_var = "Hola"
    print(local_var)

mi_funcion()
# print(local_var)  # ¡Error! NameError: name 'local_var' is not defined
```

### 2. Variable Global
Definida en el cuerpo principal del script. Accesible desde cualquier parte, pero **no modificable** desde dentro de una función a menos que uses `global`.

```python
contador_global = 0

def incrementar():
    global contador_global  # Indicamos que usaremos la global
    contador_global += 1

incrementar()
print(contador_global)  # 1
```

### 3. `nonlocal` (Para funciones anidadas)
Si tienes una función dentro de otra, y quieres modificar la variable de la función "padre".
```python
def exterior():
    x = 10
    def interior():
        nonlocal x  # Modifica x de la función exterior
        x = 20
    interior()
    print(x)  # 20

exterior()
```

---

## 6. Constantes

Python no tiene una palabra clave `const`. Por convención, las variables que **no deben cambiar** se escriben en **MAYÚSCULAS**.

```python
PI = 3.14159
GRAVEDAD = 9.81
MAX_USUARIOS = 100

# Es una convención, Python no impedirá que las cambies, pero es una mala práctica hacerlo.
```

---

## 7. Type Hinting (Pistas de Tipo - Python 3.5+)

Aunque Python es de tipado dinámico, puedes (y debes) indicar qué tipo de dato espera la variable usando **Type Hints**. Esto ayuda a herramientas como *Mypy* o los linters de VS Code a detectar errores.

```python
nombre: str = "Juan"
edad: int = 25
es_activo: bool = True

# En funciones
def saludar(usuario: str) -> str:
    return f"Hola {usuario}"
```

---

## 8. Eliminación de Variables: `del`

La sentencia `del` elimina el nombre (la referencia), no necesariamente el objeto (el recolector de basura de Python -Garbage Collector- se encarga del objeto si no tiene más referencias).

```python
x = [1, 2, 3]
y = x

del x  # Borra la referencia 'x'
print(y)  # [1, 2, 3] (El objeto sigue vivo porque 'y' lo referencia)
```

---

## Resumen Visual de Memoria

```text
Variable (Nombre)  ---referencia---> Objeto en Memoria (Valor)
      x           ------------>   [ 10 ] (int, inmutable)
      mi_lista     ------------>   [ 1, 2, 3 ] (list, mutable)
```

---

## Recursos Recomendados

### Documentación
*   **Python Data Model:** https://docs.python.org/3/reference/datamodel.html (Sección 3.1: Objects, values and types).
*   **PEP 8:** https://pep8.org/ (Guía de estilo).

### Tutoriales
*   **Real Python - Variables:** https://realpython.com/python-variables/
*   **Corey Schafer (YouTube):** "Python Variables and Memory Management".
