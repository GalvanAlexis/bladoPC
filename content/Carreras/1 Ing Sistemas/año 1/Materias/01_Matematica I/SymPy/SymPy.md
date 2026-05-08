# SymPy - Python Symbolic Mathematics Library

## Que es SymPy?

SymPy es una biblioteca de Python para matematicas simbolicas. Esto significa que puede manipular expresiones matematicas de forma exacta (con simbolos) en lugar de numericamente (con aproximaciones decimales).

**Caracteristicas principales:**
- Algebra simbolica pura (sin dependencias externas)
- Capacidad para resolver ecuaciones, calcular limites, derivadas, integrales
- Manipulacion de matrices y vectores simbolicos
- Simplificacion de expresiones
- Calculo de valores y vectores propios
- Trabajo con numeros racionales exactos

---

## Instalacion

```bash
pip install sympy
```

Verificar instalacion:
```python
import sympy as sp
print(sp.__version__)
```

---

## Conceptos Basicos

### 1. Definir Simbolos

Antes de trabajar con expresiones simbolicas, debes definir las variables:

```python
import sympy as sp

# Definir un solo simbolo
x = sp.symbols('x')

# Definir multiples simbolos
x, y, z = sp.symbols('x y z')

# Definir simbolos con propiedades especiales
n = sp.symbols('n', integer=True)  # n es entero
t = sp.symbols('t', positive=True)  # t es positivo
```

### 2. Crear Expresiones Simbolicas

```python
import sympy as sp
x = sp.symbols('x')

# Expresion polinomica
expr1 = x**2 + 2*x + 1

# Expresion racional
expr2 = (x**2 - 1) / (x - 1)

# Funciones trigonometricas
expr3 = sp.sin(x)**2 + sp.cos(x)**2

print("Expr1:", expr1)
print("Expr2:", expr2)
print("Expr3:", expr3)
```

### 3. Simplificacion

```python
import sympy as sp
x = sp.symbols('x')

expr = (x**2 - 1) / (x - 1)
print("Original:", expr)

# Simplificar
simplified = sp.simplify(expr)
print("Simplificada:", simplified)  # Resultado: x + 1

# Simplificacion mas agresiva
expr_complex = sp.sin(x)**2 + sp.cos(x)**2
print("Trig original:", expr_complex)
print("Trig simplificada:", sp.simplify(expr_complex))  # Resultado: 1
```

---

## Aplicacion en Matemática I

### Algebra Lineal con SymPy

#### Vectores

```python
import sympy as sp

# Definir vectores como matrices columna
v1 = sp.Matrix([1, 2, 3])
v2 = sp.Matrix([4, 5, 6])

print("Vector v1:")
sp.pprint(v1)

# Operaciones basicas
print("\nSuma v1 + v2:")
sp.pprint(v1 + v2)

print("\nProducto escalar (dot):")
print(v1.dot(v2))

print("\nProducto vectorial (cross) - solo 3D:")
sp.pprint(v1.cross(v2))
```

#### Matrices

```python
import sympy as sp

# Crear matriz
A = sp.Matrix([[1, 2], [3, 4]])
print("Matriz A:")
sp.pprint(A)

# Operaciones basicas
print("\nDeterminante:", A.det())
print("\nTraza (trace):", A.trace())
print("\nMatriz traspuesta:")
sp.pprint(A.T)

# Matriz inversa
print("\nMatriz inversa A^-1:")
sp.pprint(A.inv())

# Verificar: A * A^-1 = I
print("\nVerificacion A * A^-1:")
sp.pprint(A * A.inv())
```

#### Sistemas de Ecuaciones Lineales

```python
import sympy as sp

# Metodo 1: Usando solve() para sistemas
x, y = sp.symbols('x y')

eq1 = sp.Eq(x + y, 5)
eq2 = sp.Eq(x - y, 1)

solucion = sp.solve([eq1, eq2], [x, y])
print("Solucion con solve():", solucion)

# Metodo 2: Usando matrices (Ax = b)
A = sp.Matrix([[1, 1], [1, -1]])
b = sp.Matrix([5, 1])

x_vector = A.inv() * b
print("\nSolucion con matrices:")
sp.pprint(x_vector)

# Metodo 3: Usando linsolve()
sol_linsolve = sp.linsolve([x + y - 5, x - y - 1], (x, y))
print("\nSolucion con linsolve():", sol_linsolve)
```

---

### Funciones con SymPy

#### Manipulacion de Funciones

```python
import sympy as sp
x = sp.symbols('x')

# Definir una funcion
f = x**2 + 2*x + 1
print("Funcion f(x):", f)

# Evaluar funcion en un punto
print("\nf(2):", f.subs(x, 2))

# Composicion de funciones
g = sp.sin(x)
composed = g.subs(x, f)  # g(f(x))
print("\ng(f(x)) = sin(x^2 + 2x + 1):")
sp.pprint(composed)
```

