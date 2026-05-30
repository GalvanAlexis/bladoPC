# ISS-033: "Duelo con Golpes Bajos" — Insult Duel Game

**Estado:** Planificado  
**Branch de implementación:** `feature/ISS-033-duelo-golpes-bajos`  
**Tipo:** Minijuego #1 — Timba Arcade Hub  
**Ruta:** `/timba/duelo-golpes-bajos`

---

## Visión General

**"Duelo con Golpes Bajos"** es el primer minijuego oficial de la Timba Arcana. Inspirado directamente en el sistema _Insult Sword Fighting_ de _The Secret of Monkey Island_ (LucasArts, 1990), es una batalla verbal de insultos entre el jugador y Blado, el guardián demoníaco de la Caverna.

La magia del juego no está en la acción sino en la **progresión cognitiva**: el jugador pierde, aprende, regresa, y la segunda partida es notablemente más fuerte que la primera. El loop es infinito e irresistible porque el jugador siente que está mejorando de verdad.

> **Premisa narrativa:** Blado, promete ayudar al usuario, si puede derrotarlo en un duelo de espadas. Pero como es un diablillo tramposo, el sistema está _diseñado_ para que nunca pierdas del todo y nunca ganes del todo.

---

## Mecánica Central: El Sistema de Insultos

### Estructura de un Insulto

Cada insulto es un objeto con los siguientes campos:

```ts
interface DuelInsult {
  id: string; // Identificador único, ej: "INS-001"
  attacker: string; // El insulto que lanza el atacante
  correctResponse: string; // La única respuesta que funciona
  wrongResponses: string[]; // 3 respuestas incorrectas plausibles
  category: InsultCategory; // Para agrupar por temática
  unlocked: boolean; // Si el jugador ya conoce la respuesta correcta
}

type InsultCategory =
  | "inteligencia" // Sobre la capacidad mental
  | "coraje" // Cobardía, miedo
  | "habilidad" // Torpeza, incompetencia
  | "linaje" // Sobre los ancestros, familia
  | "existencia" // Filosóficos, nihilistas (estilo Blado)
  | "politica"; // a favor de Milei y en contra de los Kukas;
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
  knownInsults: Set<string>; // IDs de insultos que puede usar

  // Respuestas que el jugador puede DAR cuando Blado ataca
  unlockedResponses: Set<string>; // IDs cuya respuesta correcta ya conoce
}
```

**Al inicio del juego:** El jugador conoce 2 insultos básicos y 0 respuestas. El resto están bloqueados.

### Cómo se desbloquean las respuestas

**Regla de Oro:** Ver a Blado responder a tu ataque desbloquea esa respuesta en tu arsenal.

**Flujo detallado — Blado ataca al jugador:**

1. Blado lanza el insulto `INS-005` (por primera vez).
2. El jugador ve **3 opciones**, todas incorrectas. No hay ninguna señal visual de que falte algo.
3. El jugador elige una → Blado gana ese punto y reacciona en personaje. Nada más.
4. Sin embargo, silenciosamente, el sistema registra que el jugador **ya fue atacado con `INS-005`**: ese insulto pasa a `knownInsults`, disponible para que el jugador lo use en su propio turno de ataque.

**Flujo detallado — El jugador ataca a Blado:**

1. En su turno, el jugador usa `INS-005` (porque lo desbloqueó al recibirlo).
2. Blado responde con la contraofensiva correcta (`INS-005.correctResponse`). El jugador la ve.
3. El sistema registra que el jugador **vio la respuesta correcta a `INS-005`**: pasa a `unlockedResponses`.
4. A partir de ahora, cuando Blado lance `INS-005`, el jugador verá **4 opciones** en lugar de 3. La correcta estará mezclada entre las incorrectas, sin ninguna distinción visual. El jugador tendrá que recordarla.

