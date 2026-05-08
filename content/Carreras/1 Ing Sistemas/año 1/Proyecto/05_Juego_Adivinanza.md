# Proyecto: Juego de Adivinanza (Number Guessing Game)

## Descripcion
Juego interactivo de consola donde el jugador debe adivinar un numero aleatorio. Incluye sistema de pistas, puntuacion y estadisticas de juego.

---

## Stack Tecnologico
- **Lenguaje**: Python 3.x
- **Bibliotecas**: `random`
- **POO Basico**: Clases `Juego`, `Jugador`
- **Control de Versiones**: Git, GitHub
- **Editor**: VS Code

---

## Objetivos de Aprendizaje
- [ ] Aplicar **Introduccion a la Programacion**: Logica, variables, estructuras de control
- [ ] Estructurar código en **Funciones** y **POO basico** (clases)
- [ ] Uso de **Variables**, **Tipos de datos**, **Condicionales**, **Ciclos**
- [ ] Uso de **POO basico**: Clases, atributos, metodos
- [ ] Manejo de **Random** para generacion de numeros
- [ ] Control de versiones: `git init`, `commit`, `push` a GitHub

---

## Estructura Sugerida del Codigo#

### Clases `Jugador` y `Juego`
```python
import random

class Jugador:
    def __init__(self, nombre):
        self.nombre = nombre
        self.intentos_totales = 0
        self.partidas_ganadas = 0
        self.puntuacion_maxima = 0
    
    def actualizar_estadisticas(self, intentos, gano):
        """Actualiza estadisticas tras una partida."""
        self.intentos_totales += intentos
        if gano:
            self.partidas_ganadas += 1
            # Puntuacion: 100 - (intentos * 5), minimo 10
            puntos = max(100 - (intentos * 5), 10)
            if puntos > self.puntuacion_maxima:
                self.puntuacion_maxima = puntos
    
    def mostrar_estadisticas(self):
        """Muestra las estadisticas del jugador."""
        print(f"\n--- Estadisticas de {self.nombre} ---")
        print(f"Partidas ganadas: {self.partidas_ganadas}")
        print(f"Intentos totales: {self.intentos_totales}")
        print(f"Puntuacion maxima: {self.puntuacion_maxima}")

class Juego:
    def __init__(self, minimo=1, maximo=100):
        self.minimo = minimo
        self.maximo = maximo
        self.numero_secreto = 0
        self.intentos = 0
        self.jugador = None
    
    def configurar(self, jugador):
        """Configura el juego para un jugador."""
        self.jugador = jugador
        self.numero_secreto = random.randint(self.minimo, self.maximo)
        self.intentos = 0
        print(f"\nBienvenido {jugador.nombre}!")
        print(f"Adivina el numero entre {self.minimo} y {self.maximo}")
    
    def dar_pista(self, numero_ingresado):
        """Proporciona pistas basadas en el intento."""
        if numero_ingresado < self.numero_secreto:
            print("Pista: El numero es MAYOR")
        else:
            print("Pista: El numero es MENOR")
    
    def jugar(self):
        """Logica principal del juego."""
        if not self.jugador:
            print("Error: Configura primero el jugador.")
            return False
        
        while True:
            try:
                intento = int(input(f"Intento {self.intentos + 1}: Ingresa un numero: "))
                self.intentos += 1
                
                if intento == self.numero_secreto:
                    print(f"CORRECTO! Adivinaste en {self.intentos} intentos.")
                    self.jugador.actualizar_estadisticas(self.intentos, True)
                    return True
                else:
                    self.dar_pista(intento)
                    
                    # Pista adicional cada 3 intentos
                    if self.intentos % 3 == 0:
                        rango = self.maximo - self.minimo
                        print(f"Pista extra: El numero esta en el rango medio")
            
            except ValueError:
                print("Error: Ingresa un numero valido.")
    
    def reiniciar(self):
        """Reinicia el juego manteniendo al jugador."""
        self.numero_secreto = random.randint(self.minimo, self.maximo)
        self.intentos = 0
        print("\n--- Nueva partida iniciada ---")

# main.py
def main():
    print("=== JUEGO DE ADIVINANZA ===")
    
    # Crear jugador
    nombre = input("Ingresa tu nombre: ")
    jugador = Jugador(nombre)
    
    # Configurar juego
    juego = Juego(1, 50)  # Numeros del 1 al 50
    juego.configurar(jugador)
    
    while True:
        juego.jugar()
        
        opcion = input("\nJugar otra partida? (s/n): ").lower()
        if opcion != 's':
            break
        
        juego.reiniciar()
    
    # Mostrar estadisticas finales
    jugador.mostrar_estadisticas()
    print("\nGracias por jugar!")

if __name__ == "__main__":
    main()
```

---

## Ejemplo de Partida
```
=== JUEGO DE ADIVINANZA ===
Ingresa tu nombre: Blado

Bienvenido Blado!
Adivina el numero entre 1 y 50

Intento 1: Ingresa un numero: 25
Pista: El numero es MAYOR

Intento 2: Ingresa un numero: 37
Pista: El numero es MENOR

Intento 3: Ingresa un numero: 30
Pista: El numero es MAYOR
Pista extra: El numero esta en el rango medio

Intento 4: Ingresa un numero: 33
CORRECTO! Adivinaste en 4 intentos.

Jugar otra partida? (s/n): n

--- Estadisticas de Blado ---
Partidas ganadas: 1
Intentos totales: 4
Puntuacion maxima: 80
```

---

## Criterios de Aceptacion
1. **POO**: Clases `Jugador` y `Juego` con atributos y metodos claros
2. **Logica**: Generacion aleatoria, comparacion, pistas, puntuacion
3. **Interaccion**: Entrada de usuario, validacion de datos (try/except)
4. **Estadisticas**: Llevar conteo de partidas, intentos y puntuacion
5. **Git**: Repositorio en GitHub con mínimo 4 commits

---

## Recursos de Apoyo
- **Python Random**: https://docs.python.org/3/library/random.html
- **Python Input/Output**: https://docs.python.org/3/tutorial/inputoutput.html
- **POO Basics**: Revisar carpeta `Tecnologias/POO_basico.md`

---

## Pasos Sugeridos de Implementacion
1. Crear las clases `Jugador` y `Juego` con estructura basica
2. Implementar `jugar()` con logica de adivinanza simple
3. Agregar sistema de pistas (mayor/menor)
4. Implementar puntuacion y estadisticas del jugador
5. Crear el bucle principal en `main.py` con opcion de reiniciar
6. Hacer commits en Git por cada funcionalidad nueva
