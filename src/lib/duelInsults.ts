export type InsultCategory = 
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
  wrongResponses: string[];
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
    wrongResponses: [
      "¡Eso no es cierto, leo libros!",
      "Al menos no vivo en una caverna oscura.",
      "TikTok es una fuente de información muy válida."
    ],
    category: "inteligencia",
    unlocked: false
  },
  {
    id: "INS-002",
    attacker: "¡Tu mama es tan gorda que es mas facil saltarla que rodearla!",
    correctResponse: "Por lo menos tengo, vos fuiste adoptado por travestis.",
    wrongResponses: [
      "¡No te metas con mi madre, monstruo!",
      "Mi madre tiene un metabolismo lento, nada más.",
      "Eso es físicamente imposible, Blado."
    ],
    category: "linaje",
    unlocked: false
  },
  {
    id: "INS-003",
    attacker: "¡La inflacion es un fenomeno monetario determinado por... !",
    correctResponse: "La oferta y demanda del tipo de cambio, no soy kuka.",
    wrongResponses: [
      "Los monopolios formadores de precios.",
      "La guerra en Ucrania y la sequía.",
      "La avaricia de los empresarios desalmados."
    ],
    category: "politica",
    unlocked: false
  },
  {
    id: "INS-004",
    attacker: "¡Eres un lindo Femboy, te quedas en la caverna esta noche? jeje!",
    correctResponse: "¡Era obvio que te gustaban los hombres!",
    wrongResponses: [
      "No soy un femboy, es mi armadura de nivel 1.",
      "¡Aléjate de mí, demonio pervertido!",
      "Solo si me invitas un trago primero."
    ],
    category: "existencia",
    unlocked: false
  },
  {
    id: "INS-005",
    attacker: "¡Intenta pelear como ALGO, no como OLGA!",
    correctResponse: "¡Es cierto! solo uso un 1% de mi fuerza y basta para ganarte!",
    wrongResponses: [
      "¡Estoy dando lo mejor de mí, lo juro!",
      "¿Quién es Olga? No entiendo tu referencia.",
      "Mi estilo de pelea es incomprendido por mentes simples."
    ],
    category: "habilidad",
    unlocked: false
  },
  {
    id: "INS-006",
    attacker: "¡Si la luz no tiene masa, por que se curva delante de masiva gravedad?!",
    correctResponse: "La distorsión del espacio-tiempo ejercida por el objeto.",
    wrongResponses: [
      "Porque los fotones están cansados de viajar recto.",
      "Es un truco óptico de la atmósfera de tu caverna.",
      "La luz hace lo que quiere, es libre e independiente."
    ],
    category: "inteligencia",
    unlocked: false
  },
  {
    id: "INS-007",
    attacker: "¡Si el coraje fuese agua, no te alcanzaría ni para secarte las lágrimas!",
    correctResponse: "Prefiero ahogarme en cobardía que flotar en tu soberbia.",
    wrongResponses: [
      "¡Tengo mucho coraje, por eso estoy aquí!",
      "Las lágrimas purifican el alma del guerrero.",
      "El agua está sobrevalorada de todos modos."
    ],
    category: "coraje",
    unlocked: false
  },
  {
    id: "INS-008",
    attacker: "Mueves tu espada como un granjero espantando moscas.",
    correctResponse: "Muy apropiado, tú pareces una mosca gigante.",
    wrongResponses: [
      "¡Los granjeros son la base de la economía!",
      "¡Esta es una técnica milenaria secreta!",
      "Al menos espanto a las moscas, tú las atraes."
    ],
    category: "habilidad",
    unlocked: false
  },
  {
    id: "INS-009",
    attacker: "¡Mis ataques te dejarán hecho un colador!",
    correctResponse: "Genial, así el agua de tu llanto escurrirá más rápido.",
    wrongResponses: [
      "¡Tengo una armadura a prueba de coladores!",
      "Los coladores son útiles en la cocina, ignorante.",
      "¡No si yo te convierto en puré primero!"
    ],
    category: "habilidad",
    unlocked: false
  },
  {
    id: "INS-010",
    attacker: "¡Nadie me ha sacado sangre jamás!",
    correctResponse: "Qué pena, iba a donarla para estudios de demencia.",
    wrongResponses: [
      "Porque eres un cobarde y huyes rápido.",
      "¡Yo seré el primero en hacerlo!",
      "¿Acaso los demonios de tu clase tienen sangre?"
    ],
    category: "coraje",
    unlocked: false
  },
  {
    id: "INS-011",
    attacker: "¡Tu hedor me marea desde aquí!",
    correctResponse: "Es el olor del miedo... pero el tuyo.",
    wrongResponses: [
      "¡Me bañé en el río antes de venir!",
      "Tú hueles a azufre y desesperación.",
      "Es mi perfume 'Eau de Guerrero', no lo entenderías."
    ],
    category: "existencia",
    unlocked: false
  },
  {
    id: "INS-012",
    attacker: "¡Hasta un slime ciego esquivaría tus golpes!",
    correctResponse: "Claro, los slimes son más listos que tú y no se quedan parados.",
    wrongResponses: [
      "¡Los slimes son criaturas muy ágiles, no es justo!",
      "¡Mis golpes son precisos e impredecibles!",
      "¿Dónde hay un slime? ¡Odio a esos bichos!"
    ],
    category: "habilidad",
    unlocked: false
  },
  {
    id: "INS-013",
    attacker: "¡No eres más que un error en el código de la matrix!",
    correctResponse: "Y tú eres el bug que vinieron a parchear.",
    wrongResponses: [
      "¡La matrix no existe, salí un rato afuera!",
      "Soy el Elegido, no un error de código.",
      "Los errores hacen la vida más interesante."
    ],
    category: "existencia",
    unlocked: false
  },
  {
    id: "INS-014",
    attacker: "¡Tiembla ante el poder del Guardián Demoniaco!",
    correctResponse: "Tiemblo, pero de la risa que me da tu disfraz.",
    wrongResponses: [
      "¡Jamás temblaré, soy un héroe valeroso!",
      "He enfrentado cosas peores en la AFIP.",
      "Tengo frío, por eso tiemblo. Préndeme la estufa."
    ],
    category: "coraje",
    unlocked: false
  }
];
