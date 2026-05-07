# POO Básico: Programación Orientada a Objetos

La **Programación Orientada a Objetos (POO)** es un paradigma que organiza el código en **clases** y **objetos**. Permite agrupar datos (atributos) y comportamientos (métodos) en una sola unidad.

---

## 1. Conceptos Fundamentales

### Clase (`class`)
Es el **molde** o plano (blueprint) para crear objetos. Define qué atributos y métodos tendrán los objetos creados a partir de ella.

### Objeto (`object` / Instancia)
Es la **instancia** concreta de una clase. Si `Coche` es la clase, `mi_coche = Coche()` es el objeto.

### Atributos
Variables que pertenecen a la clase o al objeto. Representan el **estado** (datos).

### Métodos
Funciones que pertenecen a la clase. Representan el **comportamiente** (acciones).

---

## 2. Definición de una Clase (`class`)

En Python, las clases se definen con `class`. Por convención, usan **CamelCase** (ej. `MiClase`).

### Sintaxis Básica
```python
class Estudiante:
    """Esta es una clase que representa a un estudiante."""
    
    # Método inicializador (Constructor)
    def __init__(self, nombre, edad):
        self.nombre = nombre  # Atributo de instancia
        self.edad = edad        # Atributo de instancia

    # Método de instancia
    def saludar(self):
        return f"Hola, soy {self.nombre} y tengo {self.edad} años."
```

### El Método `__init__` (Constructor)
Es el primer método que se ejecuta al crear un objeto.
*   **`self`:** Es una referencia al objeto actual. **Siempre** debe ser el primer parámetro de los métodos de instancia.

### Creación de Objetos (Instanciación)
```python
# Crear (instanciar) dos objetos de la clase Estudiante
est1 = Estudiante("Ana", 22)
est2 = Estudiante("Luis", 25)

# Acceder a atributos
print(est1.nombre)  # Ana
print(est2.edad)     # 25

# Llamar a métodos
print(est1.saludar())  # Hola, soy Ana y tengo 22 años.
```

---

## 3. Atributos de Clase vs Instancia

### Atributos de Instancia (`self.x`)
Cada objeto tiene su **propia copia**. Si cambias uno, los demás no se afectan.
```python
class Perro:
    def __init__(self, nombre):
        self.nombre = nombre

fido = Perro("Fido")
max = Perro("Max")

fido.nombre = "Fido II"
print(max.nombre)  # Sigue siendo "Max"
```

### Atributos de Clase (Static)
Pertenecen a la clase, no al objeto. Se definen **fuera** del `__init__`. Los comparten **todos** los objetos.
```python
class Configuracion:
    # Atributo de Clase (compartido)
    version = "1.0.0"
    
    def __init__(self, user):
        self.user = user

conf1 = Configuracion("Admin")
conf2 = Configuracion("Guest")

print(conf1.version)  # 1.0.0
Configuracion.version = "2.0.0"  # Cambias el valor para TODOS
print(conf2.version)  # 2.0.0
```

---

## 4. Métodos de Instancia, Clase y Estáticos

### Métodos de Instancia (`self`)
El tipo más común. Reciben `self` y pueden modificar el estado del objeto.

### Métodos de Clase (`@classmethod`)
Reciben la clase (`cls`) en lugar del objeto. Se usan para crear fábricas de objetos o modificar atributos de clase.
```python
class Usuario:
    contador = 0
    
    def __init__(self, nombre):
        self.nombre = nombre
        Usuario.contador += 1
        
    @classmethod
    def crear_anonimo(cls):
        return cls("Anonimo")  # Equivale a Usuario("Anonimo")

user1 = Usuario("Juan")
user2 = Usuario.crear_anonimo()  # Uso del método de clase
print(Usuario.contador)  # 2
```

### Métodos Estáticos (`@staticmethod`)
No reciben ni `self` ni `cls`. Son funciones lógicamente relacionadas con la clase pero no acceden a sus datos.
```python
class Matematicas:
    @staticmethod
    def sumar(a, b):
        return a + b

# No necesitas crear un objeto para usarlo
print(Matematicas.sumar(5, 3))  # 8
```

---

## 5. Encapsulamiento y Propiedades (Getters/Setters)

Python no tiene "private" o "public" estricto, pero usa **convenciones**.

### Guion Bajo Simple (`_`)
Indica que es un atributo "privado" por convención (no se debe acceder desde fuera, aunque Python lo permite).
```python
class Cuenta:
    def __init__(self):
        self._saldo = 100  # "Privado" por convención
```

