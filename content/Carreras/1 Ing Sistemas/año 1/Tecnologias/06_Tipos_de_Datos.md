# Tipos de Datos en Python 3

En Python, **todo es un objeto**. Cada objeto tiene un tipo (type) que define qué puede hacer y cómo se almacena en memoria.

---

## 1. Tipos de Datos Primitivos (Built-in Scalar Types)

Son los bloques más básicos. Son **inmutables** (no cambian una vez creados).

### Entero (`int`)
Representa números enteros de precisión arbitraria (no tiene límite de tamaño, a diferencia de C++ o Java).
```python
x = 10
y = -5
grande = 10 ** 100  # Googol (un 1 con 100 ceros)

print(type(x))  # <class 'int'>
```

### Punto Flotante (`float`)
Representa números reales (decimales) usando el estándar IEEE 754 de doble precisión (64 bits).
```python
pi = 3.14159
temperatura = -2.5
not_a_number = float('inf')  # Infinito

print(type(pi))  # <class 'float'>
```

**Precisión y Errores de Redondeo:**
```python
print(0.1 + 0.2)  # 0.30000000000000004 (No es un error, es aritmética binaria)
# Para comparaciones monetarias, usa Decimal de la librería decimal.
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))  # 0.3 exacto
```

### Cadena de Caracteres (`str`)
Secuencia inmutable de caracteres Unicode.
```python
nombre = "Juan"
multilinea = """Línea 1
Línea 2"""

# Indexación y Slicing (igual que listas, pero no se puede modificar un carácter)
print(nombre[0])    # 'J'
print(nombre[-1])   # 'n' (último)
# nombre[0] = 'P'  # ¡Error! 'str' object does not support item assignment
```

### Booleano (`bool`)
Subclase de `int`. `True` es `1` y `False` es `0` internamente.
```python
es_activo = True
print(isinstance(es_activo, int))  # True (bool hereda de int)
print(True + True)  # 2
```

### Ninguno (`NoneType`)
Representa la ausencia de valor. Es único (singleton).
```python
resultado = None
print(resultado is None)  # True
```

---

## 2. Colecciones (Collection Types)

### Lista (`list`)
**Mutable**, **ordenada**, permite duplicados.
```python
frutas = ["manzana", "banana"]
frutas.append("pera")  # Mutación en sitio
```

### Tupla (`tuple`)
**Inmutable**, **ordenada**, permite duplicados. Más rápida que la lista para iterar (por ser inmutable, Python la optimiza).
```python
coordenadas = (10.5, 20.3)
# coordenadas[0] = 5  # ¡Error! 'tuple' object does not support item assignment
```

### Diccionario (`dict`)
Colección de pares **clave-valor** (hash map). **Mutable**, **desordenada** (ordenada por orden de inserción desde Python 3.7+).
*   Las claves deben ser **hasheables** (inmutables: str, int, tuple).
```python
estudiante = {"nombre": "Ana", "edad": 22}
print(estudiante["nombre"])  # Ana
```

### Conjunto (`set`)
**Mutable**, **no ordenada**, **no permite duplicados**. Basado en tablas hash. Ideal para búsquedas rápidas y operaciones de conjuntos (unión, intersección).
```python
numeros = {1, 2, 2, 3}  # Resultado: {1, 2, 3}
print(2 in numeros)  # True (búsqueda O(1) promedio)
```

### Frozenset (`frozenset`)
Igual al `set` pero **inmutable**. Puede usarse como clave de diccionario.
```python
fs = frozenset([1, 2, 3])
diccio = {fs: "valores"}
```

---

## 3. Mutabilidad e Inmutabilidad (Crucial)

| Tipo | ¿Mutable? | ¿Hasheable? | ¿Puede ser clave de dict? |
|------|----------|-------------|--------------------------|
| `int`, `float`, `str`, `bool` | No | Sí | Sí |
| `tuple` (si sus elementos son hasheables) | No | Sí | Sí |
| `list`, `dict`, `set` | Sí | No | No |

