# ISS-033: "Duelo con Golpes Bajos" — Insult Duel Game

**Estado:** Planificado  
**Branch de implementación:** `feature/ISS-033-duelo-golpes-bajos`  
**Tipo:** Minijuego #1 — Timba Arcade Hub  
**Ruta:** `/timba/duelo-golpes-bajos`

---

## Visión General

**"Duelo con Golpes Bajos"** es el primer minijuego oficial de la Timba Arcana. Inspirado directamente en el sistema *Insult Sword Fighting* de *The Secret of Monkey Island* (LucasArts, 1990), es una batalla verbal de insultos entre el jugador y Blado, el guardián demoníaco de la Caverna.

La magia del juego no está en la acción sino en la **progresión cognitiva**: el jugador pierde, aprende, regresa, y la segunda partida es notablemente más fuerte que la primera. El loop es infinito e irresistible porque el jugador siente que está mejorando de verdad.

> **Premisa narrativa:** Blado, harto de que mortales entren sin invitación a su caverna, decidió que el único modo de ganarse su respeto es derrotarlo verbalmente. Pero como es un diablillo tramposo, el sistema está *diseñado* para que nunca pierdas del todo y nunca ganes del todo.

---

## Mecánica Central: El Sistema de Insultos

### Estructura de un Insulto

Cada insulto es un objeto con los siguientes campos:

```ts
interface DuelInsult {
  id: string;                  // Identificador único, ej: "INS-001"
  attacker: string;            // El insulto que lanza el atacante
  correctResponse: string;     // La única respuesta que funciona
  wrongResponses: string[];    // 3 respuestas incorrectas plausibles
  category: InsultCategory;    // Para agrupar por temática
  unlocked: boolean;           // Si el jugador ya conoce la respuesta correcta
}

type InsultCategory = 
  | 'apariencia'    // Insultos sobre el físico del avatar
  | 'inteligencia'  // Sobre la capacidad mental
  | 'coraje'        // Cobardía, miedo
  | 'habilidad'     // Torpeza, incompetencia
  | 'linaje'        // Sobre los ancestros, familia
  | 'existencia';   // Filosóficos, nihilistas (estilo Blado)
```

### Ejemplo de Insulto

```ts
{
  id: "INS-001",
  attacker: "¡Tus respuestas son tan vacías como tu cráneo!",
  correctResponse: "Al menos yo tengo cráneo... el tuyo se derritió con el primer mate.",
  wrongResponses: [
    "¡Eso no es cierto, tengo muchas respuestas!",
    "¡Tu madre también!",
    "Bla bla bla, habla más, que me duermo..."
  ],
  category: "inteligencia",
  unlocked: false
}
```

### ¿Cuántos insultos necesitamos?

El MVP requiere **al menos 14 insultos** (7 que usa Blado como atacante, 7 que puede usar el jugador cuando ataca). A largo plazo, el juego escala con nuevas cargas de insultos. Se recomienda trabajar en packs de 14.

---

## El Sistema de Progresión (Core Loop)

Esta es la pieza más importante del juego. Imita exactamente la progresión de Monkey Island:

### Estado de conocimiento del jugador

```ts
interface PlayerKnowledge {
  // Insultos que el jugador puede LANZAR
  knownInsults: Set<string>;       // IDs de insultos que puede usar
  
  // Respuestas que el jugador puede DAR cuando Blado ataca
  unlockedResponses: Set<string>;  // IDs cuya respuesta correcta ya conoce
}
```

**Al inicio del juego:** El jugador conoce 2 insultos básicos y 0 respuestas. El resto están bloqueados.

### Cómo se desbloquean las respuestas

**Regla de Oro:** Una respuesta se desbloquea cuando Blado te la usa en tu contra.

**Flujo detallado:**
1. Blado lanza el insulto `INS-005`.
2. El jugador ve 4 opciones. 3 están disponibles para elegir; **la opción correcta aparece en gris con candado** `🔒`.
3. El jugador elige una respuesta incorrecta → Blado gana ese punto.
4. Blado dice su frase de victoria para ese insulto (ej: *"¡Jeje! La respuesta era: 'Al menos yo tengo cráneo...' ¡Aprende!"*).
5. La respuesta correcta de `INS-005` **se desbloquea** en el inventario del jugador.
6. En la **próxima partida**, ese insulto ya tiene 4 opciones seleccionables (la correcta ya no tiene candado).

