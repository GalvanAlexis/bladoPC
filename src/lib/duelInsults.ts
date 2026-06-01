type InsultCategory = 
  | 'inteligencia' 
  | 'coraje' 
  | 'habilidad' 
  | 'linaje' 
  | 'existencia' 
  | 'politica';

export interface DuelInsult {
  id: string;
  attacker: string;
  correctResponse: string;
  category: InsultCategory;
  unlocked: boolean; // Estado inicial por defecto
}

// Pack A - 14 insultos (7 para Blado, 7 para el jugador inicialmente)
// La mecánica permite que se mezclen luego.
export const INSULTS: DuelInsult[] = [
  {
    id: "INS-001",
    attacker: "¡Tenés el cerebro quemado por TikTok!",
    correctResponse: "Mirando tetas y gatitos soy feliz.",
    category: "inteligencia",
    unlocked: false
  },
  {
    id: "INS-002",
    attacker: "¡Tu mama es tan gorda que es mas facil saltarla que rodearla!",
    correctResponse: "Por lo menos tengo, vos fuiste adoptado por travestis.",
    category: "linaje",
    unlocked: false
  },
  {
    id: "INS-003",
    attacker: "¡La inflacion es un fenomeno monetario determinado por... !",
    correctResponse: "La oferta y demanda del tipo de cambio, no soy kuka.",
    category: "politica",
    unlocked: false
  },
  {
    id: "INS-004",
    attacker: "¡Eres un lindo Femboy, te quedas en la caverna esta noche? jeje!",
    correctResponse: "¡Era obvio que te gustaban los hombres!",
    category: "existencia",
    unlocked: false
  },
  {
    id: "INS-005",
    attacker: "¡Intenta pelear como ALGO, no como OLGA!",
    correctResponse: "¡Es cierto! solo uso un 1% de mi fuerza y basta para ganarte!",
    category: "habilidad",
    unlocked: false
  },
  {
    id: "INS-006",
    attacker: "¡Si la luz no tiene masa, por que se curva delante de masiva gravedad?!",
    correctResponse: "La distorsión del espacio-tiempo ejercida por el objeto.",
    category: "inteligencia",
    unlocked: false
  },
  {
    id: "INS-007",
    attacker: "¿Ya tan cansado, gordito? Con razon se fue con otro! jeje",
    correctResponse: "No es cansancio, es aburrimiento... tus nalgas se ven divertidas!",
    category: "coraje",
    unlocked: false
  }
];
