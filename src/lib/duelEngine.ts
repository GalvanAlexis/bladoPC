import { DuelInsult } from './duelInsults';

export interface PlayerKnowledge {
  knownInsults: string[]; // IDs de insultos que puede usar (lanzar)
  unlockedResponses: string[]; // IDs cuya respuesta correcta ya conoce
}

export interface ResponseOption {
  id: string; // Para usar como key en React
  text: string;
  isCorrect: boolean; 
}

// Selecciona un insulto para Blado teniendo en cuenta
// cuáles ya usó en esta partida y cuáles conoce el jugador
export function selectBladoInsult(
  availableInsults: DuelInsult[],
  usedThisRound: string[],
  playerKnowledge: PlayerKnowledge,
): DuelInsult {
  const eligible = availableInsults.filter(insult => !usedThisRound.includes(insult.id));
  
  if (eligible.length === 0) {
    // Fallback por si se acaban, aunque el duelo acaba a los 4 puntos.
    return availableInsults[Math.floor(Math.random() * availableInsults.length)];
  }

  // Priorizamos insultos cuya respuesta correcta NO esté desbloqueada por el jugador,
  // para forzarlo a equivocarse y aprender. Pero agregamos algo de aleatoriedad.
  const unknownResponseInsults = eligible.filter(
    insult => !playerKnowledge.unlockedResponses.includes(insult.id)
  );

  const pool = unknownResponseInsults.length > 0 && Math.random() > 0.3 
    ? unknownResponseInsults 
    : eligible;

  return pool[Math.floor(Math.random() * pool.length)];
}

// Determina si Blado debe "confundirse" en esta ronda (Rubber band)
// Regla: si Blado va ganando 3-0 y no se ha confundido, se confunde para que quede 3-3
export function shouldBladoConfuse(
  bladoScore: number,
  playerScore: number,
  confusionActivated: boolean
): boolean {
  return bladoScore === 3 && playerScore < 3 && !confusionActivated;
}

// Evalúa la respuesta del jugador
export function evaluatePlayerResponse(
  insultId: string,
  chosenResponseText: string,
  allInsults: DuelInsult[],
): { correct: boolean; correctResponse: string } {
  const insult = allInsults.find(i => i.id === insultId);
  if (!insult) return { correct: false, correctResponse: "" };
  
  const correct = insult.correctResponse === chosenResponseText;
  return { correct, correctResponse: insult.correctResponse };
}

// Mezcla un array de forma inmutable
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Construye las opciones de respuesta para un insulto.
export function buildResponseOptions(
  insult: DuelInsult,
  playerKnowledge: PlayerKnowledge,
): ResponseOption[] {
  const options: ResponseOption[] = insult.wrongResponses.map((text, i) => ({
    id: `wrong-${i}`,
    text,
    isCorrect: false
  }));

  // Si el jugador ya desbloqueó esta respuesta, la mezclamos entre las opciones
  if (playerKnowledge.unlockedResponses.includes(insult.id)) {
    options.push({
      id: 'correct',
      text: insult.correctResponse,
      isCorrect: true
    });
  }

  return shuffle(options);
}

// Registra el efecto secundario de que Blado atacó con un insulto
export function onBladoAttacked(
  insultId: string,
  knowledge: PlayerKnowledge,
): PlayerKnowledge {
  if (knowledge.knownInsults.includes(insultId)) {
    return knowledge;
  }
  return {
    ...knowledge,
    knownInsults: [...knowledge.knownInsults, insultId]
  };
}

// Registra el efecto secundario de que el jugador vio a Blado responder
export function onPlayerWitnessedBladoResponse(
  insultId: string,
  knowledge: PlayerKnowledge,
): PlayerKnowledge {
  if (knowledge.unlockedResponses.includes(insultId)) {
    return knowledge;
  }
  return {
    ...knowledge,
    unlockedResponses: [...knowledge.unlockedResponses, insultId]
  };
}
