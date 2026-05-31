import { 
  selectBladoInsult, 
  shouldBladoConfuse, 
  evaluatePlayerResponse, 
  buildResponseOptions,
  onBladoAttacked,
  onPlayerWitnessedBladoResponse,
  PlayerKnowledge
} from '../../lib/duelEngine';
import { INSULTS } from '../../lib/duelInsults';

describe('duelEngine', () => {
  let initialKnowledge: PlayerKnowledge;

  beforeEach(() => {
    initialKnowledge = {
      knownInsults: [INSULTS[0].id],
      unlockedResponses: []
    };
  });

  describe('selectBladoInsult', () => {
    it('no debe seleccionar un insulto que ya se usó en el round', () => {
      const allExceptOne = INSULTS.slice(1).map(i => i.id);
      const insult = selectBladoInsult(INSULTS, allExceptOne, initialKnowledge);
      expect(insult.id).toBe(INSULTS[0].id);
    });
  });

  describe('shouldBladoConfuse', () => {
    it('debe devolver true si Blado va 3-0 y no se confundió antes', () => {
      expect(shouldBladoConfuse(3, 0, false)).toBe(true);
      expect(shouldBladoConfuse(3, 1, false)).toBe(true);
      expect(shouldBladoConfuse(3, 2, false)).toBe(true);
    });

    it('debe devolver false si Blado no va ganando 3 puntos', () => {
      expect(shouldBladoConfuse(2, 0, false)).toBe(false);
      expect(shouldBladoConfuse(4, 0, false)).toBe(false);
    });

    it('debe devolver false si ya se confundió antes', () => {
      expect(shouldBladoConfuse(3, 0, true)).toBe(false);
    });
  });

  describe('evaluatePlayerResponse', () => {
    it('debe evaluar correctamente la respuesta', () => {
      const insult = INSULTS[0];
      const correct = evaluatePlayerResponse(insult.id, insult.correctResponse, INSULTS);
      expect(correct.correct).toBe(true);

      const wrong = evaluatePlayerResponse(insult.id, insult.wrongResponses[0], INSULTS);
      expect(wrong.correct).toBe(false);
    });
  });

  describe('buildResponseOptions', () => {
    it('debe devolver 3 opciones si la respuesta está bloqueada', () => {
      const insult = INSULTS[0];
      const options = buildResponseOptions(insult, initialKnowledge);
      
      expect(options).toHaveLength(3);
      expect(options.some(o => o.isCorrect)).toBe(false);
    });

    it('debe devolver 4 opciones si la respuesta está desbloqueada', () => {
      const insult = INSULTS[0];
      const knowledge = onPlayerWitnessedBladoResponse(insult.id, initialKnowledge);
      
      const options = buildResponseOptions(insult, knowledge);
      
      expect(options).toHaveLength(4);
      expect(options.some(o => o.isCorrect)).toBe(true);
    });
  });

  describe('onBladoAttacked', () => {
    it('debe agregar el insulto a knownInsults si no estaba', () => {
      const insultId = INSULTS[1].id;
      const knowledge = onBladoAttacked(insultId, initialKnowledge);
      expect(knowledge.knownInsults).toContain(insultId);
    });

    it('no debe duplicar el insulto si ya estaba', () => {
      const insultId = INSULTS[0].id;
      const knowledge = onBladoAttacked(insultId, initialKnowledge);
      expect(knowledge.knownInsults).toHaveLength(1);
    });
  });

  describe('onPlayerWitnessedBladoResponse', () => {
    it('debe agregar el insulto a unlockedResponses', () => {
      const insultId = INSULTS[0].id;
      const knowledge = onPlayerWitnessedBladoResponse(insultId, initialKnowledge);
      expect(knowledge.unlockedResponses).toContain(insultId);
    });
  });
});
