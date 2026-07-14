---
name: views-pro-style
description: Guia y metodologia de diseño de interfaces web premium utilizando CSS Grid Generator para layouts y Animista para micro-animaciones CSS.
---

# Views Pro Style — Metodología de Diseño Visual Premium

Esta guía instruye sobre cómo estructurar y refinar interfaces profesionales ("views premium") combinando layouts fluidos e interactivos con micro-animaciones de alto impacto sin penalizar el rendimiento ni añadir dependencias de JS innecesarias.

---

## 1. Grid Systems (Inspirado en CSS Grid Generator)

Al diseñar layouts o catálogos, evitar los contenedores planos y lineales. Usar CSS Grid fluido que se autoadapte al espacio de pantalla sin abusar de media queries.

### Patrón de Grid Fluido
En lugar de fijar columnas rígidas, declarar un patrón autoadaptable:
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
```

### Optimización Mobile (< 480px)
Reducir el tamaño mínimo del grid, colapsar a una columna y compactar los gaps para pantallas estrechas (como mobile 16:9 vertical):
```css
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
```

---

## 2. Micro-Animaciones Puras (Inspirado en Animista)

Utilizar `@keyframes` puros copiados u optimizados de **Animista** para dar vida a la interfaz.

### Keyframes Esenciales

1. **`slide-in-bottom`** (Para entrada de cards y elementos de lista):
   ```css
   @keyframes slide-in-bottom {
     0%   { transform: translateY(40px); opacity: 0; }
     100% { transform: translateY(0);    opacity: 1; }
   }
   ```
2. **`scale-in-center`** (Para modales, tooltips y badges):
   ```css
   @keyframes scale-in-center {
     0%   { transform: scale(0.6); opacity: 0; }
     100% { transform: scale(1);   opacity: 1; }
   }
   ```
3. **`shake-horizontal`** (Micro-animación de atención/error o hover sutil):
   ```css
   @keyframes shake-horizontal {
     0%, 100% { transform: translateX(0); }
     10%, 30%, 50%, 70% { transform: translateX(-4px); }
     20%, 40%, 60% { transform: translateX(4px); }
   }
   ```

### Efecto de Escalado Secuencial (Stagger) sin JS
Para animar elementos secuencialmente en bucles (como `.map` en React), definir un delay dinámico usando variables de CSS custom properties:

**CSS:**
```css
.grid-item {
  animation: slide-in-bottom 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: var(--card-delay, 0ms);
}
```

**React/JSX:**
```tsx
{items.map((item, idx) => (
  <div 
    key={item.id} 
    className="grid-item" 
    style={{ '--card-delay': `${idx * 60}ms` } as React.CSSProperties}
  >
    {item.content}
  </div>
))}
```

---

## 3. Optimización Mobile (16:9 y Touch)

### CTAs en Touch (Hover Virtual)
En pantallas touch no existe el "hover" físico. Si un botón o texto explicativo (como "Ver detalle") depende del hover para mostrarse, se volverá invisible o inoperable en mobile. Usar `@media (hover: none)` para forzar que sea siempre visible en touch:
```css
.card-cta {
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.25s ease;
}

.card:hover .card-cta {
  opacity: 1;
  transform: translateY(0);
}

@media (hover: none) {
  .card-cta {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Diseño de Modales vs Bottom-Sheets en Mobile
- Si el usuario prefiere el modal **centrado clásico** en mobile, asegurar un padding de seguridad (ej. `padding: 16px` en el overlay) y bordes redondeados completos (`border-radius: 20px`) para evitar que el modal toque físicamente los límites de la pantalla táctil.
- Limitar la altura del modal con `max-height: 85dvh` y configurar `overflow-y: auto` para garantizar scroll interno de contenido si este supera el alto de una pantalla corta de relación 16:9.

---

## 4. Accesibilidad (Reduced Motion)

Toda micro-animación debe desactivarse automáticamente si el usuario tiene activadas las preferencias de accesibilidad en su sistema operativo para evitar mareos o fatiga visual:
```css
@media (prefers-reduced-motion: reduce) {
  .grid-item,
  .modal-overlay,
  .modal {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```
