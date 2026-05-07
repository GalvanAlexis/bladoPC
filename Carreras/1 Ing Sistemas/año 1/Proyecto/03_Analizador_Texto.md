# Proyecto: Analizador de Texto (Text Analyzer)

## Descripcion
Aplicacion de consola que realiza análisis básico de texto: conteo de palabras, frecuencia de terminos, busqueda de patrones y estadisticas básicas.

---

## Stack Tecnologico
- **Lenguaje**: Python 3.x
- **Bibliotecas**: `re` (regex), `collections` (Counter)
- **Algoritmos**: Busquedas simples, arreglos
- **Control de Versiones**: Git, GitHub
- **Editor**: VS Code

---

## Objetivos de Aprendizaje
- [ ] Aplicar **Introduccion a la Programacion**: Logica, variables, estructuras de control
- [ ] Usar **Algoritmos y Estructuras Básicas**: Ciclos, arreglos, busquedas simples
- [ ] Estructurar código en **Funciones** (separar logica)
- [ ] Uso de **Variables**, **Tipos de datos** (strings, listas, diccionarios)
- [ ] Uso de **Condicionales** para validaciones
- [ ] Control de versiones: `git init`, `commit`, `push` a GitHub

---

## Estructura Sugerida del Codigo

### Funciones Principales
```python
import re
from collections import Counter

def leer_archivo(ruta):
    """Lee un archivo de texto y retorna su contenido."""
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Error: Archivo no encontrado."

def contar_palabras(texto):
    """Retorna el numero total de palabras."""
    palabras = texto.split()
    return len(palabras)

def frecuencia_palabras(texto, top_n=10):
    """Retorna las N palabras mas frecuentes."""
    # Limpiar texto: minusculas y solo letras
    palabras = re.findall(r'\b[a-záéíóúñ]+\b', texto.lower())
    contador = Counter(palabras)
    return contador.most_common(top_n)

def buscar_patron(texto, patron):
    """Busca un patron regex y retorna coincidencias."""
    coincidencias = re.findall(patron, texto, re.IGNORECASE)
    return coincidencias

def estadisticas_basicas(texto):
    """Calcula estadisticas del texto."""
    palabras = texto.split()
    oraciones = re.split(r'[.!?]+', texto)
    
    return {
        'caracteres': len(texto),
        'palabras': len(palabras),
        'oraciones': len([o for o in oraciones if o.strip()]),
        'promedio_palabras_x_oracion': len(palabras) / max(len(oraciones), 1)
    }

def main():
    print("=== Analizador de Texto ===")
    
    # Opcion 1: Texto directo
    texto = input("Ingresa un texto o ruta de archivo: ")
    
    # Verificar si es archivo
    import os
    if os.path.exists(texto):
        texto = leer_archivo(texto)
        if "Error" in texto:
            print(texto)
            return
    
    print(f"\n1. Conteo de palabras: {contar_palabras(texto)}")
    
    print("\n2. Top 5 palabras mas frecuentes:")
    for palabra, freq in frecuencia_palabras(texto, 5):
        print(f"   {palabra}: {freq} veces")
    
    patron = input("\n3. Ingresa un patron a buscar (regex): ")
    coincidencias = buscar_patron(texto, patron)
    print(f"   Coincidencias: {len(coincidencias)}")
    if coincidencias:
        print(f"   Ejemplos: {coincidencias[:3]}")
    
    print("\n4. Estadisticas:")
    stats = estadisticas_basicas(texto)
    for key, value in stats.items():
        print(f"   {key}: {value}")

if __name__ == "__main__":
    main()
```

---

## Ejemplos de Uso

### Analisis de un texto
```
=== Analizador de Texto ===
Ingresa un texto o ruta de archivo: Hola mundo, hola Python. El mundo de Python es genial.

1. Conteo de palabras: 10
2. Top 5 palabras mas frecuentes:
   hola: 2 veces
   python: 2 veces
   mundo: 2 veces
   el: 1 vez
   de: 1 vez
```

### Uso de Regex (Busqueda)
```
Ingresa un patron a buscar (regex): \b[A-Z][a-z]+\b
Coincidencias: 0 (ninguna mayuscula en el ejemplo)
```

---

## Criterios de Aceptacion
1. **Funciones**: Cada funcionalidad implementada como funcion separada
2. **Estructuras**: Uso correcto de listas, diccionarios y bucles
3. **Regex**: Uso de `re` para busquedas de patrones
4. **Validacion**: Manejo de archivos inexistentes
5. **Git**: Repositorio en GitHub con mínimo 4 commits

---

## Recursos de Apoyo
- **Python re Module**: https://docs.python.org/3/library/re.html
- **Collections Counter**: https://docs.python.org/3/library/collections.html#collections.Counter
- **Regex Tester**: https://regex101.com/

---

## Pasos Sugeridos de Implementacion
1. Crear funcion `contar_palabras()` y probar con texto fijo
2. Agregar `frecuencia_palabras()` usando `Counter`
3. Implementar `buscar_patron()` con expresiones regulares
4. Crear `estadisticas_basicas()` para metricas adicionales
5. Agregar lectura de archivos con manejo de errores
6. Hacer commits en Git por cada funcionalidad nueva
