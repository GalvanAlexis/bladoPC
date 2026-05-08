# Condicionales: Estructuras de Selección en Python

Las **condicionales** (o estructuras de selección) permiten que un programa tome decisiones: ejecutar un bloque de código si una condición es verdadera, y otro si es falsa.

---

## 1. La Sentencia `if` (Si)

Es la forma más básica. Ejecuta código **solo si** la condición es `True`.

### Sintaxis
```python
if condicion:
    # Bloque de código (indentado, usualmente 4 espacios)
    print("La condición es verdadera")
```

### Ejemplo Práctico
```python
temperatura = 30

if temperatura > 25:
    print("Hace calor")  # Esto se imprime porque 30 > 25
```

---

## 2. La Sentencia `if-else` (Si - Sino)

Ejecuta un bloque si es `True` y **otro bloque distinto** si es `False`.

### Sintaxis
```python
if condicion:
    # Bloque True
else:
    # Bloque False
```

### Ejemplo Práctico
```python
nota = 45

if nota >= 60:
    print("Aprobado")
else:
    print("Reprobado")  # Esto se imprime porque 45 < 60
```

---

## 3. La Sentencia `if-elif-else` (Si - Sino Si - Sino)

Permite evaluar **múltiples condiciones** en orden. Python se detiene en la **primera** que sea verdadera.

### Sintaxis
```python
if condicion_1:
    # Bloque 1
elif condicion_2:
    # Bloque 2
elif condicion_3:
    # Bloque 3
else:
    # Bloque por defecto (si ninguna más pasó)
```

### Ejemplo Práctico (Calificaciones)
```python
nota = 85

if nota >= 90:
    print("Excelente (A)")
elif nota >= 80:
    print("Muy bien (B)")  # Esto se imprime
elif nota >= 70:
    print("Bien (C)")
else:
    print("Necesita mejorar")
```

**Nota:** El orden importa. Si pusieras `if nota >= 80` antes que `if nota >= 90`, una nota de 95 entraría en el bloque de 80 primero y nunca llegaría a 90.

---

## 4. Operadores de Comparación (Refresco)

Son la base de las condiciones.

| Operador | Significado | Ejemplo | Resultado |
|-----------|-------------|---------|----------|
| `==` | Igual a | `5 == 5` | `True` |
| `!=` | Diferente de | `5 != 3` | `True` |
| `>` | Mayor que | `10 > 2` | `True` |
| `<` | Menor que | `1 < 0` | `False` |
| `>=` | Mayor o igual | `5 >= 5` | `True` |
| `<=` | Menor o igual | `3 <= 1` | `False` |

---

## 5. Operadores Lógicos (Refresco)

Permiten combinar condiciones simples en complejas.

### `and` (Y)
**Ambas** deben ser verdaderas.
```python
edad = 25
tiene_licencia = True

if edad >= 18 and tiene_licencia:
    print("Puede conducir")  # Se cumple
```

### `or` (O)
**Al menos una** debe ser verdadera.
```python
es_finde = True
es_feriado = False

if es_finde or es_feriado:
    print("No hay clases")  # Se cumple porque es finde
```

### `not` (No)
Invierte el valor booleano.
```python
llueve = False

if not llueve:
    print("Puedes salir")  # Se cumple
```

### Tabla de Verdad (Lógica de Boole)
| A | B | A and B | A or B |
|---|---|---|---|
| True | True | True | True |
| True | False | False | True |
| False | True | False | True |
| False | False | False | False |

---

## 6. Evaluación de Corto Circuito (Short-circuiting)

Python es inteligente y optimiza las evaluaciones:
*   En `A and B`: Si `A` es `False`, Python no evalúa `B` (porque ya sabemos que el resultado es `False`).
*   En `A or B`: Si `A` es `True`, Python no evalúa `B` (porque ya sabemos que el resultado es `True`).

```python
def funcion_costosa():
    print("Función ejecutada")
    return True

# Como False es el primer valor, la función nunca se ejecuta:
if False and funcion_costosa():
    pass
```

---

## 7. Condicionales Anidados (Nested Ifs)

Puedes poner un `if` dentro de otro. Se usan cuando una decisión depende de la anterior.

```python
usuario = "admin"
clave = "1234"

if usuario == "admin":
    print("Usuario correcto...")
    if clave == "1234":
        print("Acceso Total Concedido")
    else:
        print("Clave incorrecta")
else:
    print("Usuario no encontrado")
```

**Indentación:** Cada nivel de anidación requiere 4 espacios más.
```text
if condicion_exterior:      # Nivel 0 (0 espacios)
    # Código nivel 1    # Nivel 1 (4 espacios)
    if condicion_interior:  # Nivel 1 (4 espacios)
        # Código nivel 2    # Nivel 2 (8 espacios)
```

---

## 8. Expresiones Condicionales Ternarias (One-liner)

Es una forma corta de escribir un `if-else` simple en una sola línea.

### Sintaxis
`valor_si_verdadero if condicion else valor_si_falso`

### Ejemplo
```python
edad = 20

# Forma larga
if edad >= 18:
    mensaje = "Mayor"
else:
    mensaje = "Menor"

# Forma corta (Ternaria)
mensaje = "Mayor" if edad >= 18 else "Menor"
print(mensaje)
```

---

## 9. Objetos como Booleanos (Truthy/Falsy)

En Python, casi cualquier objeto puede evaluarse en un contexto booleano.
*   **Falsy (Falso):** `None`, `False`, `0` (entero), `0.0` (float), `''` (cadena vacía), `[]` (lista vacía), `{}` (diccionario vacío).
*   **Truthy (Verdadero):** Todo lo demás.

```python
mi_lista = []

if mi_lista:
    print("La lista tiene elementos")
else:
    print("La lista está vacía")  # Esto se imprime
```

---

## 10. Errores Comunes

### 1. Usar `=` en lugar de `==`
```python
# ¡Error! = es asignación, == es comparación.
# if x = 5:  # SyntaxError
if x == 5:  # Correcto
    pass
```

### 2. Olvidar los dos puntos `:`
```python
# if x > 5  # SyntaxError: expected ':'
if x > 5:  # Correcto
    pass
```

### 3. Indentación inconsistente
```python
if True:
    print("Hola")
  print("Mundo")  # IndentationError: unindent does not match...
```

---

## Recursos Recomendados

### Documentación Oficial
*   **Control Flow:** https://docs.python.org/3/tutorial/controlflow.html

### Tutoriales
*   **Real Python - Conditional Statements:** https://realpython.com/python-conditional-statements/
*   **Corey Schafer (YouTube):** "If Statements" video.

### Ejercicios Prácticos
1.  Escribe un programa que determine si un número es par o impar (`num % 2 == 0`).
2.  Escribe un programa que determine si un año es bisiesto (divisible por 4, pero no por 100, a menos que sea divisible por 400).
3.  Simula un cajero automático: pide PIN, si es correcto pide monto a retirar, verifica si hay saldo.
