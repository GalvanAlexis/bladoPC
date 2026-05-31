export type SkinTone = 'light' | 'medium' | 'dark' | 'green' | 'blue' | 'red';
export type HairStyle = 'rapado' | 'largo' | 'rulos' | 'mohawk' | 'gorra' | 'cola' | 'despeinado' | 'ninguno';
export type HairColor = 'rubio' | 'negro' | 'pelirrojo' | 'azul' | 'verde' | 'rosa' | 'blanco' | 'castaño' | 'gris' | 'violeta';
export type FaceFeature = 'cicatriz' | 'parche' | 'anteojos' | 'tatuaje' | 'ninguno';
export type Expression = 'serio' | 'sonriente' | 'intimidante';
export type Outfit = 'pirata' | 'espartano' | 'vikingo' | 'rockero' | 'caballero' | 'ninja' | 'samurai' | 'gaucho' | 'lord';

export interface AvatarConfig {
  name: string;
  skinTone: SkinTone;
  hairStyle: HairStyle;
  hairColor: HairColor;
  faceFeature: FaceFeature;
  expression: Expression;
  outfit: Outfit;
}

export const SKIN_TONES: SkinTone[] = ['light', 'medium', 'dark', 'green', 'blue', 'red'];
export const HAIR_STYLES: HairStyle[] = ['rapado', 'largo', 'rulos', 'mohawk', 'gorra', 'cola', 'despeinado', 'ninguno'];
export const HAIR_COLORS: HairColor[] = ['rubio', 'negro', 'pelirrojo', 'azul', 'verde', 'rosa', 'blanco', 'castaño', 'gris', 'violeta'];
export const FACE_FEATURES: FaceFeature[] = ['cicatriz', 'parche', 'anteojos', 'tatuaje', 'ninguno'];
export const EXPRESSIONS: Expression[] = ['serio', 'sonriente', 'intimidante'];
export const OUTFITS: Outfit[] = ['pirata', 'espartano', 'vikingo', 'rockero', 'caballero', 'ninja', 'samurai', 'gaucho', 'lord'];

export const DEFAULT_AVATAR: AvatarConfig = {
  name: 'Mortal',
  skinTone: 'medium',
  hairStyle: 'despeinado',
  hairColor: 'negro',
  faceFeature: 'ninguno',
  expression: 'serio',
  outfit: 'pirata',
};

// DiceBear pixel-art genera el avatar en base al seed. 
// Concatenamos las propiedades para asegurar un avatar único y determinista.
export function buildAvatarUrl(config: AvatarConfig): string {
  const seedString = `${config.skinTone}-${config.hairStyle}-${config.hairColor}-${config.faceFeature}-${config.expression}-${config.outfit}`;
  // Usamos el estilo pixel-art y le pasamos el seed. 
  // Agregamos un background color oscuro por defecto para que pegue con el theme RPG oscuro.
  const baseUrl = "https://api.dicebear.com/10.x/pixel-art/svg";
  const params = new URLSearchParams({
    seed: seedString,
    backgroundColor: "0a0a0a", // Oscuro RPG
  });
  return `${baseUrl}?${params.toString()}`;
}
