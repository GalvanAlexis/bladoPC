# Git: Control de Versiones Distribuido

## ¿Qué es Git?

**Git** es un sistema de control de versiones distribuido (DVCS) diseñado para rastrear cambios en el código fuente durante el desarrollo de software. Fue creado por **Linus Torvalds** (el creador de Linux) en 2005.

### ¿Por qué usar Git?
1.  **Historial Completo:** Guarda un "snapshot" (foto) de todos tus archivos en cada "commit" (confirmación). Puedes viajar atrás en el tiempo si rompes algo.
2.  **Ramificación (Branching):** Puedes crear una línea paralela de desarrollo (rama) para probar cosas sin romper el código principal.
3.  **Colaboración:** Varios ingenieros pueden trabajar en el mismo proyecto sin pisarse. Git se encarga de mezclar (merge) los cambios.
4.  **Distribuido:** Cada desarrollador tiene una copia completa del repositorio (incluyendo el historial) en su propia máquina.

---

## Conceptos Fundamentales

### 1. Estados de los Archivos
Un archivo en Git puede estar en tres estados principales:

1.  **Committed (Confirmado):** Los datos están almacenados de forma segura en tu base de datos local (`.git` folder).
2.  **Modified (Modificado):** Cambiaste el archivo pero aún no lo has confirmado a la base de datos.
3.  **Staged (Preparado):** Marcaste la versión actual de un archivo modificado para ir al próximo commit.

### Flujo de Trabajo Básico
`Working Directory` (Tus archivos actuales) → `Staging Area` (Area de preparación) → `Git Repository` (El repositorio).

### 2. Repositorio (Repo)
Es donde Git guarda los metadatos y la base de datos de tus proyectos. Se crea con `git init`.

### 3. Commit
Es el "punto de guardado". Una vez que haces commit, ese estado del proyecto queda grabado para siempre (a menos que hagas un force push o limpies el historial).

---

## Configuración Inicial

Antes de usar Git, debes decirle quién eres. Esto se hace **una sola vez** (globalmente).
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

Para ver la configuración:
```bash
git config --list
```

---

## Comandos Esenciales (Alta Frecuencia)

### Iniciar y Clonar
| Comando | Descripción |
|---------|-------------|
| `git init` | Inicializa un nuevo repositorio en la carpeta actual. Crea la carpeta oculta `.git`. |
| `git clone <url>` | Descarga un repositorio existente (de GitHub/GitLab) a tu máquina local. |

### Estado y Cambios
| Comando | Descripción |
|---------|-------------|
| `git status` | Muestra el estado actual: archivos modificados, sin seguimiento, o listos para commit. **¡Usalo siempre!** |
| `git add <archivo>` | Añade un archivo al "Staging Area" (preparandolo para commit). |
| `git add .` | Añade **todos** los archivos modificados al staging area. |
| `git commit -m "Mensaje"` | Confirma los cambios en el staging area. El mensaje debe ser descriptivo. |

**Ejemplo de flujo básico:**
```bash
# 1. Modificas un archivo (ej. main.py)
echo "print('Hola')" > main.py

# 2. Ver qué pasó
git status
# Salida: On branch main, Untracked files: main.py

# 3. Añadir al staging
git add main.py
git status
# Salida: Changes to be committed: new file: main.py

# 4. Confirmar (Commit)
git commit -m "Añade script inicial de hola mundo"
```

### Historial y Diferencias
| Comando | Descripción |
|---------|-------------|
| `git log` | Muestra el historial de commits (hash, autor, fecha, mensaje). |
| `git log --oneline` | Historial resumido (una línea por commit). |
| `git diff` | Muestra las diferencias entre tu directorio de trabajo y el staging area. |
| `git diff --staged` | Muestra diferencias entre staging area y el último commit. |

---

## Ramas (Branches)

El poder de Git radica en las ramas. La rama principal suele llamarse `main` (antes `master`).

### Comandos de Ramas
| Comando | Descripción |
|---------|-------------|
| `git branch` | Lista las ramas locales. La actual tiene un `*` al lado. |
| `git branch <nombre>` | Crea una nueva rama. |
| `git checkout <nombre>` | Cambia a esa rama (actualiza archivos en disco). |
| `git checkout -b <nombre>` | Crea la rama Y cambia a ella en un solo paso. |
| `git merge <nombre>` | Une los cambios de la rama `<nombre>` a tu rama actual. |

### Ejemplo de Flujo con Ramas (Feature Branch Workflow)
```bash
# Estás en main (rama principal)
git checkout -b feature/nueva-funcionalidad

# Trabajas, haces commits aquí...
echo "nueva funcionalidad" >> app.py
git add app.py
git commit -m "Añade nueva funcionalidad"

# Vuelves a main para integrar
git checkout main
git merge feature/nueva-funcionalidad

# Borras la rama ya innecesaria
git branch -d feature/nueva-funcionalidad
```

---

## Repositorios Remotos y GitHub

GitHub es un servidor en la nube que guarda tu repositorio.

### Comandos de Sincronización
| Comando | Descripción |
|---------|-------------|
| `git remote -v` | Muestra los servidores remotos conectados. |
| `git remote add origin <url>` | Conecta tu repo local con un repo remoto (llamado `origin`). |
| `git push origin main` | Envía tus commits locales al servidor remoto (GitHub). |
| `git pull` | Descarga los cambios del remoto y los mezcla con tu local. |
| `git fetch` | Descarga los cambios pero NO los mezcla automáticamente. |

---

## Deshacer Cambios (Undo)

| Comando | Descripción |
|---------|-------------|
| `git restore <archivo>` | Descarta cambios en el directorio de trabajo (vuelve al último commit). |
| `git restore --staged <archivo>` | Saca un archivo del staging area (pero mantiene los cambios en el archivo). |
| `git revert <hash_commit>` | Crea un **nuevo commit** que deshace los cambios de un commit anterior (seguro para repos públicos). |
| `git reset --hard <hash_commit>` | **PELIGROSO:** Borra el historial y archivos hasta ese commit. No usar si ya hiciste push. |

---

## Ignorar Archivos: `.gitignore`

Hay archivos que NO quieres en Git (contraseñas, archivos compilados, entornos virtuales). Crea un archivo `.gitignore`.

**Ejemplo de `.gitignore`:**
```gitignore
# Ignorar archivos de entorno virtual
venv/
env/

# Ignorar archivos de sistema
.DS_Store
Thumbs.db

# Ignorar archivos de configuración local de IDE
.vscode/
.idea/

# Ignorar archivos de base de datos locales
*.db
*.sqlite
```

---

## Recursos Recomendados

### Libros
*   **"Pro Git"** - Scott Chacon, Ben Straub (La biblia oficial, gratis online en git-scm.com).
*   **"Git for Humans"** - David Demaree.

### Herramientas
*   **GitHub Desktop:** Interfaz gráfica para quienes no quieren usar CLI aún.
*   **GitKraken / Sourcetree:** Clients visuales potentes para ver ramas y merges.

### Tutoriales
*   **Learn Git Branching:** https://learngitbranching.js.org/ (Juego interactivo excelente para entender ramas).
*   **Oh Shit, Git!:** https://ohshitgit.com/ (Cómo salir de errores comunes).
*   **GitHub Skills:** https://skills.github.com/ (Cursos oficiales de GitHub).
