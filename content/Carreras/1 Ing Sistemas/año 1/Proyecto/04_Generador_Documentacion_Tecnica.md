# Proyecto: Generador de Documentacion Tecnica

## Descripcion
Herramienta de consola que genera documentacion tecnica basica en formato Markdown. Permite crear reportes, README templates y documentacion de funciones a partir de entradas del usuario.

---

## Stack Tecnologico
- **Lenguaje**: Python 3.x
- **Formato**: Markdown
- **POO Basico**: Clases para estructurar documentos
- **Control de Versiones**: Git, GitHub
- **Editor**: VS Code
- **Metodologia**: Comunicacion Oral y Escrita (redaccion tecnica)

---

## Objetivos de Aprendizaje
- [ ] Aplicar **Comunicacion Oral y Escrita**: Redaccion tecnica, formato Markdown
- [ ] Aplicar **Metodologia de Investigacion**: Estructura de documentos tecnico
- [ ] Estructurar código en **Funciones** y **POO basico** (clase `Documento`)
- [ ] Uso de **Variables**, **Tipos de datos** (strings, listas)
- [ ] Uso de **Ciclos** para generar secciones repetitivas
- [ ] Control de versiones: `git init`, `commit`, `push` a GitHub

---

## Estructura Sugerida del Codigo

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
        """Agrega una seccion al documento."""
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
    """Genera un README.md basco para un proyecto."""
    doc = DocumentoMarkdown(f"Proyecto: {nombre_proyecto}")
    doc.agregar_metadatos("Blado", "2026-05-06")
    
    doc.agregar_seccion("Descripcion", 
        "Breve descripcion del proyecto y sus objetivos.")
    
    doc.agregar_seccion("Tecnologias", 
        "- Python 3.x\n- Git\n- VS Code")
    
    doc.agregar_seccion("Instalacion", 
        "```bash\npip install -r requirements.txt\n```")
    
    doc.agregar_seccion("Uso", 
        "```python\npython main.py\n```")
    
    return doc

# main.py
def main():
    print("=== Generador de Documentacion Tecnica ===")
    
    print("\n1. README para proyecto")
    print("2. Documentacion de funcion")
    print("3. Reporte personalizado")
    
    opcion = input("Elige una opcion (1-3): ")
    
    if opcion == '1':
        nombre = input("Nombre del proyecto: ")
        doc = generar_readme(nombre)
        doc.guardar_archivo("README.md")
    
    elif opcion == '2':
        doc = DocumentoMarkdown("Documentacion de Funcion")
        nombre_func = input("Nombre de la funcion: ")
        descripcion = input("Descripcion: ")
        parametros = input("Parametros (separados por coma): ")
        
        contenido = f"### {nombre_func}\n\n{descripcion}\n\n**Parametros:** {parametros}"
        doc.agregar_seccion(nombre_func, contenido)
        doc.guardar_archivo(f"{nombre_func}.md")
    
    elif opcion == '3':
        doc = DocumentoMarkdown(input("Titulo del reporte: "))
        doc.agregar_metadatos(input("Autor: "), input("Fecha: "))
        
        while True:
            titulo = input("Titulo de seccion (vacio para terminar): ")
            if not titulo:
                break
            contenido = input(f"Contenido de '{titulo}': ")
            doc.agregar_seccion(titulo, contenido)
        
        doc.guardar_archivo("reporte_personalizado.md")

if __name__ == "__main__":
    main()
```

---

## Ejemplo de Salida (README.md)
```markdown
# Proyecto: Mi Primera App#

**Autor:** Blado
**Fecha:** 2026-05-06

---

## 1. Descripcion

Breve descripcion del proyecto y sus objetivos.

## 2. Tecnologias#

- Python 3.x
- Git
- VS Code

## 3. Instalacion#

```bash
pip install -r requirements.txt#
```

## 4. Uso#

```python
python main.py#
```
```

---

## Criterios de Aceptacion
1. **POO**: Clase `DocumentoMarkdown` con metodos para agregar y guardar
2. **Markdown**: Generacion correcta de headers, listas y bloques de codigo
3. **Funcionalidad**: Mínimo 3 tipos de documentos generados
4. **Validacion**: Manejo de errores al escribir archivos
5. **Git**: Repositorio en GitHub con mínimo 3 commits

---

## Recursos de Apoyo
- **Markdown Guide**: https://www.markdownguide.org/
- **Python File I/O**: https://docs.python.org/3/tutorial/inputoutput.html
- **Technical Writing**: Revisar carpeta `Tecnologias/`

---

## Pasos Sugeridos de Implementacion
1. Crear la clase `DocumentoMarkdown` con su estructura basica
2. Implementar `generar_markdown()` con formato limpio
3. Agregar funcion `generar_readme()` con template predefinido
4. Crear el menu interactivo en `main.py`
5. Probar generando diferentes tipos de documentos
6. Hacer commits en Git por cada funcionalidad