```
Primera vez que Blado usa INS-005 (respuesta no desbloqueada):
  [ Opción A ]
  [ Opción B ]
  [ Opción C ]
  (solo 3 opciones, todas incorrectas. El jugador no sabe que falta una.)
  → Jugador falla → Blado gana el punto
  → INS-005 entra en knownInsults del jugador (puede atacar con él)

El jugador usa INS-005 para atacar → Blado responde con la correcta
  → INS-005 entra en unlockedResponses

Próxima vez que Blado usa INS-005:
  [ Opción A ]
  [ Opción B ]
  [ Opción C ]
  [ Opción D ]  ← apareció una nueva opción (la correcta, mezclada sin aviso)
  → El jugador puede elegirla y ganar el punto... si la recuerda.
```

> **Diseño intencional:** El jugador descubre solo que a veces hay 3 opciones y a veces 4. Nunca se le explica por qué. La sensación de "¡ah, apareció una respuesta nueva!" es la recompensa orgánica de la progresión.

### Cómo se desbloquean los insultos del jugador

El jugador empieza con **2 insultos base** en su arsenal. Los demás se desbloquean de forma simétrica:

- Cuando **Blado lo ataca** con un insulto nuevo → el jugador **aprende ese insulto** y puede usarlo en su turno.
- Cuando **el jugador usa** ese insulto y **Blado responde** → el jugador **aprende la respuesta correcta** para bloquearlo.

Esto crea el ciclo virtuoso:

> Recibir insulto nuevo → Aprenderlo → Atacar con él → Ver la respuesta de Blado → Aprender la respuesta → La próxima vez tener 4 opciones y poder bloquearlo.

---

## La IA de Blado en el Duelo (Rubber Band AI)

### Regla de invencibilidad

**Blado siempre gana el duelo (al mejor de 7 puntos), sin excepción.** No es posible ganarle. Pero el juego nunca lo dice explícitamente; el jugador lo descubrirá solo, lo que añade misterio y humor.

### El sistema de "confusión estratégica"

Para que la experiencia sea justa y no frustrante, Blado tiene un mecanismo de **rubber-band** incorporado:

```
Regla de confusión: Si Blado lleva 3 puntos seguidos sin que el jugador
haya conseguido ni uno, Blado "falla" un insulto, dejando al jugador ganar los siguientes  dos puntos. Blado pierde hasta quedar 3-3.
```

**¿Cómo se implementa "fallar"?**

- Blado elige una de las respuestas incorrectas al azar, pero intencionalmente al bloquear un ataque del jugador.
- pierde el punto sin levantar sospecha, para no frustrar al jugador.

**El límite de la confusión:** Blado puede "confundirse" pero nunca perder el duelo. Si la diferencia es de 3 puntos, se confunde y pierde el punto. Pierde hasta quedar 3-3 y luego gana el ultimo punto **siempre**. Esta mecanica se activa solo si blado gana los primeros 3 puntos seguidos.

```
Ejemplo de partida (al mejor de 7 insultos):
Blado: 1 | Jugador: 0
Blado: 2 | Jugador: 0
Blado: 3 | Jugador: 0  ← "Se confunde"
Blado: 3 | Jugador: 1  ← Jugador gana 1er punto
Blado: 3 | Jugador: 2  ← Jugador gana 2do punto
Blado: 3 | Jugador: 3  ← Jugador gana 3er punto
Blado: 4 | Jugador: 3  ← Blado gana el ultimo punto siempre.
```

### Frase final de Blado (derrota del jugador)

> _"Jeje... buen duelo, mortal. ¿Ya quieres irte con mamá? Intenta de nuevo... seguro aprendiste cosas nuevas."_

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
  skinTone: SkinTone; // 6 tonos de piel
  hairStyle: HairStyle; // 8 estilos (rapado, largo, rulos, mohawk, gorra...)
  hairColor: HairColor; // 10 colores (rubio, negro, pelirrojo, azul...)
  faceFeature: FaceFeature; // 5 opciones (cicatriz, parche pirata, anteojos, tatuaje, ninguno)
  expression: Expression; // 3 expresiones base (serio, sonriente, intimidante)

  // Cuerpo / Ropa
  outfit: Outfit; // 9 outfits (pirata, espartano, vikingo, rockero, caballero medieval, ninja, samurai, gaucho criollo, Lord Ingles )
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
│  "Duelo con golpes bajos"   │
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

## La Colección de Trofeos (Pantalla adicional)

