# Proyecto: Simulador de Sistema Solar

## Descripcion General

Aplicacion de consola (y eventualmente grafica) que simula las orbitas planetarias usando calculo basico y fisica.
El objetivo es modelar el movimiento de los planetas alrededor del Sol aplicando las leyes de Newton y Kepler, permitiendo visualizar las trayectorias en el tiempo.

---

## Stack Tecnologico

| Componente | Tecnologia | Proposito |
|------------|-------------|-----------|
| **Lenguaje** | Python 3.x | Logica principal, calculos |
| **Matematicas** | `math` (estandar), `NumPy` | Funciones trigonometricas, algebra lineal |
| **Visualizacion** | `matplotlib` | Graficas 2D de orbitas |
| **Control de Versiones** | Git, GitHub | Seguimiento del progreso |
| **Editor** | VS Code | Desarrollo e implementacion |

---

## Arquitectura del Codigo (POO)

### Clase `CuerpoCeleste`
Representa un planeta o estrella con sus propiedades fisicas.

```python
import math

class CuerpoCeleste:
    """
    Representa un cuerpo en el espacio.
    """
    def __init__(self, nombre, masa, x, y, vx, vy):
        self.nombre = nombre
        self.masa = masa  # kg
        self.x = x      # posicion en eje x (metros)
        self.y = y      # posicion en eje y (metros)
        self.vx = vx     # velocidad x (m/s)
        self.vy = vy     # velocidad y (m/s)
        
    def actualizar_posicion(self, fx, fy, dt):
        """
        Actualiza posicion y velocidad basado en fuerzas aplicadas (Newton 2).
        fx, fy: Fuerzas netas en Newtons.
        dt: intervalo de tiempo (segundos).
        """
        # Aceleracion: a = F/m
        ax = fx / self.masa
        ay = fy / self.masa
        
        # Actualizar velocidad: v = v0 + a*dt
        self.vx += ax * dt
        self.vy += ay * dt
        
        # Actualizar posicion: x = x0 + v*dt
        self.x += self.vx * dt
        self.y += self.vy * dt
        
    def distancia_a(self, otro_cuerpo):
        """Calcula distancia euclidiana al otro cuerpo."""
        dx = self.x - otro_cuerpo.x
        dy = self.y - otro_cuerpo.y
        return math.sqrt(dx**2 + dy**2)
```

### Clase `SistemaSolar`
Gestiona la simulacion.

```python
class SistemaSolar:
    G = 6.67430e-11  # Constante gravitacional (m^3 kg^-1 s^-2)
    
    def __init__(self):
        self.cuerpos = []
        
    def añadir_cuerpo(self, cuerpo):
        self.cuerpos.append(cuerpo)
        
    def calcular_fuerzas(self):
        """Calcula la fuerza gravitacional entre todos los cuerpos (N^2)."""
        fuerzas = {cuerpo: [0,0] for cuerpo in self.cuerpos}
        
        for i, c1 in enumerate(self.cuerpos):
            for c2 in self.cuerpos[i+1:]:
                # Ley de Gravitacion Universal: F = G * (m1*m2)/r^2
                r = c1.distancia_a(c2)
                if r == 0: continue
                
                fuerza = self.G * c1.masa * c2.masa / (r**2)
                # Componentes x, y
                fx = fuerza * (c2.x - c1.x) / r
                fy = fuerza * (c2.y - c1.y) / r
                
                fuerzas[c1][0] += fx
                fuerzas[c1][1] += fy
                fuerzas[c2][0] -= fx  # Accion y reaccion
                fuerzas[c2][1] -= fy
                
        return fuerzas
    
    def simular(self, pasos, dt):
        """Ejecuta la simulacion paso a paso."""
        historial = {cuerpo.nombre: [] for cuerpo in self.cuerpos}
        
        for _ in range(pasos):
            fuerzas = self.calcular_fuerzas()
            for cuerpo in self.cuerpos:
                fx, fy = fuerzas[cuerpo]
                cuerpo.actualizar_posicion(fx, fy, dt)
                historial[cuerpo.nombre].append((cuerpo.x, cuerpo.y))
                
        return historial
```

---

## Aplicacion de Conceptos de Año 1