### Doble Guion Bajo (`__`)
Name Mangling. Python renombra el atributo para evitar colisiones en herencia. Se vuelve `_Clase__atributo`.
```python
class Base:
    def __init__(self):
        self.__secreto = 123  # Se renombra a _Base__secreto
```

### Decorador `@property` (Getters y Setters elegantes)
Permite definir métodos que se comportan como atributos, validando datos al asignar.
```python
class Producto:
    def __init__(self, precio):
        self._precio = precio
        
    @property
    def precio(self):
        return self._precio
    
    @precio.setter
    def precio(self, nuevo_precio):
        if nuevo_precio > 0:
            self._precio = nuevo_precio
        else:
            raise ValueError("El precio debe ser positivo")

prod = Producto(50)
print(prod.precio)   # Llama al getter (50)
prod.precio = 80       # Llama al setter
# prod.precio = -10    # ValueError!
```

---

## 6. Herencia (Inheritance)

Mecanismo donde una clase (hija/derivada) puede **reutilizar** y **extender** atributos y métodos de otra clase (padre/base).

### Sintaxis
```python
# Clase Padre
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def hablar(self):
        raise NotImplementedError("Debes implementar este método")

# Clase Hija
class Perro(Animal):  # Indicamos la herencia entre paréntesis
    def hablar(self):  # Sobreescritura (Override)
        return f"{self.nombre} dice: Guau!"

class Gato(Animal):
    def hablar(self):
        return f"{self.nombre} dice: Miau!"

# Uso Polimórfico
animales = [Perro("Fido"), Gato("Whiskers")]
for animal in animales:
    print(animal.hablar())

# Salida:
# Fido dice: Guau!
# Whiskers dice: Miau!
```

### Función `super()`
Permite llamar métodos de la clase padre desde la hija.
```python
class Vehiculo:
    def __init__(self, marca):
        self.marca = marca

class Coche(Vehiculo):
    def __init__(self, marca, modelo):
        super().__init__(marca)  # Llama al init del padre
        self.modelo = modelo
```

---

## 7. Polimorfismo

Capacidad de un objeto de tomar muchas formas. En el ejemplo anterior, `animal.hablar()` hace cosas distintas según si es `Perro` o `Gato`.

---

## 8. Métodos Especiales (Dunder Methods)

Métodos con doble guion bajo al inicio y final. Permiten que tus objetos actúen como tipos integrados.

| Método | Descripción | Ejemplo de Uso |
|--------|-------------|---------------|
| `__init__` | Constructor | `obj = MiClase()` |
| `__str__` | Representación legible para humanos | `print(obj)` |
| `__repr__` | Representación para debug (técnica) | `repr(obj)` |
| `__len__` | Define el comportamiento de `len()` | `len(obj)` |
| `__add__` | Define el comportamiento de `+` | `obj1 + obj2` |

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        
    def __add__(self, otro):
        return Vector(self.x + otro.x, self.y + otro.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)  (Gracias a __add__)
```

---

## Resumen Visual de POO

```text
              ┌─────────────────┐
              │     class Animal   │  (Molde)
              └────────┬────────┘
                       │
          ┌────────▼────────┐
          │  Atributos:      │
          │  - nombre        │
          │  Métodos:       │
          │  - hablar()      │
          └─────────────────┘
                       │
         ┌────────────────┼────────────────┐
         ▼                         ▼
┌───────────────┐      ┌───────────────┐
│ class Perro     │      │ class Gato     │  (Hijas)
├───────────────┤      ├───────────────┤
│ hablar(): Guau!│      │ hablar(): Miau!│
└───────────────┘      └───────────────┘
         │                         │
         ▼                         ▼
┌───────────────┐      ┌───────────────┐
│ obj = Perro()  │      │ obj = Gato()   │  (Objetos)
└───────────────┘      └───────────────┘
```

---

## Recursos Recomendados

### Libros
*   **"Python Crash Course"** - Eric Matthes (Capítulos sobre Clases).
*   **"Fluent Python"** - Luciano Ramalho (Para entender POO avanzado en Python).

### Documentación
*   **Python Classes:** https://docs.python.org/3/tutorial/classes.html
*   **Real Python OOP:** https://realpython.com/python3-object-oriented-programming/

### Tutoriales
*   **Corey Schafer (YouTube):** "Object Oriented Programming" (Serie de videos).
*   **ArjanCodes (YouTube):** POO en Python explicado con diagramas.
