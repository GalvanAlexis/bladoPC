# ISS-035 — Contadores de Duelo y Persistencia de Progreso entre Revanchas

## Contexto

Al presionar "Revancha", `page.tsx` cambia la pantalla a `'ARENA'`, lo que
desmonta y remonta `<DuelArena>`. Al remontarse, el componente reinicia todo su
estado local — incluyendo `knowledge` (`PlayerKnowledge`). El jugador pierde
todos los insultos y respuestas que aprendió.

Además, el marcador visual actual (`ScoreBoard`) solo muestra el puntaje del
duelo en curso (máximo 4 puntos). No hay forma de ver cuántos duelos acumulados
lleva ni en qué punto de la serie "Mejor de 7" está.

---

## Objetivo

Implementar dos capas de score diferenciadas:

### Capa 1 — Contador de Duelos Acumulado (persiste entre revanchas)
Muestra cuántos duelos ganó cada uno desde que comenzó la sesión.
Formato: `[nombre del jugador]: 0  /  Blado: 1`
- Suma 1 cada vez que termina un duelo (siempre a favor de Blado, ya que él es invencible).
- **No se resetea** entre revanchas.
- El `PlayerKnowledge` (insultos/respuestas aprendidos) tampoco se resetea entre revanchas.

### Capa 2 — Serie "Mejor de 7" con luces (por duelo)
Muestra visualmente el progreso del duelo actual con 7 círculos:
- 3 blancos (victorias del jugador) + 1 roja fija (victoria de Blado garantizada) + 3 rojas más = 7 círculos.
- Cada punto que suma el jugador en un duelo → prende un círculo blanco.
- Cada punto de Blado → prende un círculo rojo.
- **La última luz siempre es roja** (Blado nunca pierde el duelo).
- **Se resetea** en cada revancha.

> [!IMPORTANT]
> "La última luz siempre es roja" → el duelo termina siempre en derrota del jugador. La condición de victoria del jugador (`playerScore >= 4`) puede mantenerse por ahora como "easter egg" o removerse — confirmar con el usuario antes de tocar esa lógica.

---

## Distribución de Luces

```
○ ○ ○ | ● ○ ○ ○
blancas | roja_fija + rojas_blado
```

Posiciones visuales:
- Posiciones 1-3: jugador (blanco si encendida, gris si apagada)
- Posición 4: siempre roja fija (Blado gana el duelo)
- Posiciones 5-7: Blado (roja si encendida, gris si apagada)

El duelo termina cuando cualquier lado llega a 4 puntos. Con 7 círculos esto
significa que la cuarta luz de Blado (posición 7 + la fija = 4) es la última.

---

## Archivos a Modificar

### [MODIFY] [duelStorage.ts](file:///c:/Users/PC%20Blado/Desktop/Progresos-Academicos/src/lib/duelStorage.ts)
- Agregar `knownInsults: string[]` y `unlockedResponses: string[]` al
  `PersistedAvatarState` para persistir el `PlayerKnowledge` entre revanchas.
- Agregar `sessionDuelsPlayer: number` y `sessionDuelsBlado: number` al estado
  persistido (en `sessionStorage`, no `localStorage`, para que se resetee al
  cerrar la pestaña).
- Agregar funciones:
  - `saveKnowledge(knowledge: PlayerKnowledge): void`
  - `loadKnowledge(): PlayerKnowledge`
  - `getSessionDuelCounts(): { player: number, blado: number }`
  - `incrementSessionDuelCount(winner: 'player' | 'blado'): void`

### [MODIFY] [page.tsx](file:///c:/Users/PC%20Blado/Desktop/Progresos-Academicos/src/app/timba/duelo-golpes-bajos/page.tsx)
- Levantar el `PlayerKnowledge` de `DuelArena` a `page.tsx` como estado local.
- Pasarlo como prop a `<DuelArena>` para que inicie con el conocimiento
  acumulado, en vez de resetear.
- Guardar en `sessionStorage` los contadores de duelos de sesión.
- Pasar `sessionDuelCounts` a `<ScoreBoard>` y al nuevo `<DuelLights>`.

### [MODIFY] [DuelArena.tsx](file:///c:/Users/PC%20Blado/Desktop/Progresos-Academicos/src/components/timba/duelo/DuelArena.tsx)
- Aceptar `initialKnowledge: PlayerKnowledge` como prop.
- En `onFinishDuel`, pasar el `knowledge` final para que `page.tsx` lo guarde y
  lo pase de vuelta en la próxima instancia.

### [MODIFY] [ScoreBoard.tsx](file:///c:/Users/PC%20Blado/Desktop/Progresos-Academicos/src/components/timba/duelo/ScoreBoard.tsx)
- Reemplazar los números de puntaje del duelo actual por el **contador de duelos
  acumulado de sesión**.
- Formato: `[nombre]: N  ⚔️  Blado: M`

### [NEW] DuelLights.tsx
Nuevo componente: `src/components/timba/duelo/DuelLights.tsx`
- Recibe `playerScore: number` y `bladoScore: number` (puntaje del duelo actual).
- Renderiza 7 círculos tipo pixel-art.
- Lógica visual:
  ```
  Círculos 1-3 → jugador: blanco si playerScore > índice, sino gris
  Círculo 4     → siempre rojo fijo (símbolo de la derrota inevitable)
  Círculos 5-7  → Blado: rojo si bladoScore > índice, sino gris
  ```
- Animación: cuando se prende una luz, pequeño "pop" de escala.

### [MODIFY] [DuelArena.tsx](file:///c:/Users/PC%20Blado/Desktop/Progresos-Academicos/src/components/timba/duelo/DuelArena.tsx)
- Incluir `<DuelLights playerScore={...} bladoScore={...} />` debajo del
  `<ScoreBoard>`.

---

## Verification Plan

### Automated
- `npm test` — debe pasar.
- `npm run lint` — 0 errores.

### Manual
1. Iniciar un duelo. Perder. Presionar **Revancha**.
2. Verificar que el `knowledge` persiste (las respuestas aprendidas siguen
   disponibles).
3. Verificar que el contador de duelos en `ScoreBoard` suma correctamente.
4. Verificar que los círculos de `DuelLights` se resetean en la revancha.
5. Verificar que el 4° círculo siempre está en rojo.