```
Primera vez que Blado usa INS-005:
  [ Opción A - incorrecta ] ← seleccionable
  [ Opción B - incorrecta ] ← seleccionable
  [ Opción C - incorrecta ] ← seleccionable
  [ Opción D - CORRECTA 🔒] ← bloqueada, no seleccionable

Blado gana ese punto y muestra la respuesta correcta.
INS-005 pasa a unlockedResponses.

Segunda vez que Blado usa INS-005:
  [ Opción A - incorrecta ] ← seleccionable
  [ Opción B - incorrecta ] ← seleccionable
  [ Opción C - incorrecta ] ← seleccionable
  [ Opción D - CORRECTA  ] ← ¡ahora seleccionable! Jugador puede bloquear.
```

### Cómo se desbloquean los insultos del jugador

Cuando el jugador ataca, Blado responde. Si Blado usa una respuesta a tu insulto que aún no conocías → **aprendes esa contrarrespuesta**, y la próxima vez que la veas en un duelo, ya sabrás cómo bloquearla.

Esto genera el **ciclo virtuoso**:
> Perder → Aprender → Volver → Ganar ese punto → Sentirse imparable.

---

## La IA de Blado en el Duelo (Rubber Band AI)

### Regla de invencibilidad

**Blado siempre gana el duelo (al mejor de 7 puntos), sin excepción.** No es posible ganarle. Pero el juego nunca lo dice explícitamente; el jugador lo descubrirá solo, lo que añade misterio y humor.

### El sistema de "confusión estratégica"

Para que la experiencia sea justa y no frustrante, Blado tiene un mecanismo de **rubber-band** incorporado:

```
Regla de confusión: Si Blado lleva 3 puntos seguidos sin que el jugador
haya conseguido ni uno, Blado "falla" un insulto, dejando al jugador ganar ese punto.
```

**¿Cómo se implementa "fallar"?**
- Blado elige una respuesta incorrecta intencionalmente al bloquear un ataque del jugador.
- Acompañado de una frase narrativa que lo justifica en personaje:
  - *"Espera... ¿qué iba a decir yo? Me distrajeron las llamas del foso..."*
  - *"Mmm... este mate me está nublando el ingenio..."*
  - *"Bah, te regalo ese punto, mortal. No vaya a ser que se me acabe la diversión."*

**El límite de la confusión:** Blado solo puede "confundirse" una vez por duelo si la diferencia es de 3 puntos, y una segunda vez si llega a 5 puntos consecutivos. **Nunca se confunde cuando le falta solo un punto para ganar el duelo.**

```
Ejemplo de partida (al mejor de 7):
Blado: 1 | Jugador: 0
Blado: 2 | Jugador: 0
Blado: 3 | Jugador: 0  ← "Se confunde"
Blado: 3 | Jugador: 1  ← Jugador gana ese punto
Blado: 4 | Jugador: 1
Blado: 5 | Jugador: 1
Blado: 5 | Jugador: 2  ← 5 consecutivos sin punto (3+2), se confunde por segunda vez
...
Blado: 4/4 → siempre gana el punto definitivo
```

### Frase final de Blado (derrota del jugador)

> *"Jeje... buen duelo, mortal. No fue tan patético como esperaba. Intenta de nuevo... seguro aprendiste cosas nuevas."*

Esta frase se muestra con animación dramática, con Blado posando victorioso.

---

## Sistema de Avatar del Jugador

### Flujo de incorporación

Antes del primer duelo, el jugador pasa por una pantalla de creación de personaje. La info se guarda en `localStorage`.

### Partes del Avatar (MVP)

```ts
interface AvatarConfig {
  name: string;
  
  // Cabeza y rostro
  skinTone: SkinTone;       // 6 tonos de piel
  hairStyle: HairStyle;     // 8 estilos (rapado, largo, rulos, mohawk, gorra...)
  hairColor: HairColor;     // 10 colores (rubio, negro, pelirrojo, azul...)
  faceFeature: FaceFeature; // 5 opciones (cicatriz, parche pirata, anteojos, tatuaje, ninguno)
  expression: Expression;   // 3 expresiones base (serio, sonriente, intimidante)

  // Cuerpo / Ropa
  outfit: Outfit;           // 6 outfits (pirata, casual, formal, rockero, medieval, ninja)
  outfitColor: string;      // Color principal del outfit (hex)
  accessory: Accessory;     // 5 accesorios (sombrero pirata, espada, bastón, ninguno...)
}
```

