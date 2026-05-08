# VS Code: Editor de Código Fuente

## ¿Qué es Visual Studio Code (VS Code)?

**VS Code** es un editor de código fuente ligero pero potente desarrollado por **Microsoft**. Es gratuito, de código abierto y se ejecuta en Windows, macOS y Linux. A diferencia de un IDE completo (como PyCharm o Eclipse), VS Code es un editor "híbrido": es rápido como un editor simple pero extensible para ser tan potente como un IDE.

### Características Clave
1.  **IntelliSense:** Autocompletado inteligente que no solo sugiere nombres, sino que muestra documentación emergente (tooltips) y información de parámetros.
2.  **Depuración Integrada (Debugging):** Puntos de interrupción (breakpoints), inspección de variables y pilas de llamadas (call stack) sin salir del editor.
3.  **Git Integrado:** Ver diferencias (diff), hacer commits y push directamente desde la interfaz.
4.  **Terminal Integrada:** Acceso a la línea de comandos (Bash, PowerShell, CMD) dentro del editor.
5.  **Marketplace de Extensiones:** Miles de extensiones para añadir soporte de lenguajes, temas y herramientas.

---

## Instalación y Configuración Inicial

### Descarga e Instalación
1.  Ir a [https://code.visualstudio.com/](https://code.visualstudio.com/).
2.  Descargar la versión estable para tu SO (Windows).
3.  Durante la instalación en Windows, **marca la casilla "Add to PATH"** (Añadir a la ruta del sistema). Esto permite abrir VS Code desde la terminal escribiendo `code .`.
4.  **Checklist de instalación recomendada:**
    *   [ ] Crear acceso directo en el escritorio.
    *   [ ] Añadir la acción "Open with Code" al menú contextual de Windows Explorer (clic derecho).

### Primer Inicio: "Get Started"
Al abrirlo por primera vez, verás la página de "Get Started".
*   **Tema (Theme):** Ve a `File > Preferences > Color Theme` (o `Ctrl+K Ctrl+T`). Recomendado: *Dark+ (default dark)* para reducir fatiga visual.
*   **Tamaño de Fuente:** `File > Preferences > Settings` > buscar "font size" > cambiar a `14` o `16`.

---

## Interfaz de Usuario (UI)

| Componente | Descripción | Atajo Rápido |
|------------|-------------|---------------|
| **Explorer (Explorador)** | Árbol de archivos del proyecto. | `Ctrl+Shift+E` |
| **Editor Group** | Donde escribes el código. Puedes dividirlo en varias columnas. | `Ctrl+\` (Dividir) |
| **Side Bar (Barra Lateral)** | Donde están el Explorer, Extensiones, etc. | `Ctrl+B` (Mostrar/Ocultar) |
| **Status Bar (Barra de Estado)** | Inferior. Muestra el branch de Git, errores, espacios vs tabs. | N/A |
| **Terminal** | Consola integrada abajo. | `` Ctrl+` `` |
| **Command Palette** | **¡Lo más importante!** Busca cualquier comando de VS Code. | `Ctrl+Shift+P` |

### El "Command Palette" (`Ctrl+Shift+P`)
En lugar de buscar en menús, aprende a usar esto. Ejemplos:
*   Escribe `>color theme` para cambiar colores.
*   Escribe `>format document` para formatear el código.
*   Escribe `>git` para ver comandos de Git.

---

## Extensiones Recomendadas (El poder de VS Code)

Debemos instalar extensiones para que VS Code "entienda" Python y otras herramientas.

### Cómo instalar:
1.  Haz clic en el icono de **Cuadritos (Extensions)** en la barra lateral izquierda (o `Ctrl+Shift+X`).
2.  Escribe el nombre de la extensión y dale clic a "Install".

### Lista de "Must-Have" para Año 1:

1.  **Python (Microsoft):**
    *   La extensión oficial. Proporciona IntelliSense, linting (chequeo de errores), debugging y soporte para Jupyter Notebooks.
    *   **Importante:** Después de instalarla, debes seleccionar el intérprete de Python. `Ctrl+Shift+P` > `Python: Select Interpreter` > Selecciona tu instalación de Python 3.x.

2.  **Pylance:**
    *   Motor de lenguaje moderno para Python. Mejora la precisión de los tipos y autocompletado. (A veces viene con la extensión de Python).

3.  **GitLens:**
    *   Superpone información de Git en el código (quién escribió esa línea y cuándo).

4.  **Live Server (para HTML/CSS):**
    *   Si tocas desarrollo web, inicia un servidor local con recarga en vivo.

5.  **Prettier / Black Formatter:**
    *   Formatea tu código automáticamente al guardar para que se vea limpio.

---

## Edición de Código y Atajos

### Atajos Esenciales (Productividad)
| Atajo | Acción | Descripción |
|--------|--------|-------------|
| `Ctrl+C` | Copy | Copiar línea. |
| `Ctrl+X` | Cut | Cortar línea. |
| `Ctrl+V` | Paste | Pegar. |
| `Ctrl+Z` | Undo | Deshacer. |
| `Ctrl+Shift+Z` | Redo | Rehacer. |
| `Ctrl+S` | Save | Guardar archivo. |
| `Ctrl+F` | Find | Buscar en el archivo. |
| `Ctrl+H` | Replace | Buscar y reemplazar. |
| `Ctrl+G` | Go to Line | Ir a una línea específica. |
| `Ctrl+/` | Toggle Line Comment | Comentar/Descomentar línea. |
| `Shift+Alt+F` | Format Document | Formatear todo el documento. |
| `F12` | Go to Definition | Ir a la definición de una función/clase. |
| `Ctrl+K Ctrl+C` | Add Block Comment | Comentar bloque seleccionado. |

### Multi-Cursor (Selección Múltiple)
Mantén presionado `Alt` y haz clic en varios lugares del código. Ahora puedes escribir en todos a la vez. Útil para renombrar variables rápido.

---

## Depuración (Debugging)

VS Code tiene un Depurador gráfico integrado.

### Configuración (`launch.json`)
1.  Ve a la pestaña de **Run and Debug** (Icono de play con un bicho) o presiona `Ctrl+Shift+D`.
2.  Haz clic en "create a launch.json file".
3.  Selecciona "Python File". Esto creará una carpeta `.vscode` con la configuración.

### Uso Básico
1.  **Punto de Interrupción (Breakpoint):** Haz clic en el margen izquierdo (donde están los números de línea) para poner un punto rojo.
2.  Presiona `F5` para iniciar la depuración.
3.  El código se pausará en el breakpoint.
4.  **Controles:**
    *   `F10`: Step Over (Ejecuta la línea actual y pasa a la siguiente, sin entrar en funciones).
    *   `F11`: Step Into (Entra dentro de la función que estás ejecutando).
    *   `Shift+F11`: Step Out (Sale de la función actual).
5.  **Variables:** Mira el panel izquierdo para ver los valores actuales de tus variables.

---

## Integración con Git

Aunque usamos la terminal para comandos complejos, VS Code facilita lo básico:
1.  **Icono de Git (Branch):** En la barra lateral izquierda.
2.  **Staging:** Haz clic en el `+` (Stage) junto al archivo modificado en el panel "Changes".
3.  **Commit:** Escribe el mensaje en el cuadro de arriba y presiona el "✓" (Checkmark) o `Ctrl+Enter`.
4.  **Sync:** Botón de sincronización arriba a la derecha para hacer Push/Pull.

---

## Configuración Avanzada: `settings.json`

Si quieres personalizar al extremo, presiona `Ctrl+Shift+P` > `Preferences: Open Settings (JSON)`.

**Ejemplo de configuración útil para Python:**
```json
{
    "editor.fontSize": 14,
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.formatOnSave": true,  // Formatea automáticamente al guardar
    "python.linting.enabled": true,
    "python.linting.lintOnSave": true,
    "files.autoSave": "afterDelay", // Guardado automático
    "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

---

## Recursos Recomendados

### Documentación Oficial
*   **VS Code Docs:** [https://code.visualstudio.com/docs](https://code.visualstudio.com/docs)
*   **Python in VS Code:** [https://code.visualstudio.com/docs/languages/python](https://code.visualstudio.com/docs/languages/python)

### Tutoriales
*   **VS Code Crash Course (YouTube):** "Visual Studio Code Crash Course" by Traversy Media.
*   **Python Setup Tutorial:** "Python in VS Code" (Video oficial de Microsoft).

### Tips
*   **Zoom:** `Ctrl +` (acercar), `Ctrl -` (alejar).
*   **Comandos Integrados:** Escribe `>Terminal: Run Task` en el Command Palette para correr scripts personalizados.
