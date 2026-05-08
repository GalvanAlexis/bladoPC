# Arquitectura de Computadoras: CPU, Memoria, Ensamblador Básico (C, Simuladores)

Esta materia desglosa los componentes físicos de una computadora y cómo el software se comunica con ellos a bajo nivel.

---

## 1. Arquitectura de Von Neumann (Modelo Clásico)

Es el diseño básico de casi todas las computadoras modernas.

### Componentes:
1.  **Unidad de Procesamiento Central (CPU):** El "cerebro".
2.  **Memoria Principal (RAM):** Almacena datos e instrucciones.
3.  **Unidad de Entrada/Salida (E/S):** Periféricos.
4.  **Bus del Sistema:** "Cables" que conectan todo.

### Ciclo de Fetch-Decode-Execute (Búsqueda-Decodificación-Ejecución)
1.  **Fetch:** La CPU trae la siguiente instrucción de la memoria (RAM) usando el **PC (Program Counter)**.
2.  **Decode:** La unidad de control interpreta la instrucción.
3.  **Execute:** La ALU (Arithmetic Logic Unit) ejecuta la operación.
4.  **Writeback:** El resultado se guarda en un registro o memoria.

---

## 2. CPU (Central Processing Unit)

### Componentes Internos:
| Componente | Función |
|------------|----------|
| **Registros** | Memoria ultra-rápida DENTRO de la CPU (ej. EAX en x86, R0-R12 en ARM). |
| **ALU** | Realiza cálculos matemáticos y lógicos. |
| **Unidad de Control** | Dirige el flujo, decodifica instrucciones. |
| **PC (Program Counter)** | Contiene la dirección de memoria de la *siguiente* instrucción. |
| **SP (Stack Pointer)** | Apunta al tope de la pila (stack) del programa actual. |

### Jerarquía de Memoria (De más rápida a más lenta):
1.  **Registros** (CPU) - Instantáneo.
2.  **Caché L1/L2/L3** (Dentro de CPU) - Muy rápido.
3.  **RAM** (Memoria Principal) - Rápido.
4.  **SSD/HDD** (Almacenamiento) - Lento.

---

## 3. Representación de Datos (Binario, Hex)

La computadora solo entiende **1s y 0s**.

### Conversión Básica:
*   **Binario `1010` a Decimal:** (1*2³) + (0*2²) + (1*2¹) + (0*2⁰) = **10**.
*   **Hexadecimal (Base 16):** Usa dígitos `0-9` y letras `A-F`. Es más compacto que el binario.
    *   `0xFF` = `1111 1111` (255 en decimal).
    *   `0x1A` = `0001 1010` (26 en decimal).

### Tamaños de Datos:
| Tamaño | Nombre | Equivale a |
|--------|--------|-------------|
| 8 bits | 1 Byte | `char` en C |
| 16 bits | 2 Bytes | `short` en C |
| 32 bits | 4 Bytes | `int` en C (usualmente) |
| 64 bits | 8 Bytes | `long` o punteros en arquitecturas modernas |

---

## 4. Ensamblador Básico (NASM/YASM - x86_64)

El ensamblador es el lenguaje de más bajo nivel que un humano puede escribir (casi 1 a 1 con las instrucciones de la CPU).

### Registros Comunes (x86_64):
*   **RAX:** Acumulador (usado para retornos de funciones y operaciones).
*   **RBX:** Base (apuntador a datos).
*   **RCX:** Contador (usado en bucles).
*   **RDX:** Datos (usado en división).

### Sintaxis Básica (NASM):
```nasm
section .data
    msg db "Hola", 10 ; 10 es salto de línea (LF)

section .text
    global _start

_start:
    ; Escribir en consola (sys_write)
    mov rax, 1          ; Número de syscall (1 = write)
    mov rdi, 1          ; File descriptor (1 = stdout)
    lea rsi, [rel msg]   ; Dirección del mensaje
    mov rdx, 5          ; Longitud del mensaje
    syscall               ; Llamada al sistema

    ; Salir (sys_exit)
    mov rax, 60         ; 60 = exit
    xor rdi, rdi       ; Código de salida (0)
    syscall
```

### Compilación y Ejecución (Linux):
```bash
nasm -f elf64 hola.asm -o hola.o
ld hola.o -o hola
./hola
```

---

## 5. C Básico (Lenguaje de Sistemas)

C es un lenguaje de "alto nivel" comparado con ensamblador, pero permite manipular memoria directamente.

### Punteros (Esencial para Sistemas)
Un puntero almacena una **dirección de memoria** en lugar de un valor.