Una pantalla adicional que muestra el "Reliquias Invaluables": Son medallas, copas, certificados, que se muestran al usuario con una breve descripcion de lo necesario para desbloquearlo. ej: ganarle 5 veces a Blado, Ganarle 4-0 a Blado, etc. Funciona como incentivo de colección, pero como es imposible ganarle a blado, el usuario nunca los podra obtener. Blado se burla de esto con frases como: "Ja! No mereces estas reliquias, mortal".

```ts
interface Trophy {
  id: string;
  name: string; // ej: "Golpe Limpio"
  description: string; // ej: "Ganarle 5 veces a Blado"
  bladoMockLine: string; // ej: "¡Ja! No mereces esta reliquia, mortal"
  unlocked: false; // siempre false — imposible de ganar
}

interface PlayerStats {
  duelsPlayed: number;
  bestScore: number; // Máximo de puntos conseguidos en un duelo (máximo: 3)
}
```

Los trofeos se muestran dentro de vitrinas con la descripción del requisito para obtenerlos. Blado aparece con una frase burlona al pasar el cursor sobre cualquiera de ellos. La colección es **persistente** (se guarda en `localStorage`) ya que es independiente de la sesión de duelo.

---

## Persistencia de Estado

El estado del juego se divide en **dos capas con ciclos de vida distintos**:

### Capa 1 — Solo Avatar y Stats (localStorage, permanente)

Se guarda en `localStorage` bajo la clave `duelo_avatar`. **Persiste entre sesiones y navegaciones.**

```ts
const AVATAR_STORAGE_KEY = "duelo_avatar";

interface PersistedAvatarState {
  avatar: AvatarConfig; // Configuración del avatar del jugador
  stats: {
    duelsPlayed: number; // Acumulativo histórico
    bestScore: number; // Máximo de puntos en un duelo (histórico)
  };
}
```

- El avatar **puede modificarse**: hay un botón "Editar Avatar" accesible desde la pantalla de inicio del juego.
- Al editar el avatar, se redirige al `AvatarCreator` precargado con la config actual y se regresa al mismo punto.

### Capa 2 — Progresión del duelo (estado en memoria, efímero)

El conocimiento del jugador (`knownInsults` y `unlockedResponses`) **vive únicamente en el estado React** durante la sesión del duelo. **Se pierde al salir de la sala.**

```ts
// Estado en memoria (useState / useReducer), NO en localStorage
interface SessionDuelState {
  knowledge: {
    knownInsults: string[]; // Insultos desbloqueados en esta sesión
    unlockedResponses: string[]; // Respuestas desbloqueadas en esta sesión
  };
  bladoScore: number;
  playerScore: number;
  confusionActivated: boolean;
  usedInsultsThisRound: string[];
}
```

> **Diseño intencional:** Al abandonar `/timba/duelo-golpes-bajos` (volver al Hub, al Home, o cerrar la pestaña), la progresión vuelve a cero. Esto refuerza el loop: el jugador sabe que si quiere aprender más, **tiene que quedarse en el duelo**. La presión narrativa queda justificada en el personaje. Blado incita a que el usuario abandone el duelo con diferentes frases, ej: _"¿Quieres abandonar el duelo? mejor ve al psicologo y dile que estas estresado... jeje"_ (abandonar: SI | NO) el boton "NO" debe estar bloqueado, no debe funcionar, solo se puede dar click en "SI". y en la "X" para cerrar el dialogo y continuar el duelo

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
  ResponseOptions.tsx         → 3 o 4 botones de respuesta según el progreso del jugador
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
  playerKnowledge: PlayerKnowledge,
): DuelInsult;

// Determina si Blado debe "confundirse" en esta ronda
function shouldBladoConfuse(
  bladoScore: number,
  playerScore: number,
  confusionCount: number, // Veces que ya se confundió en este duelo
  roundsToWin: number, // Puntos que le faltan a Blado para ganar
): boolean;

// Evalúa la respuesta del jugador
function evaluatePlayerResponse(
  insultId: string,
  chosenResponseId: string,
  allInsults: DuelInsult[],
): { correct: boolean; correctResponse: string };