### Renderizado del Avatar

El avatar se renderiza como un **personaje SVG compuesto de capas**. Cada parte (skin, ropa, cabello, accesorio) es un archivo SVG independiente que se apila visualmente:

```
public/avatar/
  base/
    skin-1.svg ... skin-6.svg
  hair/
    style-rapado.svg ... style-rulos.svg
  outfits/
    outfit-pirata.svg ... outfit-ninja.svg
  accessories/
    acc-sombrero.svg ... acc-ninguno.svg
```

El componente `AvatarRenderer.tsx` recibe `AvatarConfig` y apila las capas con `position: absolute` en un contenedor de 200×300px.

### UI del Avatar Creator

- **Pantalla dividida:** izquierda = preview en tiempo real del avatar, derecha = panel de selección.
- **Navegación por secciones:** Tabs horizontales (Rostro / Ropa / Accesorios).
- **Selector por scroll:** Carrusel horizontal de opciones para cada atributo, con preview al hover.
- **Input de nombre:** Campo de texto estilizado con el nombre del personaje.
- **Botón "¡A Duelo!":** Guarda la config en `localStorage` y navega al duelo.

---

## Flujo de Pantallas

```
/timba/duelo-golpes-bajos
  │
  ▼
┌──────────────────────┐
│  PANTALLA DE INICIO  │
│  "El Duelo Arcano"   │
│  [Nuevo Duelo]       │
│  [Cambiar Avatar]    │
└──────────────────────┘
         │
         ▼
┌──────────────────────┐     (si ya tiene avatar)
│  AVATAR CREATOR      │ ──────────────────────────────────────────────────┐
│  Nombre + partes     │                                                   │
│  [¡A Duelo!]         │                                                   │
└──────────────────────┘                                                   │
         │ (primera vez)                                                   │
         ▼                                                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       PANTALLA DE DUELO                                  │
│                                                                          │
│  ┌───────────────┐         ⚔️  0 – 0  ⚔️         ┌────────────────┐     │
│  │ Avatar usuario│                                │ Blado sprite   │     │
│  └───────────────┘                                └────────────────┘     │
│                                                                          │
│  "Blado lanza: ¡Tus respuestas son tan vacías como tu cráneo!"          │
│                                                                          │
│  ┌─────────────────────────────────────┐                                 │
│  │ A) [Opción incorrecta]             │                                 │
│  │ B) [Opción incorrecta]             │                                 │
│  │ C) [Opción incorrecta]             │                                 │
│  │ D) [🔒 Bloqueada - por aprender]   │                                 │
│  └─────────────────────────────────────┘                                 │
└──────────────────────────────────────────────────────────────────────────┘
         │
         ▼ (el duelo llega a 4 puntos para Blado)
┌──────────────────────┐
│  PANTALLA DE DERROTA │
│  (animada, burlona)  │
│  Frase final Blado   │
│  [Revancha]          │
│  [Colección]         │
└──────────────────────┘
```

---

## La Colección de Respuestas (Pantalla adicional)

Una pantalla adicional que muestra el "Grimorio de Golpes Bajos": todas las respuestas que el jugador ha desbloqueado hasta el momento. Funciona como incentivo de colección.

```ts
interface PlayerProgress {
  unlockedResponses: string[];   // IDs desbloqueados
  totalInsults: number;          // Total en el juego
  totalResponses: number;        // Total de respuestas posibles
  duelsPlayed: number;
  duelsLost: number;             // Siempre = duelsPlayed (jeje)
  bestRound: number;             // Máximo de puntos conseguidos en un duelo
  avatarConfig: AvatarConfig;
}
```

La colección se guarda en `localStorage` y persiste entre sesiones.

---

## Persistencia de Estado

Todo el progreso se guarda en `localStorage` bajo la clave `duelo_golpes_bajos`:

```ts
const STORAGE_KEY = 'duelo_golpes_bajos';

interface PersistedDuelState {
  playerName: string;
  avatar: AvatarConfig;
  knowledge: {
    unlockedResponses: string[];  // IDs
    knownInsults: string[];       // IDs
  };
  stats: {
    duelsPlayed: number;
    bestScore: number;
  };
}
```

