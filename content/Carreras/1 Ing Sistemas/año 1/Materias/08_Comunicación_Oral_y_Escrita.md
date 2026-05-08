# Comunicación Oral y Escrita: Redacción Técnica, Presentaciones

## La Importancia de la Comunicación en Ingeniería

Un ingeniero no solo escribe código o diseña sistemas; debe **comunicar** qué hizo, por qué y cómo funciona. La habilidad de explicar conceptos complejos de forma simple es lo que distingue a un buen ingeniero de uno mediocre.

*   **Redacción Técnica:** Documentación de código, informes de errores, manuales de usuario, propuestas técnicas.
*   **Comunicación Oral:** Defensas de proyectos, reuniones de equipo, presentaciones ejecutivas.

---

## Redacción Técnica (Technical Writing)

El objetivo es transmitir información técnica de manera **clara, concisa y precisa**.

### Principios de la Redacción Técnica
1.  **Claridad (Clarity):** Usa frases directas. Evita la jerga innecesaria o explica términos complejos.
    *   *Mal:* "Se implementó una solución de alta disponibilidad utilizando contenedores."
    *   *Bien:* "Usamos Docker para asegurar que la aplicación no se caiga."
2.  **Concisión (Conciseness):** Elimina palabras innecesarias ("en realidad", "básicamente", "muy").
    *   *Mal:* "Debido al hecho de que el servidor se apagó, el sistema falló."
    *   *Bien:* "El sistema falló porque el servidor se apagó."
3.  **Precisión (Accuracy):** Los datos, versiones de software y comandos deben ser exactos.
4.  **Estructura:** Usa encabezados (H1, H2), listas con viñetas y tablas para facilitar la lectura.

### Componentes de un Informe Técnico
*   **Resumen Ejecutivo:** Lo más importante en 3 párrafos.
*   **Introducción:** Contexto y objetivos.
*   **Desarrollo:** Pasos seguidos, diagramas, fragmentos de código.
*   **Conclusiones:** Qué se logró y próximos pasos.

---

## Markdown: El Lenguaje de la Documentación Moderna

**Markdown** es un lenguaje de marcado ligero que permite dar formato a texto plano usando caracteres simples. Es el estándar para `README.md`, documentación en GitHub/GitLab y notas técnicas.

### Sintaxis Básica y Avanzada

| Elemento | Sintaxis Markdown | Resultado Visual |
|---------|-------------------|-------------------|
| **Encabezados** | `# H1`, `## H2`, `### H3` | Títulos de distintos tamaños |
| **Negrita** | `**texto**` | **texto** |
| **Cursiva** | `*texto*` o `_texto_` | *texto* |
| **Lista viñetas** | `- item` o `* item` | • item |
| **Lista numerada** | `1. item` | 1. item |
| **Enlace** | `[texto](url)` | [texto](url) |
| **Imagen** | `![alt](url_imagen)` | Muestra la imagen |
| **Bloque de código** | `` `codigo` `` (comillas invertidas) | `codigo` (en línea) |
| **Bloque de código extenso** | ` ```lenguaje ... ``` ` | Bloque resaltado según lenguaje |
| **Cita (Blockquote)** | `> Texto de cita` | > Texto de cita (sangrado) |
| **Tablas** | `\| Col1 \| Col2 \|` (usar guiones y pipes) | Tabla formateada |
| **Regla horizontal** | `---` o `***` | Línea divisoria |

### Ejemplo Práctico de un `README.md`
````markdown
# Proyecto: Simulador de Sistema Solar

## Descripción
Este proyecto simula las órbitas planetarias usando **Python** y `matplotlib`.

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/solar-system.git
   ```
2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## Uso
Ejecutar el script principal:
```python
python main.py --speed fast
```

## Resultados
Se observó que la órbita de Marte es elíptica [^1].

[^1]: Datos obtenidos de la NASA, 2023.
````

---

## Diseño de Presentaciones (PowerPoint / Slideware)

Una mala presentación puede arruinar un gran proyecto. Las diapositivas son **apoyos visuales**, no un guión de teleprompter.

### Regla 10-20-30 (Guy Kawasaki)
*   **10:** Máximo 10 diapositivas.
*   **20:** Máximo 20 minutos de presentación.
*   **30:** Letra mínimo de 30 puntos (para que se lea de lejos).

### Principios de Diseño Visual
1.  **Menos es Más (Minimalism):** Una diapositiva = Una idea. Evita el "wall of text" (muro de texto).
2.  **Jerarquía Visual:** Lo más importante debe ser lo más grande o estar en el centro.
3.  **Contraste:** Texto oscuro sobre fondo claro (o viceversa). Nunca amarillo sobre blanco.
4.  **Consistencia:** Usa la misma fuente y esquema de colores en todas las diapositivas.

### Estructura de una Presentación Técnica (The Hook)
1.  **Título + Problema:** "Hoy vamos a solucionar X problema que afecta a Y personas."
2.  **Agenda:** "Hablaré sobre la arquitectura, el stack tecnológico y los resultados."
3.  **Desarrollo:** Diagramas, gráficos de barras, fragmentos de código (pocos).
4.  **Demo (Si es posible):** "Miren, esto funciona en vivo."
5.  **Q&A (Preguntas y Respuestas):** Espacio para la audiencia.

### Tips para PowerPoint / Google Slides
*   **Fuentes:** Usa fuentes sans-serif modernas (Arial, Helvetica, Roboto, Open Sans) para legibilidad.
*   **Imágenes:** Usa imágenes de alta resolución. Herramientas: Unsplash, Pexels.
*   **Gráficos:** No pegues tablas de Excel con 50 filas. Haz un gráfico de pastel o barras que resuma la idea.

---

## Comunicación Oral: El Arte de Hablar

### Preparación
*   **Conoce a tu audiencia:** ¿Son desarrolladores (habla técnico)? ¿Son ejecutivos (habla de negocio/ROI)?
*   **Ensayo:** Practica en voz alta. Cronometra tu tiempo.

### Durante la Presentación
1.  **Contacto Visual:** Mira a la audiencia, no al proyector ni a tus notas todo el tiempo.
2.  **Lenguaje Corporal:** Párate derecho, usa las manos para enfatizar.
3.  **Voz:** Varía el tono y el volumen. No hables monótono.
4.  **Manejo del Nerviosismo:** Respira profundo. Empieza con una anécdota o una pregunta a la audiencia.

### Manejo de Preguntas (Q&A)
*   **Escucha activa:** No interrumpas.
*   **Si no sabes:** "Es una excelente pregunta, no tengo el dato exacto ahora, pero consultaré y te respondo por correo."
*   **Sé breve:** No te extiendas más de 1-2 minutos por respuesta.

---

## Recursos Recomendados

### Libros
*   **"The Elements of Style"** - Strunk & White (La biblia de la escritura en inglés, aplica para redacción lógica).
*   **"Slide:ology"** - Nancy Duarte (Diseño de presentaciones que impactan).
*   **"Technical Communication"** - Mike Markel (Manual académico completo).

### Herramientas
*   **Markdown Editors:** Typora, Obsidian, VS Code (con preview).
*   **PowerPoint Alternatives:** reveal.js (presentaciones en HTML/JS), Google Slides.

### Tutoriales
*   **CommonMark Tutorial:** https://commonmark.org/help/tutorial/
*   **Canva Design School:** Para aprender principios de diseño visual básicos.
*   **TED Talks:** Observa cómo los expertos comunican ideas complejas en 18 minutos.
