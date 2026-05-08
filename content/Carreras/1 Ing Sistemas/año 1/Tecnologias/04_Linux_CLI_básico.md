# Linux CLI Básico: Comandos y Gestión de Archivos

## ¿Qué es Linux y por qué Ubuntu?

**Linux** es un sistema operativo de código abierto basado en Unix. **Ubuntu** es una de las distribuciones (distros) más populares, especialmente para desarrolladores, por su facilidad de uso y gran comunidad.

### El Terminal (Shell)
En Linux, la interfaz de línea de comandos se conoce como **Shell**. El más común es **Bash (Bourne Again Shell)**.
*   **Prompt:** Lo que ves antes de escribir. Usualmente muestra `usuario@máquina:~$`.
*   **Case Sensitive:** Linux distingue mayúsculas de minúsculas. `Archivo.txt` y `archivo.txt` son distintos.

---

## Navegación y Estructura de Directorios

Linux tiene una estructura de árbol invertida que comienza en la raíz `/`.

### Comandos de Navegación

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `pwd` | **P**rint **W**orking **D**irectory. Muestra dónde estás. | `pwd` → `/home/usuario` |
| `ls` | **L**i**s**t. Lista archivos y carpetas. | `ls -la` (detallado, incluye ocultos) |
| `cd` | **C**hange **D**irectory. Cambia de carpeta. | `cd /home` o `cd ..` (subir) |
| `tree` | Muestra el árbol de directorios (si está instalado). | `tree -L 2` (2 niveles) |

### Rutas (Paths)
1.  **Ruta Absoluta:** Comienza en `/`. (Ej. `/home/usuario/documentos`).
2.  **Ruta Relativa:** Comienza desde tu ubicación actual. (Ej. `./carpeta` o simplemente `carpeta`).

```bash
# Estás en /home/usuario y quieres ir a /home/usuario/descargas
cd descargas  # Ruta relativa
cd /home/usuario/descargas  # Ruta absoluta
```

---

## Gestión de Archivos y Carpetas

### Creación y Manipulación

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `touch` | Crea un archivo vacío o actualiza la fecha de uno existente. | `touch notas.txt` |
| `mkdir` | **M**a**k**e **dir**ectory. Crea carpeta. | `mkdir proyecto` |
| `mkdir -p` | Crea carpetas anidadas. | `mkdir -p padre/hijo/nieto` |
| `cp` | **C**o**p**y. Copia archivos. | `cp archivo.txt destino/` |
| `mv` | **M**o**v**e. Mueve o renombra archivos. | `mv viejo.txt nuevo.txt` |
| `rm` | **R**e**m**ove. Elimina archivos. **¡Cuidado!** | `rm archivo.txt` |
| `rm -r` | Elimina carpetas y su contenido recursivamente. | `rm -r carpeta/` |

**¡Alerta Roja!:** `rm -rf /` (con permisos de root) borraría todo el sistema. Nunca lo hagas.

### Lectura de Archivos

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `cat` | Muestra **todo** el contenido de golpe. | `cat archivo.txt` |
| `less` | Muestra el contenido paginado (scroll). | `less archivo_largo.log` (Q para salir) |
| `head` | Muestra las primeras 10 líneas. | `head -n 5 archivo.txt` |
| `tail` | Muestra las últimas 10 líneas. | `tail -f log.txt` (sigue el archivo en vivo) |

---

## Permisos y Propietario (Seguridad Básica)

En Linux, cada archivo tiene permisos definidos para tres grupos: **Usuario (u)**, **Grupo (g)** y **Otros (o)**.

### Tipos de Permiso
*   **r (Read/Lectura):** Valor 4.
*   **w (Write/Escritura):** Valor 2.
*   **x (Execute/Ejecución):** Valor 1.

### Comando `chmod` (Change Mode)
Cambia los permisos.

```bash
# Formato numérico (Octal) - El más común
chmod 755 script.sh  
# 7 (rwx) para dueño, 5 (r-x) para grupo y otros.
# Equivale a: rwxr-xr-x

chmod 644 documento.txt
# 6 (rw-) para dueño, 4 (r--) para grupo y otros.

# Formato simbólico
chmod u+x script.sh  # Añade permiso de ejecución (x) al usuario (u)
chmod go-w archivo.txt  # Quita ( - ) permiso de escritura (w) a grupo (g) y otros (o)
```

### Comando `sudo` (SuperUser DO)
Permite ejecutar comandos con privilegios de administrador (root).
```bash
sudo apt update  # Actualiza la lista de paquetes (requiere contraseña de admin)
```

---

## Redirección y Tuberías (Pipes)

### Redirección de Entrada/Salida
No todo va a la pantalla (stdout). Puedes enviarlo a archivos.

| Símbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `>` | Redirige salida (sobrescribe). | `ls -la > listado.txt` |
| `>>` | Redirige salida (añade al final). | `echo "Hola" >> notas.txt` |
| `<` | Redirige entrada (lee de archivo). | `sort < nombres.txt` |
| `2>` | Redirige errores (stderr). | `comando_erroneo 2> errores.log` |

### Tuberías (Pipes) `|`
Conecta la salida de un comando con la entrada del siguiente. Es la mayor fortaleza de Linux.

```bash
# 1. Lista archivos, 2. Filtra solo los .txt, 3. Cuenta cuántos hay
ls -la | grep ".txt$" | wc -l

# Explicación:
# ls: Muestra archivos.
# grep: Busca patrones (filtra líneas).
# wc -l: Word count, cuenta líneas (-l).
```

---

## Gestión de Procesos Básicos

Aunque lo veremos en "Sistemas Operativos I", aquí los comandos esenciales:

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `ps` | Muestra procesos activos. | `ps aux` (muestra todos los de la máquina) |
| `top` / `htop` | Monitor en tiempo real (como el "Administrador de tareas"). | `top` (Q para salir) |
| `kill` | Envía una señal para terminar un proceso. | `kill 1234` o `kill -9 1234` (forzar) |
| `&` | Ejecuta en segundo plano (background). | `python script_largo.py &` |
| `Ctrl + C` | Mata el proceso en primer plano. | (En la terminal) |

---

## Búsqueda y Filtrado

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `grep` | Busca texto dentro de archivos o salidas. | `grep "error" log.txt` |
| `find` | Busca archivos por nombre, tamaño, etc. | `find . -name "*.py"` (busca .py aquí y abajo) |
| `locate` | Búsqueda rápida usando una base de datos. | `locate archivo.conf` |

---

## Ayuda Integrada (Man Pages)

Si no sabes cómo usar un comando, Linux tiene la respuesta.
```bash
man ls       # Muestra el manual (manual pages) del comando ls
ls --help    # Ayuda rápida (opciones comunes)
```

---

## Recursos Recomendados

### Libros
*   **"The Linux Command Line"** - William Shotts (Disponible gratis online).
*   **"Linux Bible"** - Christopher Negus (Referencia completa).

### Herramientas
*   **Windows Subsystem for Linux (WSL):** Si estás en Windows, instala Ubuntu a través de la Microsoft Store para tener una terminal Linux real dentro de Windows.
    ```powershell
    wsl --install -d Ubuntu
    ```

### Tutoriales
*   **ExplainShell:** https://explainshell.com/ (Pegas un comando complejo y te explica qué hace cada parte).
*   **OverTheWire (Bandit):** Juego para aprender Linux hackeando niveles.