---

## Estructura de Archivos

```
src/app/timba/duelo-golpes-bajos/
  page.tsx                    → Orquestador principal (state machine)

src/components/timba/duelo/
  AvatarCreator.tsx           → Pantalla de creación de avatar
  AvatarRenderer.tsx          → Composición SVG de capas del avatar
  DuelArena.tsx               → Pantalla del duelo en sí
  InsultCard.tsx              → Burbuja que muestra el insulto activo
  ResponseOptions.tsx         → Los 4 botones de respuesta (uno puede estar bloqueado)
  ScoreBoard.tsx              → Marcador de puntos (X – X)
  DuelResult.tsx              → Pantalla de derrota con frase final de Blado
  ResponseCollection.tsx      → Grimorio de respuestas desbloqueadas

src/lib/
  duelInsults.ts              → Base de datos de todos los insultos
  duelEngine.ts               → Lógica del motor del duelo (pure functions)
  duelStorage.ts              → Wrappers de localStorage para persistencia
  avatarConfig.ts             → Tipos y opciones del avatar

public/avatar/
  base/ hair/ outfits/ accessories/ → SVGs por capa
```

---

## Motor del Duelo (duelEngine.ts) — Lógica Pura

```ts
// Selecciona un insulto para Blado teniendo en cuenta
// cuáles ya usó en esta partida y cuáles conoce el jugador
function selectBladoInsult(
  availableInsults: DuelInsult[],
  usedThisRound: Set<string>,
  playerKnowledge: PlayerKnowledge
): DuelInsult

// Determina si Blado debe "confundirse" en esta ronda
function shouldBladoConfuse(
  bladoScore: number,
  playerScore: number,
  confusionCount: number,       // Veces que ya se confundió en este duelo
  roundsToWin: number           // Puntos que le faltan a Blado para ganar
): boolean

// Evalúa la respuesta del jugador
function evaluatePlayerResponse(
  insultId: string,
  chosenResponseId: string,
  allInsults: DuelInsult[]
): { correct: boolean; correctResponse: string }

// Construye las 4 opciones de respuesta para un insulto,
// teniendo en cuenta qué respuestas ya desbloqueó el jugador
function buildResponseOptions(
  insult: DuelInsult,
  playerKnowledge: PlayerKnowledge
): ResponseOption[]

interface ResponseOption {
  id: string;
  text: string;
  locked: boolean;     // Si está bloqueada (no seleccionable)
  isCorrect: boolean;  // Solo se usa internamente para validar
}
```

---

## Paleta de Insultos MVP (14 insultos — Primeros 2 packs)

### Pack A — Los que usa Blado al atacar (7)

| ID | Insulto de Blado |
|---|---|
| INS-001 | ¡Tus respuestas son tan vacías como tu cráneo! |
| INS-002 | ¡He visto estatuas de sal con más carisma que vos! |
| INS-003 | ¡Debería cobrar entrada por dejarte escuchar mis insultos! |
| INS-004 | ¡Tus ancestros deben estar avergonzados de haberse reproducido! |
| INS-005 | ¡Peleas con la misma gracia que un mate sin yerba! |
| INS-006 | ¡En el infierno, tu nivel de amenaza me daría cosquillas! |
| INS-007 | ¡Si el coraje fuese agua, no te alcanzaría ni para secarte las lágrimas! |

### Pack A — Respuestas correctas (las que aprende el jugador)

| ID | Respuesta correcta |
|---|---|
| INS-001 | Al menos el mío no se derritió con el primer mate. |
| INS-002 | Y vos tenés el doble de ego con la mitad de razón para tenerlo. |
| INS-003 | Gracias por la bienvenida, ¿también ofrecés descuentos para veteranos de tus fracasos? |
| INS-004 | Los míos al menos existieron fuera de una pesadilla de azufre. |
| INS-005 | Por eso vengo a que me enseñes, diablillo de pacotilla. |
| INS-006 | Las cosquillas son lo único que lograrías causar en cualquier plano. |
| INS-007 | Prefiero ahogarme en cobardía que flotar en tu soberbia. |

### Pack B — Insultos del jugador (cuando es el turno de atacar)