### 1. Aplicar Matematicas en Programacion
*   **Funciones Trigonometricas:** Uso de `math.sin`, `math.cos` para orbitas elipticas iniciales.
*   **Calculo:** Aproximacion de derivadas (velocidad = dx/dt) e integrales (posicion = ∫velocidad dt) usando el **Metodo de Euler** (integracion numerica basica).
*   **Algebra Lineal:** Operaciones vectoriales basicas (suma de vectores de fuerza).

### 2. Estructurar Codigo en Funciones y Clases
*   **Funciones:** `calcular_fuerzas()`, `actualizar_posicion()`.
*   **Clases:** `CuerpoCeleste` (POO), `SistemaSolar` (Gestion).

### 3. Uso de Bibliotecas Externas
*   **`math`:** Funciones matematicas puras.
*   **`matplotlib`:** Para graficar las orbitas.

```python
import matplotlib.pyplot as plt

def graficar_trayectorias(historial):
    plt.figure(figsize=(10, 10))
    for nombre, puntos in historial.items():
        if not puntos: continue
        xs = [p[0] for p in puntos]
        ys = [p[1] for p in puntos]
        plt.plot(xs, ys, label=nombre)
    
    plt.scatter([0], [0], color='yellow', s=200, label='Sol')  # El Sol en el centro
    plt.xlabel('Posicion X (m)')
    plt.ylabel('Posicion Y (m)')
    plt.title('Simulacion del Sistema Solar')
    plt.legend()
    plt.grid(True)
    plt.axis('equal')
    plt.show()
```

### 4. Control de Versiones con Git
El proyecto debe estar en GitHub.
```bash
# Iniciar
git init
git add .
git commit -m "Simulador inicial: Estructura POO y Ley de Gravity"

# Subir a GitHub
git remote add origin https://github.com/usuario/simulador-solar.git
git push -u origin main
```

---

## Ejemplo de Ejecucion (Main)

```python
# main.py
from sistema_solar import CuerpoCeleste, SistemaSolar
import matplotlib.pyplot as plt

# Configuracion (Datos aproximados, escala simplificada)
sol = CuerpoCeleste("Sol", 1.989e30, 0, 0, 0, 0)
tierra = CuerpoCeleste("Tierra", 5.972e24, 1.496e11, 0, 0, 2.978e4)  # 1 UA, velocidad orbital

sistema = SistemaSolar()
sistema.añadir_cuerpo(sol)
sistema.añadir_cuerpo(tierra)

# Simular 1 año terrestre (en segundos) con pasos de 1 hora
segundos_en_año = 365 * 24 * 3600
historial = sistema.simular(pasos=8760, dt=3600)  # 1 paso por hora

# Graficar
# (Funcion graficar_trayectorias definida arriba)
```

---

## Objetivos de Aprendizaje (Checklist)

- [ ] Aplicar **Calculo** (derivadas/integrales) mediante aproximacion numerica (Euler).
- [ ] Estructurar codigo usando **POO** (Clases `CuerpoCeleste` y `SistemaSolar`).
- [ ] Usar bibliotecas externas: `math` (fisica) y `matplotlib` (visualizacion).
- [ ] Implementar **Ley de Gravitacion Universal** (Newton).
- [ ] Manejar **Vectores** (posicion, velocidad, fuerza) como pares de valores.
- [ ] Control de versiones: `git init`, `commit`, `push` a **GitHub**.
- [ ] Crear `.gitignore` para excluir archivos `.pyc` o carpetas `__pycache__`.

---

## Posibles Extensiones (Bonus)

1.  **Incluir mas planetas:** Marte, Jupiter, Venus.
2.  **Visualizacion 3D:** Usar `matplotlib` con `Axes3D`.
3.  **Animacion:** Usar `matplotlib.animation` para ver el movimiento en tiempo real.
4.  **Calculo de Energia:** Calcular Energia Cinetica y Potencial para validar la simulacion (Conservacion de Energia).

---

## Recursos Recomendados

### Fisica
*   **"Fundamentos de Fisica"** - Halliday, Resnick, Walker (Volumen 1: Mecanica).
*   **NASA Solar System Dynamics:** https://ssd.jpl.nasa.gov/ (Datos reales de posiciones).

### Python
*   **Matplotlib Tutorial:** https://matplotlib.org/stable/tutorials/
*   **Real Python - OOP:** https://realpython.com/python3-object-oriented-programming/

### Simulacion
*   **"Computational Physics"** - Mark Newman (Libro gratis online, capitulos de ODEs).
