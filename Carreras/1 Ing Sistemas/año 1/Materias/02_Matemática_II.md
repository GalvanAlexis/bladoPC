# Matemática II: Cálculo Diferencial e Integral

## Cálculo Diferencial

### Derivadas
**Definición:** La derivada mide la tasa de cambio instantánea de una función.

**Definición como límite:**
f'(x) = lim(h→0) [f(x+h) - f(x)] / h

**Interpretación geométrica:** Pendiente de la recta tangente a la curva en el punto x.

**Reglas básicas:**
- **Potencia:** d/dx(xⁿ) = nxⁿ⁻¹
- **Suma:** d/dx[f(x) + g(x)] = f'(x) + g'(x)
- **Producto:** d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)
- **Cociente:** d/dx[f(x)/g(x)] = [f'(x)g(x) - f(x)g'(x)] / [g(x)]²
- **Cadena:** d/dx[f(g(x))] = f'(g(x)) · g'(x)

**Derivadas parciales:** Para funciones de múltiples variables.
∂f/∂x = derivada tratando las otras variables como constantes.

**Aplicaciones:**
- **Máximos y mínimos:** f'(x) = 0 (puntos críticos)
- **Tasas de cambio:** Velocidad, aceleración
- **Optimización:** Problemas de máximos y mínimos en ingeniería

### Aplicación con NumPy y SymPy
```python
import numpy as np
import sympy as sp

# Definir variable
x = sp.symbols('x')

# Derivada de un polinomio: f(x) = x³ + 2x² - 5x + 1
f = x**3 + 2*x**2 - 5*x + 1
derivada = sp.diff(f, x)
print(derivada)  # Resultado: 3x² + 4x - 5

# Encontrar puntos críticos (máximos/mínimos)
puntos_criticos = sp.solve(derivada, x)
print(puntos_criticos)

# Derivada parcial
y = sp.symbols('y')
f_2d = x**2 + y**2
derivada_x = sp.diff(f_2d, x)  # 2x
derivada_y = sp.diff(f_2d, y)  # 2y
```

---

## Cálculo Integral

### Integrales
**Integral indefinida:** F(x) tal que F'(x) = f(x)
∫ f(x) dx = F(x) + C (C es constante de integración)

**Integral definida:** Área bajo la curva entre a y b.
∫[a,b] f(x) dx = F(b) - F(a) (Teorema Fundamental del Cálculo)

**Propiedades:**
- Linealidad: ∫[af(x) + bg(x)] dx = a∫f(x)dx + b∫g(x)dx
- Interpretación geométrica: Área con signo

**Técnicas básicas:**
1. **Sustitución:** u = g(x), du = g'(x)dx
2. **Integración por partes:** ∫u dv = uv - ∫v du
3. **Fracciones parciales:** Para funciones racionales

**Aplicaciones:**
- Área bajo curva
- Volumen de sólidos de revolución
- Trabajo en física
- Valor promedio de una función

### Aplicación con SciPy y SymPy
```python
import scipy.integrate as spi
import numpy as np
import sympy as sp

# Integral definida con SciPy: ∫[0,1] x² dx
resultado, error = spi.quad(lambda x: x**2, 0, 1)
print(f"Resultado: {resultado}, Error: {error}")  # 1/3 ≈ 0.333

# Integral indefinida con SymPy
x = sp.symbols('x')
integral_indef = sp.integrate(x**2, x)
print(integral_indef)  # x³/3

# Integral definida con SymPy
integral_def = sp.integrate(x**2, (x, 0, 1))
print(integral_def)  # 1/3
```

---

## Series y Sucesiones

### Conceptos
**Sucesión:** Lista ordenada de números {a₁, a₂, a₃, ...}

**Serie:** Suma de los términos de una sucesión: Σ aₙ

**Convergencia y divergencia:**
- Una sucesión converge si tiende a un límite finito
- Una serie converge si la suma parcial tiene límite

**Series geométricas:** Σ arⁿ = a / (1-r) si |r| < 1

**Series de Taylor:** Aproximación de funciones como series de potencias.
f(x) = Σ [f⁽ⁿ⁾(a) / n!] (x-a)ⁿ

**Aplicaciones en computación:**
- Algoritmos numéricos
- Aproximación de funciones
- Análisis de convergencia en métodos iterativos

### Ejemplo con Python
```python
import numpy as np

# Serie geométrica: 1 + 1/2 + 1/4 + 1/8 + ...
def serie_geometrica(a, r, n_terminos):
    suma = 0
    for i in range(n_terminos):
        suma += a * (r ** i)
    return suma

# Aproximación de 1/(1-1/2) = 2
print(serie_geometrica(1, 0.5, 10))  # Se acerca a 2

# Serie de Taylor para e^x (primeros 5 términos)
def taylor_exp(x, n_terminos):
    resultado = 0
    for n in range(n_terminos):
        resultado += (x ** n) / np.math.factorial(n)
    return resultado

print(taylor_exp(1, 10))  # Aproximación de e ≈ 2.718
```

---

## Recursos Recomendados

### Libros
- **"Cálculo"** - James Stewart (Capítulos 3-5: Derivadas, 7: Integrales)
- **"Calculus Made Easy"** - Silvanus P. Thompson
- **"Thomas' Calculus"** - Joel Hass, Christopher Heil

### Documentación Oficial
- **SciPy:** https://docs.scipy.org/doc/scipy/reference/integrate.html
- **SymPy:** https://docs.sympy.org/latest/tutorial/calculus.html
- **NumPy:** https://numpy.org/doc/stable/reference/

### Tutoriales
- 3Blue1Brown (YouTube): "Essence of Calculus"
- Khan Academy: Cálculo Diferencial e Integral
- MIT OpenCourseWare: 18.01 Single Variable Calculus