```c
#include <stdio.h>

int main() {
    int var = 10;      // Variable en memoria
    int *ptr = &var;   // ptr almacena la DIRECCION de var (&)

    printf("Valor: %d\n", var);      // 10
    printf("Dirección: %p\n", (void*)&var);
    printf("Via puntero: %d\n", *ptr); // Derreferencia (*) = 10

    *ptr = 20; // Cambiar el valor original a través del puntero
    printf("Nuevo valor: %d\n", var); // 20
    return 0;
}
```

### Malloc y Free (Gestión Manual de Memoria)
A diferencia de Python, en C debes pedir y liberar memoria manualmente.

```c
#include <stdlib.h>
#include <stdio.h>

int main() {
    // Pedir 10 enteros (40 bytes si int = 4 bytes)
    int *arr = (int*) malloc(10 * sizeof(int));
    if (arr == NULL) return 1; // Error

    arr[0] = 100;
    printf("%d\n", arr[0]);

    free(arr); // ¡MUY IMPORTANTE! Liberar memoria (Heap)
    return 0;
}
```

---

## 6. Simuladores (Emulación)

Si no tienes hardware específico, usas simuladores para entender arquitecturas.

### QEMU (Quick Emulator)
Simula una arquitectura completa (CPU + Periféricos).
```bash
# Emular una ARM 32-bit
qemu-system-arm -M versatilepb -m 128M -kernel zImage -serial stdio
```

### Logisim (Simulador de Circuitos Lógicos)
Ideal para entender **compuertas (gates)**, medio sumadores (half-adders) y memorias RAM básicas visualmente.

### MARS / SPIM (MIPS Simulator)
Simulador de la arquitectura **MIPS** (RISC). Muy usado en universidades para enseñar ensamblador.
*   Permite ver los registros cambiar en tiempo real.
*   Permite depurar (breakpoints) paso a paso.

---

## 7. Segmentación de Memoria (Memory Segmentation)

Un programa en C se divide en segmentos cuando se ejecuta:

| Segmento | Contenido |
|-----------|------------|
| **Text** | Código de máquina (instrucciones). ¡Solo lectura! |
| **Data** | Variables globales y estáticas inicializadas. |
| **BSS** | Variables globales NO inicializadas (inician en 0). |
| **Heap** | Memoria dinámica (`malloc`, `new`). Crece hacia arriba. |
| **Stack** | Variables locales, parámetros de función. Crece hacia abajo. |

```text
Dirección Alta (0xFFFFFFFF)
      ┌───────────────────┐
      │    Stack        │ (Crece hacia abajo)
      │      ▼           │
      │                  │
      │      ▲           │
      │    Heap         │ (Crece hacia arriba)
      ├───────────────────┤
      │      BSS         │
      │      Data        │
      │      Text        │ (Código)
Dirección Baja (0x00000000)
```

---

## 8. Llamadas al Sistema (System Calls) en C

C usa funciones de librería (ej. `printf`) que a su vez invocan al SO.

### Ejemplo: Leer de teclado (stdin) usando `read()`
```c
#include <unistd.h> // Para syscall
#include <stdlib.h>

int main() {
    char buffer[100];
    // read(syscall 0): fd=0 (stdin), buffer, 100 bytes
    int bytes_leidos = read(0, buffer, 100);
    // write(syscall 1): fd=1 (stdout), buffer, longitud
    write(1, buffer, bytes_leidos);
    exit(0);
}
```

---

## Resumen Visual (Componentes)

```text
      ┌─────────────────────────────────────────┐
      │         Computadora             │
      ├────────────────┬────────────────┤
      │    CPU          │      RAM       │
      │ ┌──────────┐ │   ┌──────────┐│
      │ │  ALU     │ │   │  Datos   ││
      │ │ Control │ │   │  Código  ││
      │ │ Registros│ │   │  Pila    ││
      │ └──────────┘ │   └──────────┘│
      ├────────────────┼────────────────┤
      │            Bus del Sistema      │
      └────────────────┬────────────────┘
                   │
      ┌────────▼─────────┐
      │  Disco Duro      │ (Almacenamiento)
      └──────────────────┘
```

---

## Recursos Recomendados

### Libros
*   **"Computer Organization and Design"** - Patterson & Hennessy (El estándar de oro).
*   **"C Programming Language"** - Kernighan & Ritchie (K&R - El libro original de C).

### Simuladores
*   **MARS MIPS:** https://courses.missouristate.edu/KennethMagnet/MARS/
*   **Logisim:** https://github.com/lolitopusta/logisim-evolution (Versión moderna).

### Tutoriales
*   **"NASM Assembly Tutorial"** (YouTube) - "PaterNoster" series.
*   **"C Pointers"** (YouTube) - "Jacob Sorber" explanation.
*   **"How a CPU Works"** - Ben Eater (YouTube) - Construye una CPU en una protoboard.