**Ejemplo de por qué importa:**
```python
# Un set (conjunto) NO puede contener listas (porque la lista es mutable)
# mi_set = {[1, 2]}  # ¡Error! unhashable type: 'list'

# Pero SÍ puede contener tuplas
mi_set = {(1, 2)}  # Funciona
```

---

## 4. Comprobación de Tipos (Type Checking)

### Función `type()`
Devuelve el tipo exacto del objeto.
```python
print(type(10))        # <class 'int'>
print(type("Hola"))   # <class 'str'>
```

### Función `isinstance()` (Recomendada)
Verifica si un objeto es instancia de una clase o tupla de clases. Es mejor que `type()` porque soporta herencia.
```python
x = 10
print(isinstance(x, int))           # True
print(isinstance(x, (int, float)))  # True (¿Es int O float?)
```

---

## 5. Conversión de Tipos (Casting)

Convertir entre tipos usando funciones constructoras.
```python
# De string a entero
edad_str = "25"
edad_int = int(edad_str)

# De entero a string
precio = 100
precio_str = str(precio)

# De string a float
pi_str = "3.14"
pi_float = float(pi_str)

# De colecciones
lista = [1, 2, 3]
tupla = tuple(lista)  # (1, 2, 3)
nuevo_set = set(lista)  # {1, 2, 3}
```

---

## 6. Type Hinting (Pistas de Tipo)

Desde Python 3.5+, usamos la librería `typing` para indicar tipos (no obliga, pero ayuda a editores y linters como MyPy).
```python
from typing import List, Dict, Tuple, Optional

def procesar_datos(ids: List[int], config: Dict[str, str]) -> Tuple[bool, str]:
    return True, "OK"

# Optional[X] es equivalente a Union[X, None]
def buscar_usuario(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Admin"
    return None
```

---

## 7. Memoria y Referencias (Detalle Avanzado)

Cuando haces `a = 10`, Python crea un objeto `int` con valor 10 y hace que `a` apunte a él.

```python
a = 10
b = 10
# Pequeña optimización de Python (String Interning / Small Integer Caching):
print(a is b)  # True (Python reutiliza el mismo objeto para enteros pequeños)
```

Para objetos más grandes o mutables:
```python
lista_a = [1, 2]
lista_b = lista_a  # Ambas variables apuntan al MISMO objeto en memoria
lista_b.append(3)
print(lista_a)  # [1, 2, 3] (se modificó a través de b)
```

---

## Resumen Visual de Tipos en Python 3

```
                          ┌─────────────────────┐
                          │     object (Base)    │
                          └─────────┬─────────┘
                                    │
                ┌────────────────────┼────────────────────┐
                │                    │                    │
         ┌────▼────┐    ┌─────▼─────┐    ┌─────▼─────┐
         │   int       │    │   float   │    │    str    │  (Inmutables)
         └────────────┘    └───────────┘    └───────────┘
                │                    │                    │
                └────────────────────┼────────────────────┘
                                    │
                          ┌────────▼─────────┐
                          │    bool (subclase │
                          │    de int)       │
                          └──────────────────┘

         ┌────────────────────────────────────────────────────┐
         │          Colecciones (Collections)             │
         │ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
         │ │  list   │ │  dict   │ │   set   │     │ (Mutables)
         │ └─────────┘ └─────────┘ └─────────┘     │
         │ ┌─────────┐ ┌─────────┐                  │
         │ │  tuple  │ │ frozenset│                  │ (Inmutables)
         │ └─────────┘ └─────────┘                  │
         └────────────────────────────────────────────────────┘
```

---

## Recursos Recomendados

### Documentación Oficial
*   **Built-in Types:** https://docs.python.org/3/library/stdtypes.html
*   **typing module:** https://docs.python.org/3/library/typing.html

### Tutoriales
*   **Real Python - Basic Data Types:** https://realpython.com/python-data-types/
*   **Corey Schafer (YouTube):** "Python Variables and Data Types" - Excelente para entender mutabilidad.
