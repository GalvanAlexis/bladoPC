# Proyecto: Generador de Documentación Técnica

## 📋 Descripción
Herramienta de consola que genera documentación técnica básica en formato Markdown. Permite crear reportes, README templates y documentación de funciones a partir de entradas del usuario.

---

## 🛠️ Stack Tecnológico
- **Lenguaje**: Python 3.x
- **Formato**: Markdown
- **POO Básico**: Clases para estructurar documentos
- **Control de Versiones**: Git, GitHub
- **Editor**: VS Code
- **Metodología**: Comunicación Oral y Escrita (redacción técnica)

---

## 🎯 Objetivos de Aprendizaje
- [ ] Aplicar **Comunicación Oral y Escrita**: Redacción técnica, formato Markdown
- [ ] Aplicar **Metodología de Investigación**: Estructura de documentos técnicos
- [ ] Estructurar código en **Funciones** y **POO básico** (clase `Documento`)
- [ ] Uso de **Variables**, **Tipos de datos** (strings, listas)
- [ ] Uso de **Ciclos** para generar secciones repetitivas
- [ ] Control de versiones: `git init`, `commit`, `push` a GitHub

---

## 💻 Estructura Sugerida del Código

### Clase `DocumentoMarkdown`
```python
class DocumentoMarkdown:
    def __init__(self, titulo):
        self.titulo = titulo
        self.secciones = []
        self.autor = ""
        self.fecha = ""
    
    def agregar_metadatos(self, autor, fecha):
        """Agrega metadatos al documento."""
        self.autor = autor
        self.fecha = fecha
    
    def agregar_seccion(self, titulo_seccion, contenido):
        """Agrega una sección al documento."""
        self.secciones.append({
            'titulo': titulo_seccion,
            'contenido': contenido
        })
    
    def generar_markdown(self):
        """Genera el texto en formato Markdown."""
        md = []
        
        # Encabezado
        md.append(f"# {self.titulo}\n")
        
        if self.autor:
            md.append(f"**Autor:** {self.autor}")
        if self.fecha:
            md.append(f"**Fecha:** {self.fecha}")
        
        md.append("\n---\n")
        
        # Secciones
        for i, sec in enumerate(self.secciones, 1):
            md.append(f"## {i}. {sec['titulo']}\n")
            md.append(f"{sec['contenido']}\n")
        
        return "\n".join(md)
    
    def guardar_archivo(self, nombre_archivo="documentacion.md"):
        """Guarda el documento en un archivo .md"""
        contenido = self.generar_markdown()
        try:
            with open(nombre_archivo, 'w', encoding='utf-8') as f:
                f.write(contenido)
            print(f"Documento guardado como: {nombre_archivo}")
        except IOError as e:
            print(f"Error al guardar: {e}")

# Funciones auxiliares
def generar_readme(nombre_proyecto):
    """Genera un README.md básico para un proyecto."""
    doc = DocumentoMarkdown(f"Proyecto: {nombre_proyecto}")
    doc.agregar_metadatos("Blado", "2026-05-06")
    
    doc.agregar_seccion("Descripción", 
        "Breve descripción del proyecto y sus objetivos.")
    
    doc.agregar_seccion("Tecnologías", 
        "- Python 3.x\n- Git\n- VS Code")
    
    doc.agregar_seccion("Instalación", 
        "```bash\npip install -r requirements.txt\n```")
    
    doc.agregar_seccion("Uso", 
        "```python\npython main.py\n```")
    
    return doc

# main.py
def main():
    print("=== Generador de Documentación Técnica ===")
    
    print("\n1. README para proyecto")
    print("2. Documentación de función")
    print("3. Reporte personalizado")
    
    opcion = input("Elige una opción (1-3): ")
    
    if opcion == '1':
        nombre = input("Nombre del proyecto: ")
        doc = generar_readme(nombre)
        doc.guardar_archivo("README.md")
    
    elif opcion == '2':
        doc = DocumentoMarkdown("Documentación de Función")
        nombre_func = input("Nombre de la función: ")
        descripcion = input("Descripción: ")
        parametros = input("Parámetros (separados por coma): ")
        
        contenido = f"### {nombre_func}\n\n{descripcion}\n\n**Parámetros:** {parametros}"
        doc.agregar_seccion(nombre_func, contenido)
        doc.guardar_archivo(f"{nombre_func}.md")
    
    elif opcion == '3':
        doc = DocumentoMarkdown(input("Título del reporte: "))
        doc.agregar_metadatos(input("Autor: "), input("Fecha: "))
        
        while True:
            titulo = input("Título de sección (vacío para terminar): ")
            if not titulo:
                break
            contenido = input(f"Contenido de '{titulo}': ")
            doc.agregar_seccion(titulo, contenido)
        
        doc.guardar_archivo("reporte_personalizado.md")

if __name__ == "__main__":
    main()
```

---

## 📝 Ejemplo de Salida (README.md)
```markdown
# Proyecto: Mi Primera App

**Autor:** Blado
**Fecha:** 2026-05-06

---

## 1. Descripción

Breve descripción del proyecto y sus objetivos.

## 2. Tecnologías

- Python 3.x
- Git
- VS Code

## 3. Instalación

```bash
pip install -r requirements.txt
```

## 4. Uso

```python
python main.py
```
```

---

## ✅ Criterios de Aceptación
1. **POO**: Clase `DocumentoMarkdown` con métodos para agregar y guardar
2. **Markdown**: Generación correcta de headers, listas y bloques de código
3. **Funcionalidad**: Mínimo 3 tipos de documentos generados
4. **Validación**: Manejo de errores al escribir archivos
5. **Git**: Repositorio en GitHub con mínimo 3 commits

---

## 📚 Recursos de Apoyo
- **Markdown Guide**: https://www.markdownguide.org/
- **Python File I/O**: https://docs.python.org/3/tutorial/inputoutput.html
- **Technical Writing**: Revisar carpeta `Tecnologias/`

---

## 🚀 Pasos Sugeridos de Implementación
1. Crear la clase `DocumentoMarkdown` con su estructura básica
2. Implementar `generar_markdown()` con formato limpio
3. Agregar función `generar_readme()` con template predefinido
4. Crear el menú interactivo en `main.py`
5. Probar generando diferentes tipos de documentos
6. Hacer commits en Git por cada funcionalidad
