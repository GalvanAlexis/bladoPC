# GitHub: Repositorios Personales y Colaboración

**GitHub** es la plataforma de desarrollo colaborativo más grande del mundo. Utiliza **Git** (el sistema de control de versiones) y le añade una interfaz web para gestionar proyectos, bugs, pull requests y documentación.

---

## 1. Conceptos Fundamentales de GitHub

### Repositorio (Repo)
Es el "proyecto". Contiene todas las carpetas, archivos y el historial de cambios (la base de datos de Git).

### Repositorio Local vs Remoto
*   **Local:** La copia en tu disco duro (TU computadora).
*   **Remoto:** La copia en los servidores de GitHub (En la nube).

### Fork (Bifurcación)
Crear una copia de un repositorio de **otra persona** en tu propia cuenta de GitHub.
*   Útil para contribuir a proyectos de código abierto (Open Source).
*   Puedes modificar tu copia sin afectar al original.

### Clone (Clonar)
Descargar un repositorio (sea tuyo o un fork) desde GitHub a tu máquina local.
```bash
git clone https://github.com/usuario/repo.git
```

### Pull Request (PR)
Es la forma de decir: "Hola, hice cambios en mi fork, por favor revisa y fusiona (merge) mis cambios con tu repositorio original".
*   Es el corazón de la colaboración en software libre.

---

## 2. Configuración Inicial de tu Cuenta

