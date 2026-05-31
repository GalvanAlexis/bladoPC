export type GameTag = 'Arcade' | 'Estrategia' | 'Puzzle' | 'Habilidad' | 'RPG';

export interface GameEntry {
  id: string;
  title: string;
  shortDesc: string;
  bladoQuote: string;
  previewGif: string;
  href: string;
  tags: GameTag[];
  available: boolean;
  accentColor?: string;
}

export const TAG_COLORS: Record<GameTag, string> = {
  Arcade: '#dc2626',
  Estrategia: '#9333ea',
  Puzzle: '#2563eb',
  Habilidad: '#39ff14',
  RPG: '#f59e0b',
};

export const GAMES: GameEntry[] = [
  {
    id: 'duelo-golpes-bajos',
    title: 'Duelo con Golpes Bajos',
    shortDesc: 'Las palabras cortan más que las espadas. Demuestra tu ingenio.',
    bladoQuote: '¡Ah, el duelo verbal! Un arte que tú, mortal, aún no dominas... ¿Te atreves a enfrentarme? Jeje.',
    previewGif: '/games/placeholder.svg',
    href: '/timba/duelo-golpes-bajos',
    tags: ['RPG', 'Estrategia'],
    available: true,
    accentColor: '#dc2626',
  },
  {
    id: 'snake-arcano',
    title: 'Serpiente Arcana',
    shortDesc: 'La serpiente del abismo devora almas.',
    bladoQuote: '¡Ah, la Serpiente Arcana! Un clásico del inframundo... pero con mi toque maligno. Guíala con cuidado, mortal, o te devorará a TI.',
    previewGif: '/games/placeholder.svg',
    href: '/timba/snake-arcano',
    tags: ['Arcade', 'Habilidad'],
    available: false,
  },
  {
    id: 'tetris-infernal',
    title: 'Tetris Infernal',
    shortDesc: 'Bloques forjados en el fuego.',
    bladoQuote: 'En el infierno no hay líneas completas, sólo bloques que arden más rápido. ¡A ver cuánto aguantas!',
    previewGif: '/games/placeholder.svg',
    href: '/timba/tetris-infernal',
    tags: ['Puzzle', 'Arcade'],
    available: false,
  },
  {
    id: 'buscaminas-demoniaco',
    title: 'Minas del Averno',
    shortDesc: 'Un paso en falso y boom.',
    bladoQuote: 'Cada cuadro es un pacto con un demonio ciego. Haz clic y reza para no despertarlo.',
    previewGif: '/games/placeholder.svg',
    href: '/timba/buscaminas-demoniaco',
    tags: ['Estrategia', 'Puzzle'],
    available: false,
  },
  {
    id: 'rpg-quest',
    title: 'Quest de las Sombras',
    shortDesc: 'Aventura de texto RPG.',
    bladoQuote: 'Aquí no hay gráficos, mortal. Sólo tu imaginación y mi cruel narración. ¡Elige tu perdición!',
    previewGif: '/games/placeholder.svg',
    href: '/timba/rpg-quest',
    tags: ['RPG'],
    available: false,
  }
];
