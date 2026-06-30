# ISS-004 — DialogBox con typewriter + choices + free input

**Estado:** ✅ CLOSED  
**Prioridad:** 🔥 Alta  
**Etiquetas:** `feature`, `ui`, `animation`  
**Fecha de cierre:** 2026-05-08  

---

## Descripción

Componente de caja de diálogo estilo RPG. Muestra el texto con efecto máquina de escribir, presenta opciones de navegación y permite al usuario escribir preguntas libres.

## Lo que se hizo

### Efecto typewriter
```typescript
useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    setDisplayedText(text.substring(0, i + 1));
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 20); // 20ms por caracter
}, [text]);
```

### Estructura visual
```
┌─────────────────────────────────────────────────┐
│ [BLADO]  ← Name badge crimson                   │
│                                                 │
│  Texto con efecto typewriter...                 │
│  (mínimo 80px de altura para estabilidad)       │
│                                                 │
│  ▶ Opción 1                                     │
│  ▶ Opción 2                                     │
│  ▶ Hacer una pregunta abierta... (si aplica)    │
│  _ [input field] ________________________       │
└─────────────────────────────────────────────────┘
```

### Estados del input libre
1. Oculto por defecto
2. Aparece al hacer click en "Hacer una pregunta abierta..."
3. `autoFocus` al aparecer
4. Submit con Enter o formulario → llama `onAskQuestion()`
5. Se oculta tras enviar y limpia el input

## Archivos involucrados

- `src/components/DialogBox.tsx`

## Criterios de aceptación cumplidos

- [x] Efecto typewriter funciona y reinicia al cambiar `text`
- [x] Choices renderizan dinámicamente desde props
- [x] Input libre aparece/oculta condicionalmente
- [x] Estilos dark RPG: borde `crimson`, glow, fuente `mono`
- [x] Cursor parpadeante `|` durante `isTyping`
