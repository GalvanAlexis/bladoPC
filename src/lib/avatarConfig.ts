export type SkinTone = 'light' | 'medium' | 'dark' | 'green' | 'blue' | 'red';
export type HairStyle = 'rapado' | 'largo' | 'rulos' | 'mohawk' | 'gorra' | 'cola' | 'despeinado' | 'ninguno';
export type HairColor = 'rubio' | 'negro' | 'pelirrojo' | 'azul' | 'verde' | 'rosa' | 'blanco' | 'castaño' | 'gris' | 'violeta';
export type FaceFeature = 'cicatriz' | 'parche' | 'anteojos' | 'tatuaje' | 'ninguno';
export type Expression = 'serio' | 'sonriente' | 'intimidante';
export type Outfit = 'pirata' | 'espartano' | 'vikingo' | 'rockero' | 'caballero' | 'ninja' | 'samurai' | 'gaucho' | 'lord';

export type WarriorClass = 'vikingo' | 'ninja' | 'pirata' | 'caballero' | 'samurai' | 'gaucho';

export interface AvatarConfig {
  name: string;
  warriorClass?: WarriorClass; // Nuevo campo opcional para la v2
  // Mantenemos estos para retrocompatibilidad con avatares viejos guardados
  skinTone: SkinTone;
  hairStyle: HairStyle;
  hairColor: HairColor;
  faceFeature: FaceFeature;
  expression: Expression;
  outfit: Outfit;
}

export const WARRIOR_CLASSES: Record<WarriorClass, Omit<AvatarConfig, 'name' | 'warriorClass'>> = {
  vikingo: { skinTone: 'light', hairStyle: 'rapado', hairColor: 'rubio', faceFeature: 'cicatriz', expression: 'intimidante', outfit: 'vikingo' },
  ninja: { skinTone: 'medium', hairStyle: 'ninguno', hairColor: 'negro', faceFeature: 'ninguno', expression: 'serio', outfit: 'ninja' },
  pirata: { skinTone: 'dark', hairStyle: 'largo', hairColor: 'pelirrojo', faceFeature: 'parche', expression: 'sonriente', outfit: 'pirata' },
  caballero: { skinTone: 'medium', hairStyle: 'rapado', hairColor: 'negro', faceFeature: 'ninguno', expression: 'serio', outfit: 'caballero' },
  samurai: { skinTone: 'light', hairStyle: 'cola', hairColor: 'negro', faceFeature: 'ninguno', expression: 'intimidante', outfit: 'samurai' },
  gaucho: { skinTone: 'medium', hairStyle: 'largo', hairColor: 'castaño', faceFeature: 'ninguno', expression: 'sonriente', outfit: 'gaucho' }
};

export const WARRIOR_EMOJIS: Record<WarriorClass, string> = {
  vikingo: '⚔️',
  ninja: '🥷',
  pirata: '🏴‍☠️',
  caballero: '🛡️',
  samurai: '⛩️',
  gaucho: '🌵'
};

export const DEFAULT_AVATAR: AvatarConfig = {
  name: 'Mortal',
  warriorClass: 'vikingo',
  ...WARRIOR_CLASSES.vikingo
};

export function buildAvatarUrl(config: AvatarConfig): string {
  // En v2 (si configuró una clase o si se proveen las variables viejas)
  // Siempre construimos el seed de la misma forma para compatibilidad
  const seedString = `${config.skinTone}-${config.hairStyle}-${config.hairColor}-${config.faceFeature}-${config.expression}-${config.outfit}`;
  const baseUrl = "https://api.dicebear.com/10.x/pixel-art/svg";
  const params = new URLSearchParams({
    seed: seedString,
    backgroundColor: "0a0a0a",
  });
  return `${baseUrl}?${params.toString()}`;
}
