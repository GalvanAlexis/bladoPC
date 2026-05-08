# Algebra Lineal - Ejemplos y Ejercicios

## Fundamentos Basicos

### Vectores
Un vector es una magnitud con direccion y sentido. Se representa como una lista de componentes.

**Ejemplo 1: Definicion y operaciones basicas con vectores**
```python
import sympy as sp

# Definir vectores como matrices columna
v1 = sp.Matrix([1, 2, 3])
v2 = sp.Matrix([4, 5, 6])

print("Vector v1:", v1)
print("Vector v2:", v2)

# Suma de vectores (componente a componente)
suma = v1 + v2
print("Suma v1 + v2:", suma)

# Producto escalar (dot product)
producto_escalar = v1.dot(v2)
print("Producto escalar v1·v2:", producto_escalar)

# Magnitud (norma) de un vector
magnitud_v1 = sp.sqrt(v1.dot(v1))
print("Magnitud de v1:", magnitud_v1)
```

**Ejemplo 2: Producto vectorial (solo en 3D)**
```python
import sympy as sp

# Definir vectores en 3D
a = sp.Matrix([1, 0, 0])
b = sp.Matrix([0, 1, 0])

# Producto vectorial (cross product)
producto_vectorial = a.cross(b)
print("Producto vectorial a x b:", producto_vectorial)  # Debe dar [0, 0, 1]

# Verificar que es perpendicular (producto escalar debe ser 0)
print("a·(a x b):", a.dot(producto_vectorial))  # 0
print("b·(a x b):", b.dot(producto_vectorial))  # 0
```

---

## Matrices

### Tipos de Matrices

**Ejemplo 3: Crear diferentes tipos de matrices**
```python
import sympy as sp

# Matriz cuadrada
A = sp.Matrix([[1, 2], [3, 4]])
print("Matriz cuadrada A:")
sp.pprint(A)

# Matriz identidad (2x2)
I = sp.eye(2)
print("\nMatriz identidad I:")
sp.pprint(I)

# Matriz diagonal
D = sp.diag(1, 2, 3)
print("\nMatriz diagonal D:")
sp.pprint(D)

# Matriz triangular superior
U = sp.Matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6]])
print("\nMatriz triangular superior U:")
sp.pprint(U)
```

### Operaciones con Matrices

**Ejemplo 4: Multiplicacion y propiedades**
```python
import sympy as sp

A = sp.Matrix([[1, 2], [3, 4]])
B = sp.Matrix([[5, 6], [7, 8]])

# Multiplicacion de matrices
producto = A * B
print("A * B:")
sp.pprint(producto)

# Propiedad: (A * B)^-1 = B^-1 * A^-1
A_inv = A.inv()
B_inv = B.inv()
producto_inv = producto.inv()

print("\n(A * B)^-1:")
sp.pprint(producto_inv)
print("\nB^-1 * A^-1:")
sp.pprint(B_inv * A_inv)
print("\nSon iguales?", sp.simplify(producto_inv - B_inv * A_inv) == sp.zeros(2, 2))
```

**Ejemplo 5: Determinante y matriz inversa**
```python
import sympy as sp

M = sp.Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]])

print("Matriz M:")
sp.pprint(M)

# Calcular determinante
det_M = M.det()
print("\nDeterminante de M:", det_M)

# Calcular matriz inversa (solo si det != 0)
if det_M != 0:
    M_inv = M.inv()
    print("\nMatriz inversa M^-1:")
    sp.pprint(M_inv)
    
    # Verificar: M * M^-1 = I
    identidad = M * M_inv
    print("\nM * M^-1 (debe ser matriz identidad):")
    sp.pprint(identidad)
else:
    print("La matriz no es invertible (determinante = 0)")
```

---

## Sistemas de Ecuaciones Lineales

### Metodo 1: Usando inversa (Ax = b → x = A⁻¹b)

**Ejemplo 6: Resolver sistema 2x2**
```python
import sympy as sp

# Sistema:
# 2x + 3y = 8
# 4x - y = 2

# Matriz de coeficientes A
A = sp.Matrix([[2, 3], [4, -1]])

# Vector de terminos independientes b
b = sp.Matrix([8, 2])

# Resolver usando inversa: x = A^-1 * b
solution = A.inv() * b
print("Solucion usando inversa:")
print("x =", solution[0])
print("y =", solution[1])

# Verificar
print("\nVerificacion:")
print("2*x + 3*y =", 2*solution[0] + 3*solution[1])
print("4*x - y =", 4*solution[0] - solution[1])
```

### Metodo 2: Eliminacion Gaussiana (metodo directo)

**Ejemplo 7: Resolver sistema 3x3**
```python
import sympy as sp

# Sistema:
# x + y + z = 6
# 2x + y + 3z = 14
# x + 2y + z = 8

# Crear matriz aumentada [A|b]
augmented = sp.Matrix([[1, 1, 1, 6],
                       [2, 1, 3, 14],
                       [1, 2, 1, 8]])

print("Matriz aumentada inicial:")
sp.pprint(augmented)

# Aplicar eliminacion Gaussiana (forma escalonada)
rref_matrix, pivots = augmented.rref()
print("\nForma escalonada reducida:")
sp.pprint(rref_matrix)
print("Pivotes en columnas:", pivots)

# Extraer soluciones
x = rref_matrix[0, 3]
y = rref_matrix[1, 3]
z = rref_matrix[2, 3]
print(f"\nSolucion: x = {x}, y = {y}, z = {z}")
```

### Metodo 3: Usando solve() de SymPy

