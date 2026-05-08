# Funciones: Definición, Parámetros y Retorno

Una **función** es un bloque de código **reutilizable** que realiza una tarea específica. Ayuda a organizar el código, evitar repetición (DRY - Don't Repeat Yourself) y facilitar las pruebas.

---

## 1. Definición Básica (`def`)

Se definen con la palabra clave `def`, seguida del nombre, paréntesis `()` y dos puntos `:`.

### Sintaxis
```python
def nombre_de_la_funcion():
    # Cuerpo de la función (indentado, usualmente 4 espacios)
    print("Hola desde la función")
```

### Llamada (Call)
Para ejecutar la función, escribes su nombre con paréntesis.
```python
nombre_de_la_funcion()  # Salida: Hola desde la función
```

---

## 2. Parámetros y Argumentos

Los **parámetros** son variables que recibe la función al definirla. Los **argumentos** son los valores reales que envías al llamarla.

### Parámetros Posicionales (Obligatorios)
El orden importa.
```python
def saludar(nombre, edad):  # nombre y edad son parámetros
    print(f"Hola {nombre}, tienes {edad} años.")

saludar("Ana", 25)  # "Ana" y 25 son argumentos
saludar(25, "Ana")  # ¡Error lógico! Imprime "Hola 25, tienes Ana años."
```

### Parámetros con Valor por Defecto (Default)
Si no envías el argumento, usa el valor definido. **Deben ir después** de los obligatorios.
```python
def presentar(nombre, cargo="Estudiante"):  # cargo tiene valor por defecto
    print(f"{nombre} trabaja como {cargo}")

presentar("Luis")             # Luis trabaja como Estudiante
presentar("Marta", "Ingeniera")  # Marta trabaja como Ingeniera
```

### Argumentos por Palabra Clave (Keyword Arguments)
Puedes ignorar el orden si usas el nombre del parámetro.
```python
def calcular_area(base, altura):
    return base * altura / 2

# Orden normal
print(calcular_area(10, 5))

# Por palabra clave (orden no importa)
print(calcular_area(altura=5, base=10))
```

---

## 3. Retorno de Valores (`return`)

La sentencia `return` **finaliza** la función y devuelve un valor al que la llamó. Si no hay `return`, la función devuelve `None`.

### Ejemplo con `return`
```python
def sumar(a, b):
    resultado = a + b
    return resultado  # La función termina aquí

total = sumar(5, 3)
print(total)  # 8
```

### Diferencia: `print` vs `return`
*   `print()` muestra algo en consola, pero no devuelve el valor para guardarlo en una variable.
*   `return` devuelve el valor, pero no lo muestra (a menos que lo imprimas fuera).

```python
def funcion_print():
    print("Dentro de la función")

def funcion_return():
    return "Valor devuelto"

res1 = funcion_print()
print(f"Resultado 1: {res1}")  # Resultado 1: None (porque print no devuelve nada)

res2 = funcion_return()
print(f"Resultado 2: {res2}")  # Resultado 2: Valor devuelto
```

### Devolver Múltiples Valores (Tuplas)
Aunque parezca que devuelves varios valores, Python los empaqueta en una **tupla**.
```python
def operaciones_basicas(a, b):
    suma = a + b
    resta = a - b
    return suma, resta  # Devuelve una tupla: (suma, resta)

res = operaciones_basicas(10, 5)
print(res)        # (15, 5) -> Es una tupla
print(type(res)) # <class 'tuple'>

# Desempaquetado (Unpacking)
s, r = operaciones_basicas(10, 5)
print(s)  # 15
```

---

## 4. `None` y Funciones sin Retorno

Si una función termina sin `return`, o usas `return` solo, devuelve `None`.
```python
def procesar_datos():
    print("Procesando...")
    # No hay return explicito

resultado = procesar_datos()
print(resultado)  # None
```

---

## 5. Docstrings (Documentación)

Una cadena de texto (comillas triples) justo después de la definición. Es accesible mediante `help()` o `.__doc__`.

```python
def calcular_precio(cantidad, precio_unitario):
    """
    Calcula el precio total de una compra.

    Args:
        cantidad (int): Número de unidades.
        precio_unitario (float): Costo por unidad.

    Returns:
        float: El precio total.
    """
    return cantidad * precio_unitario

print(help(calcular_precio))
# Imprime la descripción de arriba
```

---

## 6. Alcance de Variables (Scope) en Funciones

### Variable Local
Todo lo que definas dentro de la función se queda ahí.
```python
def mi_funcion():
    x = 10  # Local
    print(x)

mi_funcion()
# print(x)  # NameError: name 'x' is not defined
```

### Variable Global
Para modificar una variable global dentro de una función, **debes** usar la palabra `global`.
```python
contador = 0

def incrementar():
    global contador  # Indicamos que usaremos la global
    contador += 1

incrementar()
print(contador)  # 1
```

---

## 7. Paso de Argumentos (Pass by Assignment)

Python funciona por **asignación de objetos**. Básicamente es "Pass by Object Reference".
*   Si pasas un objeto **inmutable** (int, str), la función no puede cambiar el original.
*   Si pasas un objeto **mutable** (list, dict), la función SÍ puede modificar el contenido del original.

```python
def modificar(valor, lista):
    valor = 100        # No afecta la variable externa (inmutable)
    lista.append(99)  # SÍ afecta la lista externa (mutable)

num = 10
nums = [1, 2]
modificar(num, nums)

print(num)   # 10 (No cambió)
print(nums)   # [1, 2, 99] (Sí cambió)
```

---

## 8. `args` y `kwargs` (Argumentos Variables)

Útiles cuando no sabes cuántos argumentos recibirás.

### `*args` (Argumentos Posicionales Variables)
Recibe argumentos extras como una **tupla**.
```python
def sumar_todo(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sumar_todo(1, 2, 3, 4))  # 10
print(sumar_todo(5, 10))        # 15
```

### `**kwargs` (Keyword Arguments Variables)
Recibe argumentos con nombre como un **diccionario**.
```python
def imprimir_datos(**kwargs):
    for clave, valor in kwargs.items():
        print(f"{clave}: {valor}")

imprimir_datos(nombre="Ana", edad=30, ciudad="Madrid")
# Salida:
# nombre: Ana
# edad: 30
# ciudad: Madrid
```

---

## 9. Funciones Lambda (Anónimas)

Son funciones pequeñas de una sola expresión. No tienen `return` (lo tienen implícito).

```python
# Función normal
def doble(x):
    return x * 2

# Función Lambda equivalente
doble_lambda = lambda x: x * 2

print(doble(5))        # 10
print(doble_lambda(5))  # 10
```

**Uso común:** Como argumento de otras funciones (ej. `sorted`, `map`, `filter`).
```python
puntos = [(1, 20), (3, 10), (2, 15)]
# Ordenar por el segundo elemento de la tupla
puntos_ordenados = sorted(puntos, key=lambda x: x[1])
print(puntos_ordenados)  # [(3, 10), (2, 15), (1, 20)]
```

---

## Resumen Visual de Flujo

```text
[LLAMADA] sumar(5, 3)
    |
    v
[DEF] def sumar(a, b):  <-- a=5, b=3 entran al scope local
    |
    v
resultado = a + b
    |
    v
return resultado  ------+
    |                  |
    v                  v
[LLAMADA] <-- recibe "8"  <-- [FIN FUNCION]
```

---

## Recursos Recomendados

### Documentación Oficial
*   **Defining Functions:** https://docs.python.org/3/tutorial/controlflow.html#defining-functions
*   **More on Functions:** https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions

### Tutoriales
*   **Real Python - Python Functions:** https://realpython.com/defining-your-own-python-function/
*   **Corey Schafer (YouTube):** "Python Functions" (Explicación visual de scope).

### Ejercicios Prácticos
1.  Escribe una función `es_par(numero)` que devuelva `True` si el número es par.
2.  Escribe una función `calcular_promedio(*args)` que calcule el promedio de n números.
3.  Escribe una función `crear_usuario(**kwargs)` que imprima un perfil de usuario usando claves dinámicas.
