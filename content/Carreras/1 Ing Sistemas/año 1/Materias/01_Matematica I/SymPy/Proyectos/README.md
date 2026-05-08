# Mini Proyectos SymPy - Matemáticas I

Carpeta con 7 mini proyectos interactivos para practicar SymPy.

## Proyectos

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `01_limites.py` | Calculadora de Límites (básico, infinito, lateral) |
| 2 | `02_derivadas.py` | Calculadora de Derivadas (1ra, 2da, n-ésima) |
| 3 | `03_integrales.py` | Calculadora de Integrales (indefinidas, definidas) |
| 4 | `04_eigenvalores.py` | Eigenvalores, eigenvectores, diagonalización |
| 5 | `05_expresiones.py` | Simplificador (expand, factor, simplify) |
| 6 | `06_matrices.py` | Calculadora de Matrices (det, inv, rank, nullspace) |
| 7 | `07_graficador.py` | Graficador de funciones con matplotlib |

## Requisitos

```bash
pip install sympy numpy matplotlib
```

## Uso

Cada proyecto es independiente:

```bash
python 01_limites.py
python 02_derivadas.py
# etc...
```

O ejecutar todos desde Python:

```python
import sys
sys.path.append('Proyectos')
```

## Menú de cada proyecto

- Opción 1: Modo interactivo (ingresa tus funciones)
- Opción 2+: Demos predefinidos
- Opción 0: Salir

## Ejemplos rápidos

### Limites
```python
from sympy import *
x = symbols('x')
limit((x**2-1)/(x-1), x, 1)  # = 2
limit(sin(x)/x, x, 0)         # = 1
limit(1/x, x, oo)             # = 0
```

### Derivadas
```python
x = symbols('x')
diff(x**3 + 2*x**2, x)       # = 3*x**2 + 4*x
diff(sin(x), x)              # = cos(x)
```

### Integrales
```python
x = symbols('x')
integrate(x**2, x)           # = x**3/3
integrate(x**2, (x, 0, 2))   # = 8/3
```

---

*Actualizado: Mayo 2026*