### 1. Crear Cuenta
1.  Ir a [github.com](https://github.com/).
2.  Registrarse (usar un email profesional).
3.  **Verificar el email:** GitHub enviará un correo, debes confirmarlo.

### 2. Crear un Repositorio Nuevo
1.  Haz clic en el botón **"New"** (o el `+` arriba a la derecha).
2.  **Repository name:** Usa un nombre descriptivo (ej. `simulador-sistema-solar`).
3.  **Public vs Private:**
    *   *Public:* Cualquiera puede ver tu código (bueno para portfolio).
    *   *Private:* Solo tú y quien invités pueden verlo.
4.  **Initialize this repository with:**
    *   Marca `Add a README file` (Crea un `README.md` inicial).
    *   Marca `Add .gitignore` y selecciona "Python" (Ignora archivos innecesarios).
    *   Marca `Choose a license` (Elige MIT para código abierto).

### 3. Conectar Local con GitHub (SSH vs HTTPS)
Para subir cambios, necesitas autenticarte.

#### Opción A: HTTPS (Más fácil para empezar)
GitHub pedirá tu usuario y contraseña (o token personal) cada vez que hagas `git push`.
*   **Nota:** Ya no se usan contraseñas normales para `push`. Debemos generar un **Personal Access Token (PAT)** en GitHub:
    1.  GitHub -> Settings -> Developer Settings -> Personal access tokens -> Tokens (classic) -> Generate new token.
    2.  Selecciona el "scope" `repo`.
    3.  Guárdalo bien, solo se muestra una vez.

#### Opción B: SSH (Recomendado a largo plazo)
Usa llaves criptográficas.
```bash
# Generar llave SSH
ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"

# Ver la llave pública y copiarla
cat ~/.ssh/id_ed25519.pub
```
Luego ve a GitHub -> Settings -> SSH and GPG keys -> New SSH key -> Pega la llave.

---

## 3. Flujo de Trabajo Básico (The Workflow)

Este es el ciclo diario de un desarrollador usando GitHub.

### 1. Clonar tu Repo (Solo la primera vez)
```bash
git clone https://github.com/tu_usuario/tu_repo.git
cd tu_repo
```

### 2. Hacer Cambios y Subirlos (Push)
```bash
# 1. Modificas un archivo (ej. main.py)
echo "print('Hola GitHub')" > main.py

# 2. Ver qué cambió
git status

# 3. Añadir al staging area
git add main.py
# O añadir todo: git add .

# 4. Confirmar (Commit)
git commit -m "Añade saludo inicial"

# 5. Subir a GitHub (Push)
git push origin main
```

---

## 4. Ramas (Branches) y Pull Requests

### ¿Por qué usar Ramas?
Nunca trabajes directamente en `main`. Crea una rama para cada nueva funcionalidad.

### Flujo con Rama y PR
```bash
# 1. Actualizar main local
git checkout main
git pull origin main

# 2. Crear y moverse a nueva rama
git checkout -b feature/nueva-funcionalidad

# 3. Trabajar (cambios, add, commit)
echo "nueva cosa" >> app.py
git add app.py
git commit -m "Añade nueva funcionalidad"

# 4. Subir la nueva rama a GitHub
git push origin feature/nueva-funcionalidad
```

### Crear el Pull Request en GitHub
1.  Ve a tu repositorio en github.com.
2.  Verás un banner amarillo: "Compare & pull request" (para tu rama recién subida).
3.  Haz clic y escribe una descripción clara de qué hiciste.
4.  Haz clic en "Create pull request".
5.  **Merge:** Si todo está bien, haces clic en "Merge pull request" para unirlo a `main`.

---

## 5. Issues (Gestión de Tareas)

Los **Issues** son como "tickets" o tareas pendientes.
*   Puedes abrir un Issue para reportar un bug: "La función X crashea con números negativos".
*   Puedes asignar Issues a ti mismo o a colaboradores.
*   Puedes referenciar Issues en commits: `git commit -m "Fix #12: Corrige error de división"` (Automáticamente cierra el Issue #12).

---

## 6. GitHub Pages (Alojamiento Web Básico)

Puedes convertir un repositorio en un sitio web estático gratuito.
1.  Ve a Settings -> Pages.
2.  Selecciona la rama `main` y la carpeta `/root` o `/docs`.
3.  Tu sitio estará en: `https://tu_usuario.github.io/nombre_repo/`.
*   **Uso:** Crear tu portfolio o documentación de proyectos.

---

## 7. README.md (La Cara del Proyecto)

El archivo `README.md` es lo primero que ven. Debe estar en la raíz.

### Estructura Recomendada
```markdown
# Nombre del Proyecto

## Descripción
¿De qué trata? ¿Qué problema resuelve?

## Instalación
```bash
git clone ...
pip install -r requirements.txt
```

## Uso
```python
import mi_libreria
mi_libreria.run()
```

## Contribuir
Haz fork, crea una rama, y envía un Pull Request.

## Licencia
MIT License.
```

---

## 8. GitHub Desktop (Alternativa Visual)

Si no te gusta la línea de comandos aún:
*   Descarga **GitHub Desktop**.
*   Tiene botones para: Sincronizar, Crear ramas, Hacer commits y Pull Requests visualmente.
*   Muy bueno para principiantes.

---

## 9. Stars y Forks (Social Coding)

*   **Star (⭐):** Dale "Me gusta" a un proyecto para guardarlo en favoritos.
*   **Watch:** Recibe notificaciones de cada cambio en el proyecto.
*   **Fork:** Copia el proyecto a tu cuenta para modificarlo.

---

## Resumen Visual del Flujo GitHub

```text
[LOCAL: Tu PC]                          [REMOTO: GitHub]
      │                                        │
      │ 1. git clone (Solo 1 vez)            │
      │───────────────────────────────────────>
      │                                        │
      │ 2. git checkout -b feature          │
      │ 3. Código, git add, git commit    │
      │───────────────────────────────────────>
      │ 4. git push origin feature          │
      │                                        │
      │                                        │ 5. Create Pull Request (Web)
      │                                        │──────────────────────────────>
      │                                        │
      │                                        │ 6. Code Review / Checks
      │                                        │
      │ 7. Merge (Click en Web)            │
      │<───────────────────────────────────────
      │ 8. git checkout main              │
      │ 9. git pull origin main           │
```

---

## Recursos Recomendados

### Documentación Oficial
*   **GitHub Docs:** [https://docs.github.com/](https://docs.github.com/)
*   **GitHub Skills:** [https://skills.github.com/](https://skills.github.com/) (Cursos interactivos oficiales).

### Tutoriales
*   **"Git & GitHub for Beginners"** - Net Ninja (YouTube).
*   **"GitHub Pull Request in 100 Seconds"** - Fireship (YouTube, muy rápido y claro).

### Tips Pro
*   **Profile README:** Crea un repositorio con tu nombre de usuario (ej. `usuario/usuario`). Lo que pongas en su `README.md` aparecerá en tu perfil público de GitHub.
*   **Green Square:** GitHub genera un gráfico de calor (heatmap). ¡Intenta hacer un commit cada día para que se vea verde!
