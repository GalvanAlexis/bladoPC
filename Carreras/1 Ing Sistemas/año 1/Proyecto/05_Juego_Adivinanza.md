# Proyecto: Juego de Adivinanza (Number Guessing Game)

## 📋 Descripción
Juego interactivo de consola donde el jugador debe adivinar un número aleatorio. Incluye sistema de pistas, puntuación y estadísticas de juego.

---

## 🛠️ Stack Tecnológico
- **Lenguaje**: Python 3.x
- **Bibliotecas**: `random`
- **POO Básico**: Clases `Juego`, `Jugador`
- **Control de Versiones**: Git, GitHub
- **Editor**: VS Code

---

## 🎯 Objetivos de Aprendizaje
- [ ] Aplicar **Introducción a la Programación**: Lógica, variables, estructuras de control
- [ ] Estructurar código en **Funciones** y **POO básico** (clases)
- [ ] Uso de **Variables**, **Tipos de datos**, **Condicionales**, **Ciclos**
- [ ] Uso de **POO básico**: Clases, atributos, métodos
- [ ] Manejo de **Random** para generación de números
- [ ] Control de versiones: `git init`, `commit`, `push` a GitHub

---

## 💻 Estructura Sugerida del Código

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
        """Actualiza estadísticas tras una partida."""
        self.intentos_totales += intentos
        if gano:
            self.partidas_ganadas += 1
            # Puntuación: 100 - (intentos * 5), mínimo 10
            puntos = max(100 - (intentos * 5), 10)
            if puntos > self.puntuacion_maxima:
                self.puntuacion_maxima = puntos
    
    def mostrar_estadisticas(self):
        """Muestra las estadísticas del jugador."""
        print(f"\n--- Estadísticas de {self.nombre} ---")
        print(f"Partidas ganadas: {self.partidas_ganadas}")
        print(f"Intentos totales: {self.intentos_totales}")
        print(f"Puntuación máxima: {self.puntuacion_maxima}")

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
        print(f"\n¡Bienvenido {jugador.nombre}!")
        print(f"Adivina el número entre {self.minimo} y {self.maximo}")
    
    def dar_pista(self, numero_ingresado):
        """Proporciona pistas basadas en el intento."""
        if numero_ingresado < self.numero_secreto:
            print("Pista: El número es MAYOR")
        else:
            print("Pista: El número es MENOR")
    
    def jugar(self):
        """Lógica principal del juego."""
        if not self.jugador:
            print("Error: Configura primero el jugador.")
            return False
        
        while True:
            try:
                intento = int(input(f"Intento {self.intentos + 1}: Ingresa un número: "))
                self.intentos += 1
                
                if intento == self.numero_secreto:
                    print(f"¡CORRECTO! Adivinaste en {self.intentos} intentos.")
                    self.jugador.actualizar_estadisticas(self.intentos, True)
                    return True
                else:
                    self.dar_pista(intento)
                    
                    # Pista adicional cada 3 intentos
                    if self.intentos % 3 == 0:
                        rango = self.maximo - self.minimo
                        print(f"Pista extra: El número está en el rango medio")
            
            except ValueError:
                print("Error: Ingresa un número válido.")
    
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
    juego = Juego(1, 50)  # Números del 1 al 50
    juego.configurar(jugador)
    
    while True:
        juego.jugar()
        
        opcion = input("\n¿Jugar otra partida? (s/n): ").lower()
        if opcion != 's':
            break
        
        juego.reiniciar()
    
    # Mostrar estadísticas finales
    jugador.mostrar_estadisticas()
    print("\n¡Gracias por jugar!")

if __name__ == "__main__":
    main()
```

---

## 📝 Ejemplo de Partida
```
=== JUEGO DE ADIVINANZA ===
Ingresa tu nombre: Blado

¡Bienvenido Blado!
Adivina el número entre 1 y 50

Intento 1: Ingresa un número: 25
Pista: El número es MAYOR

Intento 2: Ingresa un número: 37
Pista: El número es MENOR

Intento 3: Ingresa un número: 30
Pista: El número es MAYOR
Pista extra: El número está en el rango medio

Intento 4: Ingresa un número: 33
¡CORRECTO! Adivinaste en 4 intentos.

¿Jugar otra partida? (s/n): n

--- Estadísticas de Blado ---
Partidas ganadas: 1
Intentos totales: 4
Puntuación máxima: 80
```

---

## ✅ Criterios de Aceptación
1. **POO**: Clases `Jugador` y `Juego` con atributos y métodos claros
2. **Lógica**: Generación aleatoria, comparación, pistas, puntuación
3. **Interacción**: Entrada de usuario, validación de datos (try/except)
4. **Estadísticas**: Llevar conteo de partidas, intentos y puntuación
5. **Git**: Repositorio en GitHub con mínimo 4 commits

---

## 📚 Recursos de Apoyo
- **Python Random**: https://docs.python.org/3/library/random.html
- **Python Input/Output**: https://docs.python.org/3/tutorial/inputoutput.html
- **POO Basics**: Revisar carpeta `Tecnologias/POO_básico.md`

---

## 🚀 Pasos Sugeridos de Implementación
1. Crear las clases `Jugador` y `Juego` con estructura básica
2. Implementar `jugar()` con lógica de adivinanza simple
3. Agregar sistema de pistas (mayor/menor)
4. Implementar puntuación y estadísticas del jugador
5. Crear el bucle principal en `main.py` con opción de reiniciar
6. Hacer commits en Git por cada funcionalidad nueva
