# Metodología de la Investigación: Técnicas de Investigación Académica

## ¿Qué es la Investigación?

La investigación es un proceso sistemático, organizado y objetivo, cuyo propósito es descubrir respuestas a preguntas mediante el uso de métodos científicos. En ingeniería, no basta con "sentir" que algo funciona; se debe demostrar con evidencia.

---

## Tipos de Investigación

### 1. Según su Objetivo
*   **Investigación Básica (Pura):** Busca generar nuevo conocimiento sin un fin práctico inmediato. Ejemplo: Estudiar nuevos algoritmos de compresión de datos.
*   **Investigación Aplicada:** Busca resolver problemas prácticos o específicos. Ejemplo: Desarrollar un sistema de riego automatizado para un cultivo.

### 2. Según su Enfoque (Metodología)
*   **Cuantitativa:** Se basa en la medición numérica y el análisis estadístico. (Hipótesis, variables, encuestas con números).
*   **Cualitativa:** Se basa en la observación y el significado subjetivo. (Entrevistas, grupos focales, análisis de texto).
*   **Mixta:** Combina ambas.

---

## Estructura de un Documento Académico (Tesis, Artículo, Proyecto)

Un documento técnico bien estructurado permite que otros entiendan y validen tu trabajo.

1.  **Portada:** Título (claro y específico), autor, fecha.
2.  **Resumen (Abstract):** Párrafo corto (150-250 palabras) que resume: Problema, Objetivo, Metodología y Resultados.
3.  **Introducción:** Contexto, justificación (¿Por qué es importante?), preguntas de investigación.
4.  **Marco Teórico:** Qué dicen otros estudios. Revisión de literatura.
5.  **Metodología:** Cómo se hizo. (Herramientas, materiales, pasos seguidos). Debe ser reproducible.
6.  **Resultados:** Datos obtenidos (gráficas, tablas). Sin interpretación aún.
7.  **Discusión:** Interpretación de los resultados. ¿Por qué pasó esto? ¿Confirma la hipótesis?
8.  **Conclusiones:** Lo que se aprendió y posibles trabajos futuros.
9.  **Referencias (Bibliografía):** Lista de todas las fuentes consultadas.

---

## Gestión de Referencias: Zotero

**Zotero** es un gestor de referencias bibliográficas gratuito y de código abierto. Permite recopilar, organizar y citar fuentes.

### Funcionalidades Clave
*   **Captura con un clic:** Si estás en una página web, en una base de datos o viendo un video de YouTube, Zotero detecta la referencia y la guarda.
*   **Organización:** Crear carpetas (colecciones) para cada proyecto.
*   **Etiquetas (Tags):** Añadir palabras clave para buscar rápido.
*   **Notas:** Escribir resúmenes o pensamientos sobre el documento.
*   **Generación de Bibliografía:** Con un clic, genera la lista de referencias en APA, IEEE, Chicago, etc.

### Integración con Procesadores de Texto
La extensión **Zotero Connector** (para navegador) y el **Zotero Word Plugin** (o LibreOffice) permiten insertar citas en el texto mientras escribes. Al final, actualizan automáticamente la bibliografía.

```markdown
# Ejemplo de flujo:
1. Encuentras un paper: "Deep Learning for Time Series Forecasting".
2. Das clic en el botón de Zotero en el navegador.
3. Se guarda en tu biblioteca: Autor, Año, Título, DOI.
4. En tu documento en Word, das clic en "Add/Edit Citation".
5. Buscas el paper y lo insertas: (Smith, 2023).
6. Al final, das clic en "Add Bibliography" y ¡listo!
```

---

## Escritura Profesional: LaTeX

**LaTeX** (pronunciado "Látej") no es un procesador de palabras como Word; es un lenguaje de marcado para la preparación de documentos técnicos y científicos. Es el estándar en matemáticas, física e ingeniería.

### ¿Por qué LaTeX sobre Word?
1.  **Manejo de Fórmulas:** LaTeX es superior para ecuaciones complejas (matrices, integrales).
2.  **Tipografía:** Usa algoritmos de diseño profesional (Computer Modern) que lucen mucho mejor que las fuentes básicas de Word.
3.  **Referencias Cruzadas:** Numeración automática de figuras, tablas, ecuaciones y secciones. Si insertas una nueva figura en el medio, ¡todos los números se reordenan solos!
4.  **Estabilidad:** Los archivos `.tex` son archivos de texto plano. No se corrompen como los `.docx`.

### Estructura Básica de un Documento LaTeX
Se escribe en un archivo `.tex` y se compila (usualmente a PDF).

```latex
% Preambulo: Configuración del documento
\documentclass[11pt, a4paper]{article} % Tipo de documento
\usepackage[utf8]{inputenc}       % Soporte de acentos
\usepackage{amsmath}              % Paquete para matemáticas

\title{Mi Primer Documento en LaTeX}
\author{Tu Nombre}
\date{\today}

% Cuerpo del documento
\begin{document}

\maketitle                  % Genera el título

\begin{abstract}
Este es un resumen corto de mi investigación.
\end{abstract}

\section{Introducción}
La investigación es importante \cite{smith2023}. Vamos a ver una ecuación:

\begin{equation} % Entorno para ecuaciones numeradas
    E = mc^2 \label{eq:einstein} % \label permite referenciar luego
\end{equation}

Como vimos en la ecuación \ref{eq:einstein}, la energía es...

\section{Metodología}
Usamos Python para el análisis.

\begin{thebibliography}{9} % Inicio de bibliografía manual
\bibitem{smith2023} 
Smith, J. (2023). \textit{Deep Learning Basics}. Editorial Científica.
\end{thebibliography}

\end{document}
```

### Comandos Comunes LaTeX
*   `\section{Título}`: Crea una sección numerada.
*   `\subsection{Título}`: Subsección.
*   `\textbf{texto}`: Negrita.
*   `\textit{texto}`: Cursiva.
*   `\begin{itemize} \item Punto 1 \end{itemize}`: Lista con viñetas.
*   `$ f(x) = x^2 $`: Modo matemático en línea (inline).
*   `$$ f(x) = x^2 $$`: Ecuación centrada (display mode).

---

## Recursos Recomendados

### Libros
*   **"LaTeX: A Document Preparation System"** - Leslie Lamport (El creador de LaTeX).
*   **"The Chicago Manual of Style"** - Para normas de redacción (útil para cualquier tema).

### Herramientas
*   **Overleaf:** Editor de LaTeX en la nube (colaborativo, fácil para empezar). https://www.overleaf.com/
*   **Zotero:** https://www.zotero.org/
*   **Better BibTeX (Plugin):** Para exportar referencias de Zotero a formato `.bib` para LaTeX automáticamente.

### Tutoriales
*   **Overleaf Learn:** https://www.overleaf.com/learn
*   **Zotero Quick Start Guide:** https://www.zotero.org/support/quick_start_guide