El jugador también puede lanzar insultos cuando gana el turno. Estos tienen sus propias respuestas correctas de Blado (que el jugador también aprende para anticipar):

| ID | Insulto del Jugador | Respuesta de Blado |
|---|---|---|
| ATK-001 | ¡Sos tan chico que hasta tu sombra te da compasión! | ¡Mi sombra gobierna reinos que vos ni imaginarías, mortal! |
| ATK-002 | ¡Con esa cara tuya, el espejo cobra seguro! | ¡Los espejos explotan de envidia al verme, ignorante! |
| ATK-003 | ¡Tus chistes son tan viejos que tienen moho! | ¡Son tan clásicos que volverán a ponerse de moda cuando vos ya no estés! |
| ATK-004 | ¡Hasta las llamas del infierno te esquivan! | ¡Me las reservo para ocasiones especiales, como este insulto mediocre! |
| ATK-005 | ¡Leí libros con más personalidad que vos! | ¡Por lo menos los libros tienen algo que decir, cosa que vos claramente no! |
| ATK-006 | ¡Sos tan predecible que ya sé lo que vas a decir! | ¡Entonces ya sabrás que vas a perder, y sin embargo acá seguís! |
| ATK-007 | ¡Blado el guardián... ¿de qué? ¿Del polvo? | ¡Del polvo que quedarás vos cuando te aplaste mi ingenio! |

---

## Expansión Futura (v2+)

### Nuevos packs de insultos
El juego fue diseñado para escalar fácilmente. Se puede agregar un `Pack C`, `Pack D`, etc., con nuevas categorías temáticas o eventos especiales (ej: "Pack de Halloween", "Pack Universitario" con insultos académicos).

### Modos de juego adicionales
- **Modo Velocidad:** El jugador tiene un timer por respuesta. Sin timer en el modo base.
- **Modo Torneo:** Enfrentarse a 3 personajes distintos (no solo Blado) con pools de insultos diferentes.
- **Modo Creador:** El jugador puede proponer nuevos insultos que se someten a votación.

### Multijugador (muy largo plazo)
- Modo 1vs1 contra otro visitante del sitio en tiempo real (WebSockets).
- El sistema de insultos y respuestas permanece igual, pero el "Blado" que falla estratégicamente es reemplazado por la IA del oponente.

### Avatares expandidos
- Más capas: accesorios faciales, mochilas, efectos de aura.
- Desbloqueos por progresión: después de X partidas, se desbloquea un outfit nuevo.
- Export del avatar como imagen compartible.

### Persistencia en base de datos
Migrar de `localStorage` a Supabase para:
- Rankings globales (mejor puntaje por duelo).
- Tabla de los que desbloquearon todos los insultos.
- Guardar el progreso entre dispositivos.

---

## Preguntas Abiertas para la Implementación

1. **¿Los SVGs del avatar los generamos nosotros o usamos una librería de avatares open-source** como DiceBear?  
   → DiceBear (`@dicebear/core`) tiene estilos modulares y es open-source. Podría ahorrarnos mucho tiempo de diseño.

2. **¿El jugador tiene turno de ataque?** Es decir, ¿el duelo alterna "Blado ataca → Jugador responde" con "Jugador ataca → Blado responde"? Monkey Island sí alterna.  
   → Confirmación pendiente.

3. **¿Timer por respuesta?** Para agregar tensión, ¿querés que el jugador tenga un límite de tiempo para elegir la respuesta?  
   → Confirmación pendiente.

4. **¿El nombre del personaje se usa en los insultos?** Blado podría personalizar sus insultos con el nombre del usuario: *"¡Alexis, tus respuestas son tan vacías..."*  
   → Sería mucho más inmersivo.

5. **¿Sonidos/música?** ¿Querés efectos de sonido para la espada, aplausos, etc.?

---

## Plan de Verificación

- `npm test` debe pasar (las funciones puras de `duelEngine.ts` serán testeadas con Jest).
- `npm run build` debe compilar sin errores.
- Partida completa jugable en `http://localhost:3000/timba/duelo-golpes-bajos`.
- Ciclo de progresión: primera vez la respuesta está bloqueada → se desbloquea → segunda vez se puede elegir.
- Blado nunca cierra el duelo perdiendo.
- El avatar creado persiste al recargar la página.
