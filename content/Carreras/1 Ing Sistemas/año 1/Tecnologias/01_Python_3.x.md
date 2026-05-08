# Lenguajes: Python 3.x

## ¿Qué es Python 3.x?

Python 3 es la versión actual y mantenida del lenguaje de programación Python. Es un lenguaje de **alto nivel**, **interpretado** y de **propósito general**. Fue creado por Guido van Rossum y lanzado en 1991, pero la rama 3.x (comenzando con 3.0 en 2008) introdujo cambios fundamentales que no son compatibles con la versión 2.x (ya obsoleta).

### Características Fundamentales
1.  **Sintaxis Clara y Legible:** Usa indentación (espacios) para definir bloques de código, obligando a escribir código limpio.
2.  **Tipado Dinámico:** No necesitas declarar el tipo de una variable (ej. `edad = 25` funciona, no hace falta decir `int edad = 25` como en Java/C++).
3.  **Interpretado:** No necesita compilación previa. El código se ejecuta directamente línea por línea.
4.  **Multiparadigma:** Soporta programación orientada a objetos, imperativa y funcional.

---

## Instalación y Entorno

### Verificar versión
En la terminal (CLI):
```bash
python --version
# o
python3 --version
```
Debe mostrar `Python 3.x.x`.

### REPL (Read-Eval-Print Loop)
Es el modo interactivo de Python. Escribe `python` en tu terminal y presiona Enter. Verás `>>>`.
```python
>>> 2 + 2
4
>>> print("Hola Mundo")
Hola Mundo
>>> exit()  # Salir
```

---

## Sintaxis Básica y Estructura

### Comentarios
```python
# Esto es un comentario de una línea

"""
Esto es un comentario
multilínea (docstring)
"""
```

### La función `print()`
La forma más básica de ver resultados.
```python
print("Hola")  # Imprime texto
print(5 + 3)      # Imprime 8
print("El resultado es:", 5 + 3)  # Concatenación implícita
```

### Entrada de Usuario: `input()`
**Importante:** Siempre devuelve una cadena de texto (`str`), aunque escribas un número.
```python
nombre = input("¿Cómo te llamas? ")
edad_texto = input("¿Qué edad tienes? ")
edad_numero = int(edad_texto)  # Conversión necesaria
```

---

## Tipos de Datos Primitivos en Python 3

### 1. Enteros (`int`)
Números sin decimales. Tamaño ilimitado (maneja números enormes).
```python
entero_a = 10
entero_b = -5
grande = 10**100  # Googol
```

### 2. Punto Flotante (`float`)
Números con decimales.
```python
pi = 3.14159
temperatura = -2.5
```

### 3. Cadenas (`str`)
Texto entre comillas simples o dobles.
```python
saludo = 'Hola'
despedida = "Adiós"
multilinea = """Línea 1
Línea 2"""
```

**F-strings (Formateo moderno en Python 3.6+):**
```python
nombre = "Ana"
edad = 30
print(f"{nombre} tiene {edad} años.")  # Ana tiene 30 años.
```

### 4. Booleanos (`bool`)
Valores `True` o `False` (con mayúscula inicial).
```python
es_mayor = True
tiene_permiso = False
```

### 5. Ninguno (`NoneType`)
Representa la ausencia de valor.
```python
resultado = None
```

---

## Operadores en Python 3

### Aritméticos
| Operador | Significado | Ejemplo |
|-----------|-------------|---------|
| `+` | Suma | `10 + 5` → `15` |
| `-` | Resta | `10 - 5` → `5` |
| `*` | Multiplicación | `10 * 5` → `50` |
| `/` | División real (siempre float) | `10 / 4` → `2.5` |
| `//` | División entera | `10 // 4` → `2` |
| `%` | Módulo (resto) | `10 % 4` → `2` |
| `**` | Exponente | `2 ** 3` → `8` |

### Comparación y Lógicos
Ya vistos en la sección de lógica, pero recordando:
*   `==`, `!=`, `>`, `<`, `>=`, `<=`
*   `and`, `or`, `not`

---

## Estructuras de Datos Incorporadas (Built-ins)

Aunque las veremos más a fondo en "Algoritmos", Python 3 trae estas por defecto:

### Listas (`list`)
Mutables, ordenadas, permiten duplicados.
```python
frutas = ["manzana", "banana"]
frutas.append("pera")  # Mutación: añade al final
```

### Tuplas (`tuple`)
Inmutables, ordenadas.
```python
coordenadas = (10, 20)  # No se puede cambiar coordenadas[0] = 5
```

### Diccionarios (`dict`)
Pares clave-valor (Hash maps).
```python
estudiante = {"nombre": "Luis", "edad": 22}
print(estudiante["nombre"])  # Luis
```

### Conjuntos (`set`)
No permiten duplicados, no están ordenados.
```python
numeros = {1, 2, 2, 3}  # Resultado: {1, 2, 3}
```

---

## Control de Flujo (Recordatorio)

### Condicionales (`if-elif-else`)
```python
nota = 85
if nota >= 90:
    print("A")
elif nota >= 80:
    print("B")
else:
    print("C")
```

### Bucles
**`for` (Iteración):**
```python
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)
```

**`while` (Condición):**
```python
contador = 0
while contador < 3:
    print(contador)
    contador += 1
```

---

## Definición de Funciones (`def`)

Las funciones se definen con `def`. Pueden devolver un valor con `return`.
```python
def saludar(nombre_usuario):
    """Esta función saluda a alguien."""  # Docstring
    mensaje = f"¡Hola, {nombre_usuario}!"
    return mensaje

resultado = saludar("Carlos")
print(resultado)
```

---

## Diferencias Clave: Python 2 vs Python 3 (Contexto Histórico)
Aunque hoy usamos 3.x, es útil saber por qué cambiaron:
1.  **`print`:** En Python 2 era una sentencia (`print "Hola"`). En 3 es una función (`print("Hola")`).
2.  **División:** En Python 2, `5 / 2` daba `2` (entero). En 3, `5 / 2` da `2.5`.
3.  **Unicode:** En Python 3, todos los strings son Unicode (`str`) por defecto, facilitando el uso de acentos y emojis.

---

## Recursos Recomendados

### Documentación Oficial
*   **Python 3 Docs:** https://docs.python.org/3/
*   **Tutorial Oficial:** https://docs.python.org/3/tutorial/

### Libros
*   **"Automate the Boring Stuff with Python"** - Al Sweigart (Gratis online, muy práctico).
*   **"Python Crash Course"** - Eric Matthes.

### Entornos de Desarrollo (IDEs)
*   **VS Code:** Con la extensión de Python (la veremos en el siguiente archivo).
*   **PyCharm:** IDE específico y potente de JetBrains.
