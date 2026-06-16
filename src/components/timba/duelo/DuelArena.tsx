import React, { useState, useEffect, useRef } from 'react';
import {
  PlayerKnowledge,
  ResponseOption,
  selectBladoInsult,
  buildResponseOptions,
  onBladoAttacked,
  onPlayerWitnessedBladoResponse
} from '@/lib/duelEngine';
import { INSULTS, DuelInsult } from '@/lib/duelInsults';
import { AvatarConfig } from '@/lib/avatarConfig';
import ScoreBoard from './ScoreBoard';
import DuelLights from './DuelLights';
import DuelTimer from './DuelTimer';
import InsultBubble from './InsultBubble';
import ResponseOptions from './ResponseOptions';
import AvatarRenderer from './AvatarRenderer';
import BladoPortrait from './BladoPortrait';
import RotatePrompt from './RotatePrompt';
import { useIsMobile } from '@/hooks/useIsMobile';

interface DuelArenaProps {
  playerAvatar: AvatarConfig;
  initialKnowledge: PlayerKnowledge;
  sessionCounts: { player: number; blado: number };
  onFinishDuel: (playerScore: number, bladoScore: number, finalKnowledge: PlayerKnowledge) => void;
}

type TurnPhase =
  | 'BLADO_ATTACKING'
  | 'PLAYER_ATTACKING'
  | 'EVALUATING'
  | 'BLADO_RESPONDING'
  | 'TRANSITION';

