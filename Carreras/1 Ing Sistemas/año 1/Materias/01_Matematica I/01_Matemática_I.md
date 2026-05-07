# Matemática I: Álgebra Lineal, Funciones, Límites

## Álgebra Lineal

### Vectores y Matrices
**Definición:** Un vector es una magnitud con dirección y sentido. Una matriz es una tabla rectangular de números.

**Operaciones básicas:**
- **Suma de vectores:** Se suman componente a componente
- **Producto escalar (punto):** a·b = |a||b|cos(θ)
- **Producto vectorial (cruz):** Solo en 3D, resulta un vector perpendicular

**Matrices:**
- **Tipos:** Cuadradas, identidad, diagonal, triangular
- **Determinante:** Valor escalar que indica si la matriz es invertible
- **Matriz inversa:** A × A⁻¹ = I (matriz identidad)
- **Sistemas de ecuaciones:** Ax = b, resuelto mediante eliminación Gaussiana o inversa

### Aplicación con SymPy (Python)
```python
import sympy as sp

# Definir variables
x, y = sp.symbols('x y')

# Resolver sistema de ecuaciones lineales
ecuaciones = [sp.Eq(x + y, 5), sp.Eq(x - y, 1)]
solucion = sp.solve(ecuaciones, [x, y])
print(solucion)  # {x: 3, y: 2}

# Operaciones con matrices
A = sp.Matrix([[1, 2], [3, 4]])
B = sp.Matrix([[5, 6], [7, 8]])
print(A * B)  # Multiplicación de matrices
print(A.det())  # Determinante
print(A.inv())  # Matriz inversa
```

---

## Funciones

### Conceptos Clave
**Definición:** Una función f: A → B asigna a cada elemento de A exactamente un elemento de B.

**Componentes:**
- **Dominio:** Conjunto de valores de entrada válidos
- **Rango:** Conjunto de valores de salida posibles
- **Imagen:** Valor específico f(x) para una entrada x

**Tipos de funciones:**
- **Lineales:** f(x) = mx + b (gráfica es una recta)
- **Cuadráticas:** f(x) = ax² + bx + c (parábola)
- **Polinómicas:** Suma de términos con potencias enteras
- **Exponenciales:** f(x) = aˣ
- **Logarítmicas:** Inversa de exponencial

**Operaciones:**
- **Composición:** (f ∘ g)(x) = f(g(x))
- **Función inversa:** f⁻¹(f(x)) = x

### Aplicación con Python (NumPy y Matplotlib)
```python
import numpy as np
import matplotlib.pyplot as plt

# Definir función lineal: f(x) = 2x + 3
def funcion_lineal(x):
    return 2 * x + 3

# Generar valores de x
x_vals = np.linspace(-10, 10, 100)

# Calcular y
y_vals = funcion_lineal(x_vals)

# Graficar
plt.plot(x_vals, y_vals)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Función Lineal: f(x) = 2x + 3')
plt.grid(True)
plt.show()
```

---

## Límites

### Definición y Propiedades
**Definición formal:** El límite de f(x) cuando x tiende a a es L si f(x) puede estar arbitrariamente cerca de L.

**Notación:** lim(x→a) f(x) = L

**Límites laterales:**
- **Por derecha:** lim(x→a⁺) f(x)
- **Por izquierda:** lim(x→a⁻) f(x)
- Si ambos son iguales, el límite existe

**Límites infinitos:**
- Cuando x → ∞ o -∞
- Comportamiento asintótico

**Continuidad:** f es continua en a si:
1. f(a) está definida
2. lim(x→a) f(x) existe
3. lim(x→a) f(x) = f(a)

### Cálculo con SymPy
```python
import sympy as sp

# Definir variable
x = sp.symbols('x')

# Límite fundamental: lim(x→0) sin(x)/x
limite1 = sp.limit(sp.sin(x)/x, x, 0)
print(limite1)  # Resultado: 1

# Límite infinito: lim(x→∞) 1/x
limite2 = sp.limit(1/x, x, sp.oo)
print(limite2)  # Resultado: 0

# Límite lateral
limite_der = sp.limit(1/x, x, 0, '+')
limite_izq = sp.limit(1/x, x, 0, '-')
print(limite_der, limite_izq)  # ∞, -∞
```

---

## Recursos Recomendados

### Libros
- **"Álgebra Lineal y sus Aplicaciones"** - Gilbert Strang
- **"Cálculo"** - James Stewart (Capítulos 1-2: Funciones y Límites)
- **"Linear Algebra Done Right"** - Sheldon Axler

### Documentación Oficial
- **SymPy:** https://docs.sympy.org/
- **NumPy:** https://numpy.org/doc/
- **Matplotlib:** https://matplotlib.org/stable/tutorials/

### Tutoriales
- Khan Academy: Álgebra Lineal y Cálculo
- 3Blue1Brown (YouTube): Serie "Essence of Linear Algebra"
- MIT OpenCourseWare: 18.06 Linear Algebra (Gilbert Strang)
