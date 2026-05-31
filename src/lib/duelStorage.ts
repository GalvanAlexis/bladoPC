import { AvatarConfig, DEFAULT_AVATAR } from './avatarConfig';

const AVATAR_STORAGE_KEY = "duelo_avatar";

export interface PersistedAvatarState {
  avatar: AvatarConfig;
  stats: {
    duelsPlayed: number;
    bestScore: number;
  };
}

const DEFAULT_STATE: PersistedAvatarState = {
  avatar: DEFAULT_AVATAR,
  stats: {
    duelsPlayed: 0,
    bestScore: 0
  }
};

export function getAvatarState(): PersistedAvatarState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  
  const data = localStorage.getItem(AVATAR_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as PersistedAvatarState;
    } catch (e) {
      console.error("Error parsing duel avatar data:", e);
      return DEFAULT_STATE;
    }
  }
  return DEFAULT_STATE;
}

export function saveAvatarState(state: PersistedAvatarState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(state));
  }
}

export function savePlayerAvatar(avatar: AvatarConfig): void {
  const currentState = getAvatarState();
  saveAvatarState({
    ...currentState,
    avatar
  });
}

export function updatePlayerStats(score: number): void {
  const currentState = getAvatarState();
  saveAvatarState({
    ...currentState,
    stats: {
      duelsPlayed: currentState.stats.duelsPlayed + 1,
      bestScore: Math.max(currentState.stats.bestScore, score)
    }
  });
}

export function hasCreatedAvatar(): boolean {
  if (typeof window === 'undefined') return false;
  const data = localStorage.getItem(AVATAR_STORAGE_KEY);
  // Asumimos que si existe en localStorage, el usuario ya pasó por el creador.
  return !!data;
}