#### Tipos de Funciones

```python
import sympy as sp
x = sp.symbols('x')

# Funcion lineal
lineal = 2*x + 3
print("Lineal f(x) = 2x + 3")
print("f(5) =", lineal.subs(x, 5))

# Funcion cuadratica
cuadratica = x**2 - 4*x + 4
print("\nCuadratica f(x) = x^2 - 4x + 4")
print("Vertice en x =", sp.solve(sp.diff(cuadratica, x), x))

# Funcion exponencial
exponencial = sp.exp(x)
print("\nExponencial f(x) = e^x")
print("f(0) =", exponencial.subs(x, 0))

# Funcion logaritmica
logaritmica = sp.log(x)
print("\nLogaritmica f(x) = ln(x)")
print("f(1) =", logaritmica.subs(x, 1))
```

---

### Limites con SymPy

#### Definicion y Calculo

```python
import sympy as sp
x = sp.symbols('x')

# Limite basico
lim1 = sp.limit(sp.sin(x)/x, x, 0)
print("lim(x->0) sin(x)/x =", lim1)  # Resultado: 1

# Limite infinito
lim2 = sp.limit(1/x, x, sp.oo)
print("lim(x->oo) 1/x =", lim2)  # Resultado: 0

# Limite lateral
lim_der = sp.limit(1/x, x, 0, '+')
lim_izq = sp.limit(1/x, x, 0, '-')
print("\nlim(x->0+) 1/x =", lim_der)  # oo (infinito)
print("lim(x->0-) 1/x =", lim_izq)  # -oo
```

#### Continuidad

```python
import sympy as sp
x = sp.symbols('x')

# Verificar continuidad evaluando limite y funcion
f = sp.sin(x)/x

# En x = 0, f(0) no esta definida, pero el limite existe
limite_en_0 = sp.limit(f, x, 0)
print("lim(x->0) sin(x)/x =", limite_en_0)

# Definir funcion por partes (piecewise)
g = sp.Piecewise((sp.sin(x)/x, x != 0), (1, x == 0))
print("\nFuncion por partes g(x):")
sp.pprint(g)

# Evaluar en 0
print("\ng(0) =", g.subs(x, 0))
print("La funcion es continua en 0 porque lim = f(0) = 1")
```

---

## Ejemplos Avanzados

### Resolucion de Ecuaciones No Lineales

```python
import sympy as sp
x = sp.symbols('x')

# Ecuacion cuadratica
eq = sp.Eq(x**2 - 5*x + 6, 0)
solucion = sp.solve(eq, x)
print("Soluciones de x^2 - 5x + 6 = 0:", solucion)

# Ecuacion con raiz
eq2 = sp.Eq(sp.sqrt(x) + 2, 5)
solucion2 = sp.solve(eq2, x)
print("Solucion de sqrt(x) + 2 = 5:", solucion2)

# Ecuacion trigonometrica
eq3 = sp.Eq(sp.sin(x), 0.5)
# Obtener soluciones generales
solucion3 = sp.solve(eq3, x)
print("Soluciones de sin(x) = 0.5:", solucion3)
```

### Derivadas (Introduccion)

```python
import sympy as sp
x = sp.symbols('x')

# Derivada basica
f = x**3 + 2*x**2 + x + 1
df = sp.diff(f, x)
print("f(x) =", f)
print("f'(x) =", df)

# Segunda derivada
d2f = sp.diff(f, x, 2)
print("f''(x) =", d2f)

# Derivada de funciones trigonometricas
g = sp.sin(x**2)
dg = sp.diff(g, x)
print("\nDerivada de sin(x^2):")
sp.pprint(dg)
```

### Integrales (Introduccion)

```python
import sympy as sp
x = sp.symbols('x')

# Integral indefinida
f = x**2 + 2*x + 1
integral = sp.integrate(f, x)
print("Integral de x^2 + 2x + 1:")
sp.pprint(integral)

# Integral definida
integral_def = sp.integrate(f, (x, 0, 2))
print("\nIntegral definida de 0 a 2:", integral_def)

# Integral trigonometrica
integral_trig = sp.integrate(sp.sin(x), (x, 0, sp.pi))
print("Integral de sin(x) de 0 a pi:", integral_trig)
```

---

## Matrices: Operaciones Avanzadas

### Valores y Vectores Propios (Eigenvalues/Eigenvectors)

