# Física I: Mecánica, Cinemática, Fuerzas

## Introducción a la Física Clásica

La física es la ciencia que estudia las propiedades de la materia y la energía, así como sus interacciones. La **mecánica clásica** (también llamada newtoniana) se ocupa del movimiento de los cuerpos bajo la acción de fuerzas, y es la base para entender sistemas del mundo real que luego modelaremos en software.

---

## Cinemática

La cinemática describe el movimiento de los objetos **sin considerar las causas** (fuerzas) que lo producen. Solo nos enfocamos en la geometría del movimiento.

### Conceptos Fundamentales

1.  **Posición (r):** Vector que define dónde está un objeto respecto a un origen.
2.  **Desplazamiento (Δr):** Cambio en la posición. Vectorial.
    *   Δr = r_final - r_inicial
3.  **Velocidad Media (v_m):** Tasa de cambio del desplazamiento respecto al tiempo.
    *   v_m = Δr / Δt
4.  **Velocidad Instantánea (v):** Límite de la velocidad media cuando Δt → 0. Es la derivada del vector posición respecto al tiempo.
    *   v = dr / dt
5.  **Aceleración Media (a_m):** Tasa de cambio de la velocidad.
    *   a_m = Δv / Δt
6.  **Aceleración Instantánea (a):** Derivada de la velocidad respecto al tiempo.
    *   a = dv / dt = d²r / dt²

### Movimiento Rectilíneo Uniforme (MRU)
Movimiento en línea recta con velocidad constante (aceleración = 0).
*   **Ecuación:** x(t) = x₀ + v·t
*   **Gráfica:** Una línea recta en el plano x vs t.

### Movimiento Rectilíneo Uniformemente Acelerado (MRUA)
Movimiento en línea recta con aceleración constante.
*   **Ecuaciones principales:**
    1.  v = v₀ + a·t
    2.  x = x₀ + v₀·t + (1/2)·a·t²
    3.  v² = v₀² + 2·a·Δx

### Movimiento de Proyectiles (2D)
Es la combinación de MRU en el eje horizontal (sin fricción, a_x = 0) y MRUA en el eje vertical (bajo la acción de la gravedad, a_y = -g).
*   **Alcance máximo (R):** R = (v₀² · sin(2θ)) / g
*   **Altura máxima (H):** H = (v₀² · sin²(θ)) / (2g)

### Simulación en Python
```python
import numpy as np
import matplotlib.pyplot as plt

# Parámetros iniciales
v0 = 50  # velocidad inicial (m/s)
angle = 45  # ángulo de lanzamiento (grados)
g = 9.81  # gravedad (m/s^2)

# Convertir ángulo a radianes
theta = np.radians(angle)

# Componentes de velocidad
vx = v0 * np.cos(theta)
vy = v0 * np.sin(theta)

# Tiempo de vuelo (hasta que y=0)
t_vuelo = 2 * vy / g
t = np.linspace(0, t_vuelo, num=100)

# Ecuaciones paramétricas
x = vx * t
y = vy * t - 0.5 * g * t**2

# Graficar
plt.figure(figsize=(10, 5))
plt.plot(x, y)
plt.title('Trayectoria de un Proyectil')
plt.xlabel('Distancia (m)')
plt.ylabel('Altura (m)')
plt.grid(True)
plt.show()
```

---

## Dinámica (Leyes de Newton)

La dinámica estudia las causas del movimiento: las **fuerzas**.

### Primera Ley de Newton (Ley de Inercia)
Un cuerpo permanece en reposo o en movimiento rectilíneo uniforme a menos que una fuerza neta actúe sobre él.
*   **Inercia:** Resistencia al cambio de movimiento.

### Segunda Ley de Newton (Ley de Fuerza)
La aceleración de un objeto es directamente proporcional a la fuerza neta que actúa sobre él e inversamente proporcional a su masa.
*   **Fórmula:** ΣF = m · a
*   Esta es la ecuación fundamental para simular física en videojuegos e ingeniería.

### Tercera Ley de Newton (Ley de Acción y Reacción)
Para cada fuerza de acción, existe una fuerza de reacción igual en magnitud y opuesta en dirección.

### Tipos de Fuerzas
1.  **Peso (W):** Fuerza hacia abajo debido a la gravedad. W = m · g
2.  **Normal (N):** Fuerza perpendicular que ejerce una superficie sobre un objeto.
3.  **Fricción (f):** Fuerza opuesta al movimiento. f = μ · N (donde μ es el coeficiente de fricción).
4.  **Tensión (T):** Fuerza transmitida a través de cuerdas o cables.

### Aplicación: Simulación de Caída Libre con Resistencia del Aire
En el mundo real, los objetos experimentan resistencia del aire (F_drag = -½·ρ·v²·C_d·A).
```python
import numpy as np

def simulate_fall(m, Cd, A, rho=1.225, g=9.81, dt=0.01, t_max=10):
    v = 0  # Velocidad inicial
    y = 1000  # Altura inicial (ej. paracaidista)
    t = 0
    
    velocities = [v]
    times = [t]
    positions = [y]
    
    while y > 0 and t < t_max:
        # Fuerza neta: Peso - Resistencia del aire
        F_gravity = m * g
        F_drag = 0.5 * rho * v**2 * Cd * A
        F_net = F_gravity - F_drag
        
        # Aceleración (Newton 2)
        a = F_net / m
        
        # Actualizar velocidad y posición (Integración de Euler simple)
        v = v + a * dt
        y = y - v * dt  # Restamos porque cae
        t = t + dt
        
        velocities.append(v)
        times.append(t)
        positions.append(y)
        
    return times, positions, velocities

# Simular paracaidista
t, y, v = simulate_fall(m=80, Cd=1.0, A=0.7)
print(f"Velocidad terminal aproximada: {v[-1]:.2f} m/s")
```

---

## Trabajo y Energía

### Trabajo (W)
El trabajo es la transferencia de energía cuando una fuerza actúa sobre un objeto desplazándolo.
*   W = F · d · cos(θ) (Producto punto)
*   Si la fuerza es variable: W = ∫ F dx

### Energía Cinética (K)
Energía asociada al movimiento.
*   K = (1/2) · m · v²

### Energía Potencial (U)
Energía almacenada debido a la posición o configuración.
*   **Gravitatoria:** U = m · g · h
*   **Elástica (Resorte):** U = (1/2) · k · x² (Ley de Hooke: F = -k·x)

### Teorema de Conservación de la Energía
En un sistema aislado, la energía total se mantiene constante.
*   E_total = K + U = constante

---

## Recursos Recomendados

### Libros
*   **"Física para Ciencias e Ingeniería"** - Paul A. Tipler, Gene Mosca (El estándar de oro).
*   **"University Physics with Modern Physics"** - Young and Freedman.

### Documentación y Herramientas
*   **Python:** NumPy (https://numpy.org/doc/), Matplotlib (https://matplotlib.org/).
*   **Simuladores:** PhET Interactive Simulations (https://phet.colorado.edu/).

### Tutoriales
*   **YouTube:** "Flipping Physics" (Mecánica clásica en videos cortos).
*   **Coursera:** "Introduction to Classical Mechanics" (Universidad de Texas).
