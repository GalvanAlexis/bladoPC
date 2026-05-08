# Introducción a la Programación: Lógica, Variables, Estructuras de Control

## Lógica de Programación

La lógica de programación es el conjunto de reglas y principios que permiten estructurar un algoritmo para que una computadora pueda ejecutarlo. Se basa en la lógica matemática y booleana.

### Valores Booleanos
En programación, la lógica se reduce a dos estados: **Verdadero (True)** y **Falso (False)**. Cualquier condición compleja se descompone en operaciones sobre estos valores.
*   **En Python:** `True` y `False` son de tipo `bool`.

### Operadores Relacionales (Comparación)
Se utilizan para comparar dos valores y producir un resultado booleano.

| Operador | Significado | Ejemplo (Python) | Resultado |
|-----------|-------------|-----------------|----------|
| `==` | Igual a | `5 == 5` | `True` |
| `!=` | Diferente de | `5 != 3` | `True` |
| `>` | Mayor que | `10 > 2` | `True` |
| `<` | Menor que | `1 < 0` | `False` |
| `>=` | Mayor o igual | `5 >= 5` | `True` |
| `<=` | Menor o igual | `3 <= 1` | `False` |

### Operadores Lógicos (Booleanos)
Permiten combinar expresiones condicionales.

1.  **AND (`and`):** Devuelve `True` si **ambas** condiciones son verdaderas.
    *   `True and True` → `True`
    *   `True and False` → `False`
2.  **OR (`or`):** Devuelve `True` si **al menos una** de las condiciones es verdadera.
    *   `True or False` → `True`
    *   `False or False` → `False`
3.  **NOT (`not`):** Invierte el valor de la condición.
    *   `not True` → `False`

**Tabla de Verdad (AND y OR):**
| A | B | A AND B | A OR B |
|---|---|---|---|
| True | True | True | True |
| True | False | False | True |
| False | True | False | True |
| False | False | False | False |

### Evaluación de Corto Circuito (Short-circuiting)
En Python, en una expresión `A and B`, si `A` es `False`, Python no evalúa `B` porque el resultado ya es `False`.
En `A or B`, si `A` es `True`, no evalúa `B`.

### Leyes de De Morgan (Para negar condiciones complejas)
*   `not (A and B)` es equivalente a `(not A) or (not B)`
*   `not (A or B)` es equivalente a `(not A) and (not B)`

---

## Variables

Una **variable** es un espacio en la memoria de la computadora que tiene un nombre (identificador) y almacena un valor que puede cambiar durante la ejecución del programa.

### Declaración y Asignación
En Python, no se declaran las variables con un tipo específico; se crean en el momento de la asignación.
*   **Sintaxis:** `identificador = valor`

```python
edad = 25          # Variable de tipo entero (int)
nombre = "Juan"    # Variable de tipo cadena (str)
es_activo = True   # Variable booleana (bool)
```

### Tipos de Datos Primitivos en Python
1.  **int:** Números enteros (..., -1, 0, 1, ...).
2.  **float:** Números de punto flotante (decimales, ej. 3.14).
3.  **str:** Cadenas de caracteres (texto), usan comillas simples o dobles.
4.  **bool:** Booleanos (`True` o `False`).
5.  **NoneType:** Representa la ausencia de valor (`None`).

### Convenciones de Nombres (PEP 8)
Para que el código sea legible:
*   Usar **snake_case** (minúsculas con guiones bajos) para variables y funciones: `contador_total`.
*   Usar **CamelCase** para clases: `MiClase`.
*   Los nombres deben ser descriptivos: `numero_estudiantes` es mejor que `n`.
*   No comenzar con números ni usar palabras reservadas (`if`, `for`, `class`).

### Alcanze (Scope) de Variables
*   **Variable Local:** Definida dentro de una función, solo existe ahí.
*   **Variable Global:** Definida en el cuerpo principal del script, accesible desde cualquier parte (evitar su uso excesivo).

### Inmutabilidad Básica
*   **Inmutables:** `int`, `float`, `str`, `bool`. Una vez creados, no cambian su valor interno (aunque la variable pueda apuntar a otro objeto).
*   **Mutables:** `list`, `dict`. Se pueden modificar sin cambiar la referencia de la variable.

---

## Estructuras de Control

Controlan el flujo de ejecución del programa (el orden en que se leen las líneas).

### 1. Secuencia (Sequence)
Es la estructura por defecto. Las instrucciones se ejecutan una tras otra, de arriba hacia abajo.

### 2. Selección (Selection / Condicionales)
Permiten ejecutar bloques de código **solo si** se cumple una condición.

#### Sentencia `if` (Si)
Ejecuta el bloque si la condición es `True`.
```python
edad = 20
if edad >= 18:
    print("Eres mayor de edad.")
```

#### Sentencia `if-else` (Si - Sino)
Ejecuta un bloque si es `True` y otro si es `False`.
```python
nota = 45
if nota >= 60:
    print("Aprobado")
else:
    print("Reprobado")
```

#### Sentencia `if-elif-else` (Múltiples condiciones)
Permite evaluar varias condiciones en orden.
```python
temperatura = 28

if temperatura > 30:
    print("Hace mucho calor")
elif temperatura > 20:  # Solo se evalúa si la anterior fue falsa
    print("El clima es agradable")
else:
    print("Hace frío")
```

**Indentación en Python:**
Python usa la **indentación** (espacios al inicio de la línea) para definir qué bloque de código pertenece a qué estructura. No se usan llaves `{}`.
*   Standard: 4 espacios por nivel.

### 3. Entrada y Salida de Datos (I/O)

#### Salida: `print()`
Muestra información en la consola.
```python
nombre = "Ana"
print("Hola,", nombre)  # Salida: Hola, Ana
print(f"Tienes {edad} años")  # f-strings (Formateo de cadenas)
```

#### Entrada: `input()`
Solicita datos al usuario a través del teclado. **Siempre devuelve una cadena (str)**.
```python
nombre_usuario = input("¿Cómo te llamas? ")
print(f"Bienvenido, {nombre_usuario}")
```

**Conversión de Tipos (Casting):**
Si necesitas un número del `input()`, debes convertirlo:
```python
edad_str = input("¿Cuántos años tienes? ")
edad_int = int(edad_str)  # Convierte string a entero
```

---

## Ejemplo Integrador: Verificación de Acceso
```python
# Simulación de lógica y variables

usuario_guardado = "admin"
clave_guardada = "1234"

usuario_ingresado = input("Usuario: ")
clave_ingresada = input("Clave: ")

# Estructura de control: AND lógico
if usuario_ingresado == usuario_guardado and clave_ingresada == clave_guardada:
    print("Acceso Concedido")
else:
    print("Acceso Denegado: Usuario o clave incorrectos.")
```

---

## Recursos Recomendados

### Libros
*   **"Python Crash Course"** - Eric Matthes (Ideal para empezar con la sintaxis).
*   **"Think Python"** - Allen B. Downey (Enfocado en pensamiento lógico).

### Documentación
*   **Oficial Python:** https://docs.python.org/3/tutorial/controlflow.html
*   **Real Python (Control Flow):** https://realpython.com/python-conditional-statements/

### Herramientas
*   **VS Code:** Instalar la extensión "Python" de Microsoft.
*   **Configuración:** Asegurarse de seleccionar el intérprete correcto (Ctrl+Shift+P → "Python: Select Interpreter").