```python
import sympy as sp

A = sp.Matrix([[4, -2],
               [1,  1]])

print("Matriz A:")
sp.pprint(A)

# Calcular valores propios
eigenvals = A.eigenvals()
print("\nValores propios:", eigenvals)

# Calcular vectores propios
eigenvects = A.eigenvects()
print("\nVectores propios:")
for val, multiplicity, vectors in eigenvects:
    print(f"\nValor propio {val} (multiplicidad {multiplicity}):")
    for v in vectors:
        sp.pprint(v)
```

### Espacio Nulo (Null Space)

```python
import sympy as sp

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
```

### Descomposicion LU

```python
import sympy as sp

A = sp.Matrix([[1, 2, 3],
               [4, 5, 6],
               [7, 8, 9]])

print("Matriz A:")
sp.pprint(A)

# Descomposicion LU (L * U = A)
L, U, _ = A.LUdecomposition()
print("\nMatriz L (lower triangular):")
sp.pprint(L)
print("\nMatriz U (upper triangular):")
sp.pprint(U)

# Verificar: L * U = A
print("\nVerificacion L * U:")
sp.pprint(L * U)
```

---

## Simplificacion y Manipulacion

### Expandir y Factorizar

```python
import sympy as sp
x = sp.symbols('x')

# Expandir expresiones
expr = (x + 1)**3
expanded = sp.expand(expr)
print("(x + 1)^3 expandido:", expanded)

# Factorizar
factored = sp.factor(expanded)
print("\nFactorizado nuevamente:", factored)

# Factorizar ecuaciones
poly = x**2 - 5*x + 6
print("\nFactorizacion de x^2 - 5x + 6:", sp.factor(poly))
```

### Sustitucion (Subs)

```python
import sympy as sp
x, y = sp.symbols('x y')

expr = x**2 + y**2

# Sustituir valores
print("Original:", expr)
print("Sustituyendo x=3, y=4:", expr.subs({x: 3, y: 4}))

# Sustituir una expresion por otra
expr2 = sp.sin(x)**2 + sp.cos(x)**2
print("\nOriginal:", expr2)
print("Simplificado:", sp.simplify(expr2))

# Cambio de variable
f = x**2 + 2*x + 1
g = f.subs(x, x - 1)  # Cambiar x por (x-1)
print("\nOriginal f(x):", f)
print("f(x-1):", g)
```

---

## Impresion Bonita (Pretty Print)

SymPy puede mostrar salidas matematicas formateadas:

```python
import sympy as sp
sp.init_printing(use_unicode=True)  # Habilitar pretty print

x = sp.symbols('x')
expr = sp.integrate(sp.sin(x**2), x)
print("Integral de sin(x^2):")
sp.pprint(expr)

# Tambien se puede usar latex
print("\nEn LaTeX:", sp.latex(expr))
```

---

## Resumen de Comandos Utiles

| Operacion | Comando |
|-----------|---------|
| Definir simbolo | `x = sp.symbols('x')` |
| Simplificar | `sp.simplify(expr)` |
| Expandir | `sp.expand(expr)` |
| Factorizar | `sp.factor(expr)` |
| Resolver ecuacion | `sp.solve(eq, x)` |
| Limite | `sp.limit(f, x, a)` |
| Derivada | `sp.diff(f, x)` |
| Integral | `sp.integrate(f, x)` |
| Crear matriz | `sp.Matrix([[a, b], [c, d]])` |
| Determinar | `M.det()` |
| Inversa | `M.inv()` |
| Valores propios | `M.eigenvals()` |
| Vectores propios | `M.eigenvects()` |
| Espacio nulo | `M.nullspace()` |
| Sistema lineal | `sp.linsolve(eqs, vars)` |
| Sustituir | `expr.subs(x, valor)` |
| Pretty print | `sp.pprint(expr)` |
| LaTeX | `sp.latex(expr)` |

---

## Recursos Adicionales

- **Documentacion oficial:** https://docs.sympy.org/
- **Tutoriales:**
  - https://docs.sympy.org/latest/tutorials/index.html
  - https://github.com/sympy/sympy/wiki/Quick-examples
- **Libro gratuito:** "SymPy: Symbolic Computing with Python" (disponible en la documentacion oficial)

---

## Consejos Practicos

1. **Siempre define simbolos** antes de usar variables: `x = sp.symbols('x')`
2. **Usa `sp.simplify()`** cuando obtengas resultados complejos
3. **Para matrices grandes**, considera usar `sp.nsimplify()` para obtener formas exactas
4. **El pretty print** (`sp.pprint()`) ayuda a visualizar mejor las expresiones
5. **Para sistemas de ecuaciones**, `sp.solve()` es mas versatil que metodos matriciales para ecuaciones no lineales
6. **SymPy trabaja con numeros racionales exactos**, no aproximaciones decimales (usa `sp.N()` si necesitas decimales)
