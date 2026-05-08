# Sistemas Operativos II: Gestión de Memoria, Hilos, Procesos (Linux, C/pthreads)

En esta materia, profundizamos en cómo el SO gestiona los recursos físicos (memoria) y permite la ejecución **paralela** (hilos/threads).

---

## 1. Gestión de Memoria (Memory Management)

El SO es responsable de asignar y liberar memoria RAM a los procesos.

### Memoria Virtual y Paginación (Paging)
La memoria física (RAM) se divide en **marcos (frames)** y la lógica (proceso) en **páginas (pages)**.
*   **TLB (Translation Lookaside Buffer):** Caché de direcciones que acelera la traducción.

### Segmentación (Segmentation)
Divide la memoria en segmentos lógicos (código, datos, pila).

### Swapping (Intercambio)
Mover páginas de RAM al disco (Swap) cuando la memoria está llena.

### Llamadas del Sistema (System Calls) en C
```c
#include <stdlib.h>
#include <stdio.h>

int main() {
    // Asignación dinámica (Heap)
    int *arr = (int*) malloc(10 * sizeof(int));
    if (arr == NULL) {
        printf("Error: No hay memoria\n");
        return 1;
    }
    
    // Usar memoria
    arr[0] = 100;
    
    // Liberar memoria (MUY IMPORTANTE)
    free(arr); 
    return 0;
}
```

---

## 2. Hilos (Threads) y Procesos

### Diferencia Fundamental
| Concepto | Proceso | Hilo (Thread) |
|-----------|----------|----------------|
| **Espacio de Direcciones** | Tiene el suyo propio | Comparte el del proceso padre |
| **Comunicación** | Compleja (IPC) | Fácil (comparten variables) |
| **Costo de Creación** | Alto | Bajo |

### Creación de Hilos en Linux (Pthreads - POSIX)
La librería `pthread` es el estándar en Linux/Unix.

```c
#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

// Función que ejecutará el hilo
void* mi_hilo_func(void* arg) {
    int id = *(int*)arg;
    for (int i = 0; i < 3; i++) {
        printf("Hilo %d: Mensaje %d\n", id, i);
        sleep(1); // Pausa 1 segundo
    }
    return NULL;
}

int main() {
    pthread_t hilo1, hilo2;
    int id1 = 1, id2 = 2;
    
    // Crear hilos
    pthread_create(&hilo1, NULL, mi_hilo_func, &id1);
    pthread_create(&hilo2, NULL, mi_hilo_func, &id2);
    
    // Esperar a que terminen (Join)
    pthread_join(hilo1, NULL);
    pthread_join(hilo2, NULL);
    
    printf("Todos los hilos terminaron.\n");
    return 0;
}
```
**Compilación:** `gcc -o hilos programa.c -lpthread`

---

## 3. Problemas de Concurrencia (Race Conditions)

Como los hilos comparten memoria, pueden pisarse si acceden a la misma variable simultáneamente.

### Ejemplo de Problema (Race Condition)
```c
#include <pthread.h>
#include <stdio.h>

int contador_global = 0; // Recurso compartido

void* incrementar(void* arg) {
    for (int i = 0; i < 100000; i++) {
        contador_global++; // Operación NO atómica
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, incrementar, NULL);
    pthread_create(&t2, NULL, incrementar, NULL);
    
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    
    // Esperamos 200000, pero probablemente será menos debido a la condición de carrera
    printf("Resultado: %d\n", contador_global); 
    return 0;
}
```

### Mutex (Mutual Exclusion)
Solución usando candados (locks).

```c
#include <pthread.h>
#include <stdio.h>

int contador_global = 0;
pthread_mutex_t candado;

void* incrementar_seguro(void* arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&candado); // Bloquear
        contador_global++;
        pthread_mutex_unlock(&candado); // Desbloquear
    }
    return NULL;
}

int main() {
    pthread_mutex_init(&candado, NULL); // Inicializar Mutex
    
    pthread_t t1, t2;
    pthread_create(&t1, NULL, incrementar_seguro, NULL);
    pthread_create(&t2, NULL, incrementar_seguro, NULL);
    
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    
    printf("Resultado Seguro: %d\n", contador_global); // Debería ser 200000
    
    pthread_mutex_destroy(&candado); // Destruir
    return 0;
}
```

---

## 4. Procesos en Linux (Más detalle)

### Llamada `fork()`
Crea una copia exacta del proceso actual (proceso hijo).

```c
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    pid_t pid = fork(); // Crea proceso hijo
    
    if (pid < 0) {
        printf("Error en fork\n");
    } else if (pid == 0) {
        // Código del HIJO (pid es 0)
        printf("Soy el hijo, mi PID es %d\n", getpid());
    } else {
        // Código del PADRE (pid es el PID del hijo)
        printf("Soy el padre, mi hijo es %d\n", pid);
        wait(NULL); // Esperar a que el hijo termine
    }
    return 0;
}
```

---

## 5. Uso de `top` y `htop` (Monitoreo)

| Comando | Descripción | Campos Clave |
|---------|-------------|---------------|
| `top` | Visor de procesos en tiempo real | `PID`, `USER`, `RES` (RAM), `%CPU` |
| `htop` | Versión mejorada (colores, clics) | Barra de recursos visual |
| `ps aux` | Snapshot de procesos | `STAT` (R=Running, S=Sleeping, Z=Zombie) |

---

## 6. Llamadas al Sistema (System Calls) Importantes

| Llamada | Descripción |
|----------|-------------|
| `fork()` | Crear proceso |
| `exec()` | Reemplazar imagen de proceso |
| `wait()` | Esperar a hijo |
| `exit()` | Terminar proceso |
| `pthread_create()` | Crear hilo |
| `pthread_join()` | Esperar hilo |
| `mmap()` | Mapear archivos a memoria |

---

## Resumen Visual (Estados de un Proceso)

```text
[NEW] --fork()--> [READY] --scheduler--> [RUNNING]
   ^                                          |
   |                                          v
   |                                     [WAITING] --I/O done--> [READY]
   |                                          |
   |                                          v
   +----<----exit()-------------------- [TERMINATED]
```

---

## Recursos Recomendados

### Libros
*   **"Operating Systems: Three Easy Pieces"** - Remzi H. Arpaci-Dusseau (Disponible gratis en wisc.edu).
*   **"Advanced Programming in the UNIX Environment"** - W. Richard Stevens (El libro de oro para C/Unix).

### Documentación
*   **Pthreads Tutorial:** https://www.cs.cmu.edu/afs/cs.cmu.edu/academic/class/15492-f07/www/pthreads.html
*   **Linux man pages:** `man fork`, `man pthread_create`.

### Tutoriales
*   **"C Programming in Linux"** - Derek Molloy (YouTube).
*   **"POSIX Threads Programming"** - Lawrence Livermore National Laboratory.
