# Sistemas Operativos I: Conceptos Básicos, CLI, Procesos

## Introducción a los Sistemas Operativos

Un **Sistema Operativo (SO)** es el software principal que gestiona los recursos de hardware de una computadora y proporciona servicios a los programas de aplicación. Es el intermediario entre el hardware y el usuario.

### Funciones Principales del SO
1.  **Gestión de Procesos:** Crear, programar (scheduling) y finalizar procesos.
2.  **Gestión de Memoria:** Asignar y liberar memoria RAM para los procesos.
3.  **Gestión de Almacenamiento:** Controlar el acceso a discos duros (sistemas de archivos).
4.  **Gestión de E/S (I/O):** Manejar la comunicación con periféricos (teclado, pantalla, red).
5.  **Protección y Seguridad:** Evitar que procesos no autorizados accedan a recursos.

### Tipos de Sistemas Operativos
*   **Monotarea vs Multitarea:** Ejecutar un solo proceso a la vez vs múltiples procesos simultáneamente.
*   **Monousuario vs Multiusuario:** Un solo usuario conectado vs varios usuarios concurrentes (típico en servidores Linux).
*   **Distribuidos:** Gestionan un conjunto de computadoras independientes pero que se comunican (Clusters).

---

## Conceptos Básicos: El Kernel

El **Kernel** es el núcleo del sistema operativo. Es el programa que se ejecuta en todo momento y tiene acceso total al hardware.

### Modos de Operación
Para proteger el sistema, las CPUs modernas operan en dos modos:
1.  **Modo Kernel (Supervisor/Anillo 0):** El código del kernel tiene acceso ilimitado al hardware.
2.  **Modo Usuario (Anillo 3):** Los programas de usuario tienen acceso restringido. Si necesitan usar hardware, deben hacer una **Llamada al Sistema (System Call)** para pedirle al kernel que lo haga por ellos (ej. abrir un archivo).

### Interrupciones
Mecanismo por el cual el hardware o el software puede "interrumpir" la ejecución actual de la CPU para atender una tarea más urgente.
*   **IRQ (Interrupt Request):** Señal de hardware (ej. mover el mouse).
*   **ISR (Interrupt Service Routine):** La función que el kernel ejecuta para manejar la interrupción.

---

## Procesos (Processes)

Un **proceso** no es solo un programa. Es un **programa en ejecución**. Contiene el código, los datos actuales, el contador de programa (PC) y el estado actual.

### Estados de un Proceso
Un proceso típicamente pasa por estos estados:
1.  **Nuevo (New):** Se acaba de crear.
2.  **Listo (Ready):** Esperando ser asignado a una CPU.
3.  **En Ejecución (Running):** La CPU está ejecutando sus instrucciones.
4.  **Espera/Bloqueo (Waiting/Blocked):** Esperando un evento (ej. lectura de disco, entrada del usuario).
5.  **Terminado (Terminated):** Ha finalizado su ejecución.

### PCB (Process Control Block)
El SO mantiene una estructura de datos para cada proceso llamada **PCB**. Contiene:
*   **PID (Process ID):** Identificador único.
*   **Estado:** (Ready, Running, etc.).
*   **Contador de Programa:** Dónde va la ejecución.
*   **Registros de CPU:** Estado de los datos en la CPU.
*   **Información de Memoria:** Límites de memoria asignados.
*   **Contabilidad (Accounting):** Tiempo de CPU usado.

### Hilos (Threads)
Un hilo es la unidad básica de utilización de CPU dentro de un proceso.
*   Un proceso puede tener múltiples **hilos (multithreading)**.
*   Comparten el mismo espacio de memoria del proceso padre, lo que hace que la comunicación sea rápida, pero un error en un hilo puede crashear todo el proceso.

---

## Línea de Comandos (CLI) en Linux/Ubuntu

El **CLI (Command Line Interface)** permite interactuar con el SO mediante texto. En Linux, esto se hace a través de un **Shell** (la interfaz). El más común es **Bash (Bourne Again SHell)**.

### Estructura de un Comando
```bash
comando [opciones] [argumentos]
```
*   **Comando:** El programa a ejecutar (ej. `ls`).
*   **Opciones (Flags):** Modifican el comportamiento, usualmente precedidas por `-` (corta) o `--` (larga). ej. `ls -l` (formato largo).
*   **Argumentos:** Sobre qué se actúa (archivos, directorios).