export default function DuelArena({ playerAvatar, initialKnowledge, sessionCounts, onFinishDuel }: DuelArenaProps) {
  const [bladoScore, setBladoScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [knowledge, setKnowledge] = useState<PlayerKnowledge>(initialKnowledge);
  const [usedInsults, setUsedInsults] = useState<string[]>([]);
  const [phase, setPhase] = useState<TurnPhase>('TRANSITION');
  const [currentAttacker, setCurrentAttacker] = useState<'blado' | 'player'>('blado');
  const [activeInsult, setActiveInsult] = useState<DuelInsult | null>(null);
  const [responseOptions, setResponseOptions] = useState<ResponseOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);
  const isMobile = useIsMobile();

  const knowledgeRef = useRef(knowledge);
  const currentAttackerRef = useRef(currentAttacker);
  const playerScoreRef = useRef(playerScore);
  const bladoScoreRef = useRef(bladoScore);

  const startBladoTurnRef = useRef<() => void>(() => {});
  const startPlayerTurnRef = useRef<() => void>(() => {});
  const checkWinConditionRef = useRef<(a: number, b: number) => void>(() => {});
  const handleTimeoutRef = useRef<() => void>(() => {});
  const handlePlayerResponseSelectionRef = useRef<(option: ResponseOption) => void>(() => {});
  const advanceTurnRef = useRef<() => void>(() => {});
  const handlePlayerAttackSelectionRef = useRef<(insultId: string) => void>(() => {});

  useEffect(() => {
    knowledgeRef.current = knowledge;
    currentAttackerRef.current = currentAttacker;
    playerScoreRef.current = playerScore;
    bladoScoreRef.current = bladoScore;
  }, [knowledge, currentAttacker, playerScore, bladoScore]);

  useEffect(() => {
    startBladoTurnRef.current = () => {
      setCurrentAttacker('blado');
      const insult = selectBladoInsult(INSULTS, usedInsults, knowledgeRef.current);
      setActiveInsult(insult);
      setUsedInsults(prev => [...prev, insult.id]);
      setKnowledge(prev => onBladoAttacked(insult.id, prev));
      setResponseOptions(buildResponseOptions(insult, INSULTS, knowledgeRef.current));
      setSelectedOptionId(null);
      setPhase('BLADO_ATTACKING');
    };

    startPlayerTurnRef.current = () => {
      setCurrentAttacker('player');
      setActiveInsult(null);
      setSelectedOptionId(null);
      setPhase('PLAYER_ATTACKING');
    };

    checkWinConditionRef.current = (newPlayerScore: number, newBladoScore: number) => {
      if (newBladoScore >= 4 || newPlayerScore >= 4) {
        setTimeout(() => onFinishDuel(newPlayerScore, newBladoScore, knowledgeRef.current), 1000);
      } else {
        setPhase('TRANSITION');
        setTimeout(() => {
          if (currentAttackerRef.current === 'blado') {
            startPlayerTurnRef.current();
          } else {
            startBladoTurnRef.current();
          }
        }, 1000);
      }
    };

    handleTimeoutRef.current = () => {
      if (phase !== 'BLADO_ATTACKING') return;
      setSelectedOptionId(null);
      setPhase('EVALUATING');
      setTimeout(() => {
        setBladoScore(prev => {
          const newScore = prev + 1;
          checkWinConditionRef.current(playerScoreRef.current, newScore);
          return newScore;
        });
      }, 1500);
    };

    handlePlayerResponseSelectionRef.current = (option: ResponseOption) => {
      if (phase !== 'BLADO_ATTACKING' || !activeInsult) return;
      setSelectedOptionId(option.id);
      setPhase('EVALUATING');
      setTimeout(() => {
        if (option.isCorrect) {
          setPlayerScore(prev => {
            const newScore = prev + 1;
            checkWinConditionRef.current(newScore, bladoScoreRef.current);
            return newScore;
          });
        } else {
          setBladoScore(prev => {
            const newScore = prev + 1;
            checkWinConditionRef.current(playerScoreRef.current, newScore);
            return newScore;
          });
        }
      }, 1500);
    };

    advanceTurnRef.current = () => {
      if (phase === 'BLADO_RESPONDING') {
        setKnowledge(prev => onPlayerWitnessedBladoResponse(activeInsult!.id, prev));
        setBladoScore(prev => {
          const newScore = prev + 1;
          checkWinConditionRef.current(playerScoreRef.current, newScore);
          return newScore;
        });
      }
    };

    handlePlayerAttackSelectionRef.current = (insultId: string) => {
      const insult = INSULTS.find(i => i.id === insultId);
      if (!insult) return;
      setActiveInsult(insult);
      setPhase('BLADO_RESPONDING');
    };
  }, [knowledge, usedInsults, phase, activeInsult, responseOptions, playerScore, bladoScore, currentAttacker, onFinishDuel]);

  useEffect(() => {
    if (isMobile && typeof screen !== 'undefined') {
      try {
        const orientation = (screen as Screen & { orientation?: { lock: (o: string) => Promise<void>; unlock: () => void } }).orientation;
        if (orientation && orientation.lock) {
          orientation.lock('landscape').catch(() => setShowRotatePrompt(true));
        } else {
          const isPortrait = window.innerHeight > window.innerWidth;
          if (isPortrait) setTimeout(() => setShowRotatePrompt(true), 0);
        }
      } catch {
        setTimeout(() => setShowRotatePrompt(true), 0);
      }
    }

    return () => {
      if (typeof screen !== 'undefined') {
        const orientation = (screen as Screen & { orientation?: { lock: (o: string) => Promise<void>; unlock: () => void } }).orientation;
        if (orientation && orientation.unlock) {
          try { orientation.unlock(); } catch { /* ignore */ }
        }
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && phase === 'BLADO_RESPONDING') {
        advanceTurnRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  useEffect(() => {
    startPlayerTurnRef.current();
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
          boxShadow: 'inset 0 0 150px rgba(220, 38, 38, 0.1)'
        }}
      />

      {phase === 'BLADO_RESPONDING' && (
        <div
          className="fixed inset-0 z-50 cursor-pointer"
          onClick={() => advanceTurnRef.current()}
          aria-label="Toca cualquier parte para continuar"
        />
      )}

      {showRotatePrompt && <RotatePrompt onDismiss={() => setShowRotatePrompt(false)} />}

      <div className="w-full max-w-4xl mx-auto flex flex-col h-full relative z-10 font-mono text-white p-1 md:p-2 pb-2 md:pb-4 overflow-hidden">
        <DuelLights playerScore={playerScore} bladoScore={bladoScore} />

        <div className="flex justify-between items-end w-full mt-1 md:mt-2 px-4 md:px-16 shrink-0">
          <div
            className={`transition-all duration-300 ${currentAttacker === 'player' ? 'scale-110 z-20' : 'opacity-60 scale-95'}`}
            style={{ filter: currentAttacker === 'player' ? 'drop-shadow(0 0 30px oklch(0.85 0.3 145 / 0.4))' : 'none' }}
          >
            <AvatarRenderer config={playerAvatar} size={isMobile ? 100 : 120} />
          </div>

          <div className="text-2xl md:text-4xl font-bold vs-text tracking-widest px-2 pb-8">VS</div>

          <div className="flex flex-col items-end">
            <ScoreBoard
              playerName={playerAvatar.name}
              playerScore={sessionCounts.player}
              bladoScore={sessionCounts.blado}
            />
            <div
              className={`transition-all duration-300 mt-3 ${currentAttacker === 'blado' ? 'scale-110 z-20' : 'opacity-60 scale-95'}`}
              style={{ filter: currentAttacker === 'blado' ? 'drop-shadow(0 0 30px oklch(0.55 0.25 25 / 0.5))' : 'none' }}
            >
              <BladoPortrait size={isMobile ? 100 : 120} isActive={currentAttacker === 'blado'} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col w-full mt-1 md:mt-2 relative justify-end min-h-0">
          <div className="w-full mb-3 flex flex-col justify-end shrink-0 px-2 md:px-8">
            {activeInsult && currentAttacker === 'player' && (
              <div className="self-start mb-2">
                <InsultBubble speaker="player" text={activeInsult.attacker} />
              </div>
            )}

            {activeInsult && currentAttacker === 'blado' && (
              <div className="self-end mb-2">
                <InsultBubble speaker="blado" text={activeInsult.attacker} />
              </div>
            )}

            {phase === 'BLADO_RESPONDING' && activeInsult && (
              <div className="self-end mb-2">
                <InsultBubble speaker="blado" text={activeInsult.correctResponse} />
              </div>
            )}
          </div>

          <div className="w-full relative flex-1 min-h-[160px]">
            {phase === 'PLAYER_ATTACKING' && (
              <div className="absolute inset-0 bg-[#0a0a0a] border-2 border-solid attack-panel-border p-3 md:p-5 overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-toxic/50 scrollbar-track-transparent">
                <h3 className="text-toxic text-xs md:text-sm uppercase mb-4 font-bold sticky top-0 bg-[#0a0a0a] pb-2 z-10 tracking-wider">
                  <span className="animate-pulse mr-2">&#9654;</span>
                  Selecciona tu ataque:
                </h3>
                <div className="space-y-2">
                  {knowledge.knownInsults.map(id => {
                    const ins = INSULTS.find(i => i.id === id);
                    if (!ins) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => handlePlayerAttackSelectionRef.current(id)}
                        className="w-full text-left p-3 border border-gray-800 hover:border-toxic hover:text-toxic hover:bg-[oklch(0.85_0.3_145_/_0.1)] hover:shadow-[0_0_15px_oklch(0.85_0.3_145_/_0.2)] text-xs md:text-sm transition-all duration-200"
                      >
                        &quot;{ins.attacker}&quot;
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {phase === 'BLADO_ATTACKING' && (
              <div className="absolute inset-0 flex flex-col justify-end">
                <DuelTimer
                  seconds={15}
                  isActive={true}
                  onTimeout={() => handleTimeoutRef.current()}
                />
                <div className="mt-3 md:mt-5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
                  <ResponseOptions
                    options={responseOptions}
                    disabled={false}
                    selectedId={null}
                    showFeedback={false}
                    onSelect={(opt) => handlePlayerResponseSelectionRef.current(opt)}
                  />
                </div>
              </div>
            )}

            {phase === 'EVALUATING' && currentAttacker === 'blado' && (
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="mt-3 md:mt-5 flex-1 overflow-y-auto pb-8">
                  <ResponseOptions
                    options={responseOptions}
                    disabled={true}
                    selectedId={selectedOptionId}
                    showFeedback={true}
                    onSelect={() => {}}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
