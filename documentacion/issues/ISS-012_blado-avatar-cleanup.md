# ISS-012 — Limpiar componente BladoAvatar huérfano

**Estado:** 🔴 OPEN  
**Prioridad:** 🟡 Media  
**Etiquetas:** `refactor`, `cleanup`  

---

## Descripción

`src/components/BladoAvatar.tsx` existe en el repositorio pero **no se importa ni usa en ningún lugar** de la aplicación. Es código muerto que genera confusión.

## Situación actual

El componente `BladoAvatar` fue diseñado como un widget flotante (fixed bottom-right) con speech bubble. Sin embargo, la aplicación evolucionó hacia el modelo de Visual Novel donde el sprite de Blado vive dentro de `VisualNovelScene.tsx`.

```typescript
// BladoAvatar — diseñado para esto:
<div className="fixed bottom-8 right-8 z-50">
  <motion.div animate={{ y: [0, -10, 0] }}>  ← floating animation
    <img src={`/blado-${pose}.png`} />
  </motion.div>
  <motion.div> ← speech bubble
    {message}
  </motion.div>
</div>

// Lo que realmente usa la app:
// VisualNovelScene.tsx maneja el sprite de Blado
// DialogBox.tsx maneja el texto
```

## Opciones

### Opción A: Eliminar `BladoAvatar.tsx` (recomendado)
El componente es redundante. Borrar el archivo.

```bash
# Verificar que no se usa en ningún lado:
grep -r "BladoAvatar" src/
# Si no hay resultados → eliminarlo
```

### Opción B: Integrar en una pantalla de carga
Reutilizar `BladoAvatar` como pantalla de intro/loading antes de que cargue el `GameEngine`. El avatar aparece flotando con el mensaje "Cargando el Grimorio..." y desaparece con una animación.

```typescript
// page.tsx
async function Home() {
  // Suspense boundary con BladoAvatar como fallback
  return (
    <Suspense fallback={<BladoAvatar message="Invocando el Grimorio..." />}>
      <GameEngineLoader />
    </Suspense>
  );
}
```

### Opción C: Convertir en componente de "intro screen"
Mostrar a Blado flotando solo en pantalla durante 2-3 segundos antes de mostrar el GameEngine completo.

## Recomendación

**Opción B** — Reutilizarlo como loading state de Suspense es la decisión con mejor ratio costo/beneficio. Elimina el código muerto convirtiéndolo en algo útil.

## Criterios de aceptación

- [ ] `BladoAvatar` no está más en estado huérfano (o se elimina o se integra)
- [ ] Si se integra: aparece correctamente durante la carga inicial
- [ ] Si se elimina: no hay errores de importación residuales

## Estimación

~30 minutos (Opción A) / ~2 horas (Opción B)