**Ejemplo 8: Sistema con solve()**
```python
import sympy as sp

# Definir variables
x, y, z = sp.symbols('x y z')

# Definir ecuaciones
eq1 = sp.Eq(x + y + z, 6)
eq2 = sp.Eq(2*x + y + 3*z, 14)
eq3 = sp.Eq(x + 2*y + z, 8)

# Resolver sistema
solucion = sp.solve([eq1, eq2, eq3], [x, y, z])
print("Solucion del sistema:")
print(solucion)
```

---

## Ejercicios Propuestos

### Ejercicio 1: Vector propio y valor propio
```python
import sympy as sp

# Matriz para encontrar valores y vectores propios
A = sp.Matrix([[4, -2],
               [1,  1]])

print("Matriz A:")
sp.pprint(A)

# Calcular valores propios (eigenvalues)
eigenvals = A.eigenvals()
print("\nValores propios:", eigenvals)

# Calcular vectores propios (eigenvectors)
eigenvects = A.eigenvects()
print("\nVectores propios:")
for val, multiplicity, vectors in eigenvects:
    print(f"Valor propio {val} (multiplicidad {multiplicity}):")
    for v in vectors:
        sp.pprint(v)
```

### Ejercicio 2: Espacio nulo (null space)
```python
import sympy as sp

# Matriz para encontrar espacio nulo
M = sp.Matrix([[1, 2, 3],
               [4, 5, 6],
               [7, 8, 9]])

print("Matriz M:")
sp.pprint(M)

# Encontrar espacio nulo (vectores x tales que M*x = 0)
nullspace = M.nullspace()
print("\nBase del espacio nulo (null space):")
for v in nullspace:
    sp.pprint(v)
    print()

# Verificar: M * v = 0 para cada vector del espacio nulo
print("Verificacion M * v = 0:")
for v in nullspace:
    result = M * v
    sp.pprint(result)
    print()
```

### Ejercicio 3: Rango y espacio columna
```python
import sympy as sp

A = sp.Matrix([[1, 2, 1],
               [2, 4, 3],
               [3, 6, 4]])

print("Matriz A:")
sp.pprint(A)

# Calcular rango (rank)
rango = A.rank()
print("\nRango de A:", rango)

# Espacio columna (column space) - columnas linealmente independientes
rref, pivots = A.rref()
print("\nColumnas con pivotes (base del espacio columna):", pivots)
print("Columnas base:")
for col in pivots:
    sp.pprint(A[:, col])
    print()
```

---

## Aplicaciones Practicas

### Aplicacion 1: Transformaciones lineales 2D
```python
import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Matriz de rotacion 2D (angulo de 45 grados)
theta = sp.pi / 4
R = sp.Matrix([[sp.cos(theta), -sp.sin(theta)],
               [sp.sin(theta),  sp.cos(theta)]])

print("Matriz de rotacion 45 grados:")
sp.pprint(R)

# Vector original
v = sp.Matrix([1, 0])
v_rotado = R * v

print("\nVector original:", v)
print("Vector rotado:", v_rotado.evalf())

# Graficar (convertir a numpy para matplotlib)
v_np = np.array([float(v[0]), float(v[1])])
v_rot_np = np.array([float(v_rotado[0]), float(v_rotado[1])])

plt.figure(figsize=(6, 6))
plt.quiver(0, 0, v_np[0], v_np[1], angles='xy', scale_units='xy', scale=1, color='blue', label='Original')
plt.quiver(0, 0, v_rot_np[0], v_rot_np[1], angles='xy', scale_units='xy', scale=1, color='red', label='Rotado')
plt.xlim(-1.5, 1.5)
plt.ylim(-1.5, 1.5)
plt.grid(True)
plt.legend()
plt.title('Rotacion de vector 45 grados')
plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.3)
plt.show()
```

### Aplicacion 2: Interpolacion polinomica
```python
import sympy as sp

# Puntos dados: (1, 2), (2, 3), (3, 5)
# Encontrar polinomio de grado 2 que pase por estos puntos

x = sp.symbols('x')
x_vals = [1, 2, 3]
y_vals = [2, 3, 5]

# Matriz de Vandermonde para interpolacion
A = sp.Matrix([[1, x_vals[0], x_vals[0]**2],
               [1, x_vals[1], x_vals[1]**2],
               [1, x_vals[2], x_vals[2]**2]])
b = sp.Matrix(y_vals)

# Resolver coeficientes: A * [c0, c1, c2]^T = b
coefs = A.inv() * b
print("Coeficientes del polinomio:")
print("c0 (independiente):", coefs[0])
print("c1 (lineal):", coefs[1])
print("c2 (cuadratico):", coefs[2])

# Polinomio resultante
polinomio = coefs[0] + coefs[1]*x + coefs[2]*x**2
print("\nPolinomio interpolante: f(x) =", polinomio)

# Verificar
for xi, yi in zip(x_vals, y_vals):
    print(f"f({xi}) = {polinomio.subs(x, xi)} (esperado: {yi})")
```

---

## Resumen de Comandos Utiles en SymPy

| Operacion | Comando SymPy |
|-----------|---------------|
| Crear matriz | `sp.Matrix([[a, b], [c, d]])` |
| Matriz identidad | `sp.eye(n)` |
| Matriz diagonal | `sp.diag(a, b, c)` |
| Determinar | `M.det()` |
| Inversa | `M.inv()` |
| Forma escalonada | `M.rref()` |
| Valores propios | `M.eigenvals()` |
| Vectores propios | `M.eigenvects()` |
| Espacio nulo | `M.nullspace()` |
| Rango | `M.rank()` |
| Resolver sistema | `sp.solve([eq1, eq2], [x, y])` |
