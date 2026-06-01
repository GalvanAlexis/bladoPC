import { AvatarConfig, DEFAULT_AVATAR } from './avatarConfig';
import { PlayerKnowledge } from './duelEngine';
import { INSULTS } from './duelInsults';

const AVATAR_STORAGE_KEY = "duelo_avatar";
const KNOWLEDGE_STORAGE_KEY = "duelo_knowledge";
const SESSION_COUNTS_KEY = "duelo_session_counts";

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

function saveAvatarState(state: PersistedAvatarState): void {
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

// ==========================================
// KNOWLEDGE (Persiste recargas)
// ==========================================

export function getKnowledgeState(): PlayerKnowledge {
  const defaultKnowledge: PlayerKnowledge = {
    knownInsults: [INSULTS[0].id, INSULTS[1].id], // Empieza con 2
    unlockedResponses: []
  };

  if (typeof window === 'undefined') return defaultKnowledge;
  
  const data = localStorage.getItem(KNOWLEDGE_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as PlayerKnowledge;
    } catch (e) {
      console.error("Error parsing duel knowledge:", e);
      return defaultKnowledge;
    }
  }
  return defaultKnowledge;
}

export function saveKnowledgeState(knowledge: PlayerKnowledge): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KNOWLEDGE_STORAGE_KEY, JSON.stringify(knowledge));
  }
}

// ==========================================
// SESSION COUNTS (Se resetea al cerrar pestaña)
// ==========================================

export interface SessionDuelCounts {
  player: number;
  blado: number;
}

export function getSessionDuelCounts(): SessionDuelCounts {
  const defaultCounts = { player: 0, blado: 0 };
  if (typeof window === 'undefined') return defaultCounts;
  
  const data = sessionStorage.getItem(SESSION_COUNTS_KEY);
  if (data) {
    try {
      return JSON.parse(data) as SessionDuelCounts;
    } catch (e) {
      console.error("Error parsing session counts:", e);
      return defaultCounts;
    }
  }
  return defaultCounts;
}

export function incrementSessionDuelCount(winner: 'player' | 'blado'): void {
  const counts = getSessionDuelCounts();
  counts[winner] += 1;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_COUNTS_KEY, JSON.stringify(counts));
  }
}
