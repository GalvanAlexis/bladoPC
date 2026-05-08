# Herramienta: Git (Branches y Merges)

## Introducción
Git es un sistema de control de versiones distribuido. Las ramas (branches) permiten trabajar en paralelo sin afectar la versión principal.

---

## 1. Conceptos de Ramas (Branches)

### 1.1 ¿Qué es una Rama?
Una línea independiente de desarrollo. La rama principal suele ser `main` o `master`.

### 1.2 ¿Por qué usar Ramas?
- Desarrollar nuevas funcionalidades sin afectar la versión estable
- Trabajar en equipo en paralelo
- Experimentar sin riesgos

---

## 2. Comandos Básicos de Ramas

### 2.1 Listar, Crear y Cambiar de Rama
```bash
# Listar ramas
git branch

# Crear nueva rama
git branch nombre-rama

# Cambiar a una rama
git checkout nombre-rama
# O (más moderno)
git switch nombre-rama

# Crear y cambiar en un paso
git checkout -b nombre-rama
git switch -c nombre-rama
```

### 2.2 Renombrar y Eliminar Ramas
```bash
# Renombrar rama actual
git branch -m nuevo-nombre

# Eliminar rama (ya fusionada)
git branch -d nombre-rama

# Eliminar rama (forzosamente, no fusionada)
git branch -D nombre-rama
```

---

## 3. Fusionar Ramas (Merge)

### 3.1 Fast-Forward Merge
La rama objetivo no tiene cambios nuevos. Git simplemente avanza el puntero.

```bash
git switch main
git merge feature-nueva-funcionalidad
```

### 3.2 Three-Way Merge
Ambas ramas tienen cambios. Git crea un nuevo commit de fusión.

```bash
git switch main
git merge feature-rama
```

### 3.3 Conflictos de Fusión
Ocurren cuando ambas ramas modifican las mismas líneas de un archivo.

**Resolución manual**:
1. Git marcará el archivo con conflictos
2. Editar el archivo y decidir qué cambios mantener
3. `git add archivo` para marcar como resuelto
4. `git commit` para finalizar la fusión

---

## 4. Rebase (Alternativa a Merge)

### 4.1 ¿Qué es Rebase?
Mueve o combina una secuencia de commits a una nueva confirmación base.

```bash
git switch feature-rama
git rebase main
```

### 4.2 Diferencias Merge vs Rebase
- **Merge**: Crea un commit de fusión, preserva historial
- **Rebase**: Reescribe historial, más limpio pero peligroso en ramas compartidas

**Regla de oro**: Nunca hagas rebase de una rama que otros estén usando.

---

## 5. Flujo de Trabajo con Ramas

### 5.1 Git Flow (Tradicional)
- `main`: Producción estable
- `develop`: Integración de funcionalidades
- `feature/*`: Nuevas funcionalidades
- `release/*`: Preparación de versiones
- `hotfix/*`: Correcciones urgentes en producción

### 5.2 GitHub Flow (Simplificado)
- `main`: Siempre desplegable
- Ramas cortas para funcionalidades
- Pull Requests para revisión
- Fusionar rápido a `main`

---

## 6. Ejemplo Práctico

```bash
# 1. Crear rama para nueva funcionalidad
git switch -c feature-login

# 2. Hacer cambios y commits
echo "Login module" > login.txt
git add login.txt
git commit -m "Add login module"

# 3. Volver a main y fusionar
git switch main
git merge feature-login

# 4. Eliminar rama ya fusionada
git branch -d feature-login
```

---

## 7. Recursos de Aprendizaje
- Documentación: git-scm.com/docs
- Práctica: Crear repo de prueba y experimentar con ramas
- Visualización: learngitbranching.js.org