// Construye las opciones de respuesta para un insulto.
// Si la respuesta correcta NO está desbloqueada → devuelve 3 opciones (todas incorrectas).
// Si la respuesta correcta SÍ está desbloqueada → devuelve 4 opciones (mezcladas aleatoriamente).
// La UI NO recibe ninguna señal de cuántas opciones "debería" haber.
function buildResponseOptions(
  insult: DuelInsult,
  playerKnowledge: PlayerKnowledge,
): ResponseOption[];

interface ResponseOption {
  id: string;
  text: string;
  isCorrect: boolean; // Solo se usa internamente al evaluar la respuesta, nunca expuesto a la UI
}

// Registra el efecto secundario de que Blado atacó con un insulto:
// agrega el insulto a knownInsults del jugador (puede usarlo en su turno)
function onBladoAttacked(
  insultId: string,
  knowledge: PlayerKnowledge,
): PlayerKnowledge;

// Registra el efecto secundario de que el jugador vio a Blado responder:
// agrega la respuesta a unlockedResponses del jugador
function onPlayerWitnessedBladoResponse(
  insultId: string,
  knowledge: PlayerKnowledge,
): PlayerKnowledge;
```

---

## Paleta de Insultos MVP (14 insultos — Primeros 2 packs)

### Pack A - Insultos

| ID      | Insulto                                                                  |
| ------- | ------------------------------------------------------------------------ |
| INS-001 | ¡Tenés el cerebro quemado por TikTok!                                    |
| INS-002 | ¡Tu mama es tan gorda que es mas facil saltarla que rodearla!            |
| INS-003 | ¡La inflacion es un fenomeno monetario determinado por... !              |
| INS-004 | ¡Tus ancestros deben estar avergonzados de haberse reproducido!          |
| INS-005 | ¡Peleas con la misma gracia que un mate sin yerba!                       |
| INS-006 | ¡En el infierno, tu nivel de amenaza me daría cosquillas!                |
| INS-007 | ¡Si el coraje fuese agua, no te alcanzaría ni para secarte las lágrimas! |

### Pack A — Respuestas correctas

| ID      | Respuesta correcta                                                   |
| ------- | -------------------------------------------------------------------- |
| INS-001 | Mirando tetas y gatitos soy feliz.                                   |
| INS-002 | por lo menos tengo, vos fuiste adoptado por travestis                |
| INS-003 | ... la oferta y demanda del tipo de cambio, no soy kuka.              |
| INS-004 | Los míos al menos existieron fuera de una pesadilla de azufre.       |
| INS-005 | Por eso vengo a que me enseñes, diablillo de pacotilla.              |
| INS-006 | Las cosquillas son lo único que lograrías causar en cualquier plano. |
| INS-007 | Prefiero ahogarme en cobardía que flotar en tu soberbia.             |

### Pack B — Insultos

| ID      | Insulto                                             | Respuesta                                                                   |
| ------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| ATK-001 | ¡Sos tan chico que hasta tu sombra te da compasión! | ¡Mi sombra gobierna reinos que vos ni imaginarías, mortal!                  |
| ATK-002 | ¡Con esa cara tuya, el espejo cobra seguro!         | ¡Los espejos explotan de envidia al verme, ignorante!                       |
| ATK-003 | ¡Tus chistes son tan viejos que tienen moho!        | ¡Son tan clásicos que volverán a ponerse de moda cuando vos ya no estés!    |
| ATK-004 | ¡Hasta las llamas del infierno te esquivan!         | ¡Me las reservo para ocasiones especiales, como este insulto mediocre!      |
| ATK-005 | ¡Leí libros con más personalidad que vos!           | ¡Por lo menos los libros tienen algo que decir, cosa que vos claramente no! |
| ATK-006 | ¡Sos tan predecible que ya sé lo que vas a decir!   | ¡Entonces ya sabrás que vas a perder, y sin embargo acá seguís!             |
| ATK-007 | ¡Blado el guardián... ¿de qué? ¿Del polvo?          | ¡Del polvo que quedarás vos cuando te aplaste mi ingenio!                   |

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

4. **¿El nombre del personaje se usa en los insultos?** Blado podría personalizar sus insultos con el nombre del usuario: _"¡Alexis, tus respuestas son tan vacías..."_  
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
