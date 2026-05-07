# Proyecto: Monitor de Sistema (CLI)

## 📋 Descripción
Aplicación de consola que monitorea recursos del sistema (CPU, memoria, procesos) usando Python y comandos de Linux CLI. Permite visualizar el estado del sistema en tiempo real.

---

## 🛠️ Stack Tecnológico
- **Lenguaje**: Python 3.x
- **Bibliotecas**: `psutil` (monitoreo), `time`
- **Sistemas Operativos**: Linux CLI básico (comandos `top`, `ps`, `free`)
- **Control de Versiones**: Git, GitHub
- **Editor**: VS Code

---

## 🎯 Objetivos de Aprendizaje
- [ ] Aplicar **Sistemas Operativos I**: Conceptos de procesos, uso de CPU/memoria
- [ ] Usar **Linux CLI**: Ejecutar comandos, parsear salidas
- [ ] Estructurar código en **Funciones** y **POO básico** (clase `Monitor`)
- [ ] Uso de **Variables**, **Tipos de datos**, **Ciclos** (polling)
- [ ] Manejo de **Excepciones** (sistemas no disponibles)
- [ ] Control de versiones: `git init`, `commit`, `push` a GitHub

---

## 💻 Estructura Sugerida del Código

### Clase `MonitorSistema`
```python
import psutil
import time

class MonitorSistema:
    def __init__(self, intervalo=1):
        self.intervalo = intervalo  # Segundos entre muestras
    
    def obtener_cpu(self):
        """Retorna el uso de CPU en porcentaje."""
        return psutil.cpu_percent(interval=1)
    
    def obtener_memoria(self):
        """Retorna información de memoria virtual."""
        mem = psutil.virtual_memory()
        return {
            'total': mem.total,
            'disponible': mem.available,
            'porcentaje': mem.percent
        }
    
    def listar_procesos(self, limite=5):
        """Lista los procesos que más consumen."""
        procesos = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
            try:
                procesos.append(proc.info)
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass
        return sorted(procesos, key=lambda x: x['cpu_percent'], reverse=True)[:limite]
    
    def mostrar_estado(self):
        """Muestra el estado actual en consola."""
        print(f"--- Monitor de Sistema (Intervalo: {self.intervalo}s) ---")
        print(f"Uso de CPU: {self.obtener_cpu()}%")
        
        mem = self.obtener_memoria()
        print(f"Memoria: {mem['porcentaje']}% usado")
        print(f"  Total: {mem['total'] / (1024**3):.2f} GB")
        print(f"  Disponible: {mem['disponible'] / (1024**3):.2f} GB")
        
        print("\nTop 5 Procesos por CPU:")
        for p in self.listar_procesos():
            print(f"  PID: {p['pid']}, Nombre: {p['name']}, CPU: {p['cpu_percent']}%")
    
    def iniciar_monitoreo(self, duracion=10):
        """Inicia el monitoreo por N ciclos."""
        for i in range(duracion):
            print(f"\nMuestra {i+1}/{duracion}")
            self.mostrar_estado()
            if i < duracion - 1:
                time.sleep(self.intervalo)

# main.py
if __name__ == "__main__":
    monitor = MonitorSistema(intervalo=2)
    try:
        monitor.iniciar_monitoreo(duracion=5)
    except KeyboardInterrupt:
        print("\nMonitoreo detenido por el usuario.")
```

---

## 📝 Comandos Linux CLI Relacionados
```bash
# Ver procesos activos
ps aux

# Ver uso de memoria
free -h

# Monitoreo en tiempo real (alternativa)
top

# Uso en Python (subprocess)
import subprocess
resultado = subprocess.run(['ps', 'aux'], capture_output=True, text=True)
print(resultado.stdout)
```

---

## ✅ Criterios de Aceptación
1. **POO**: Clase `MonitorSistema` con atributos y métodos claros
2. **Funcionalidad**: Muestra CPU, memoria y procesos correctamente
3. **Ciclos**: Uso de bucles para muestreo continuo
4. **Manejo de Errores**: Try/except para procesos que terminan durante monitoreo
5. **Git**: Repositorio en GitHub con mínimo 3 commits

---

## 📚 Recursos de Apoyo
- **psutil Docs**: https://psutil.readthedocs.io/
- **Linux CLI Basics**: Revisar carpeta `Tecnologias/Linux_CLI_básico.md`
- **Subprocess Module**: https://docs.python.org/3/library/subprocess.html

---

## 🚀 Pasos Sugeridos de Implementación
1. Instalar `psutil`: `pip install psutil`
2. Crear la clase `MonitorSistema` con métodos básicos
3. Implementar `mostrar_estado()` usando print formateado
4. Agregar bucle en `main.py` para muestreo continuo
5. Probar en Linux (o WSL) y capturar salida
6. Hacer commits en Git por cada funcionalidad