### Comandos Esenciales

#### Navegación y Archivos
| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `pwd` | Imprime el directorio actual (Print Working Directory) | `pwd` |
| `ls` | Lista archivos y carpetas | `ls -la` (detallado, incluye ocultos) |
| `cd` | Cambia de directorio (Change Directory) | `cd /home/usuario` o `cd ..` (subir) |
| `mkdir` | Crea un directorio | `mkdir nueva_carpeta` |
| `touch` | Crea un archivo vacío | `touch notas.txt` |
| `cp` | Copia archivos o carpetas | `cp archivo.txt destino/` |
| `mv` | Mueve o renombra archivos | `mv archivo.txt nuevo_nombre.txt` |
| `rm` | Elimina archivos (**¡Cuidado!**) | `rm archivo.txt` (usar `-r` para carpetas) |
| `cat` | Muestra el contenido de un archivo en consola | `cat notas.txt` |

#### Permisos (chmod)
En Linux, los archivos tienen permisos de lectura (r), escritura (w) y ejecución (x) para el dueño, el grupo y otros.
```bash
# Dar permiso de ejecución al dueño
chmod u+x script.sh

# Formato numérico: r=4, w=2, x=1
chmod 755 script.sh  # Dueño: rwx (7), Grupo/Otros: rx (5)
```

#### Redirección y Tuberías (Pipes)
*   **Redirección (`>`, `>>`):** Envía la salida de un comando a un archivo en lugar de la pantalla.
    ```bash
    ls -la > lista_archivos.txt  # Sobrescribe
    echo "Hola" >> notas.txt      # Añade al final
    ```
*   **Tuberías (`|`):** La salida de un comando se convierte en la entrada del siguiente.
    ```bash
    ls -la | grep ".txt"  # Lista archivos y filtra solo los que terminan en .txt
    ```

---

## Gestión de Procesos en CLI

### Comandos de Monitoreo
1.  **`top` / `htop` (mejorado):** Muestra en tiempo real los procesos activos, uso de CPU y memoria.
2.  **`ps` (Process Status):** Muestra una instantánea de los procesos.
    ```bash
    ps aux  # Muestra todos los procesos de todos los usuarios
    ```

### Señales y Terminación
Los procesos se terminan o controlan mediante **señales**.
*   **`Ctrl + C`:** Envía la señal `SIGINT` (Interrupción) al proceso en primer plano.
*   **`kill`:** Envía una señal a un proceso por su PID.
    ```bash
    kill 1234       # Envía SIGTERM (terminar amablemente)
    kill -9 1234    # Envía SIGKILL (forzar terminación inmediata)
    ```

### Primer Planos y Segundo Plano
*   **Primer plano (Foreground):** El shell espera a que el comando termine.
*   **Segundo plano (Background):** El comando se ejecuta y libera la terminal inmediatamente. Se usa el ampersand `&`.
    ```bash
    python script_largo.py &  # Lo ejecuta en background
    jobs                          # Lista trabajos en background
    fg %1                         # Lo trae al primer plano (foreground)
    ```

### Uso de Python en CLI
Puedes ejecutar scripts de Python o entrar en modo interactivo.
```bash
# Ejecutar un script
python mi_programa.py

# Modo interactivo (REPL)
python
>>> print("Hola desde la terminal")
>>> exit()
```

---

## Recursos Recomendados

### Libros
*   **"Operating Systems: Three Easy Pieces"** - Remzi H. Arpaci-Dusseau (Disponible gratis online).
*   **"The Linux Command Line"** - William Shotts (Excelente para aprender CLI).

### Documentación y Referencias
*   **Linux Man Pages:** En la terminal, escribe `man comando` (ej. `man ls`) para ver el manual.
*   **Bash Reference Manual:** https://www.gnu.org/software/bash/manual/

### Tutoriales Prácticos
*   **OverTheWire Bandit:** Juego wargame para aprender Linux/CLI jugando (https://overthewire.org/wargames/bandit/).
*   **Linux Journey:** https://linuxjourney.com/ (Guía interactiva gratuita).
