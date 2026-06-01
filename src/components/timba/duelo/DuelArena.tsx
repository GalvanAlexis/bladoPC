import React, { useState, useEffect } from 'react';
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
  | 'BLADO_ATTACKING' // Blado dice el insulto, esperando respuesta del jugador
  | 'PLAYER_ATTACKING' // Jugador elige con qué insulto atacar
  | 'EVALUATING' // Mostrando feedback visual (verde/rojo) y actualizando puntaje
  | 'BLADO_RESPONDING' // Blado da la respuesta correcta a un ataque del jugador
  | 'TRANSITION'; // Pequeña pausa antes de cambiar de turno

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

  useEffect(() => {
    if (isMobile && typeof screen !== 'undefined') {
      try {
        const orientation = screen.orientation as any;
        if (orientation && orientation.lock) {
          orientation.lock('landscape').catch(() => {
            setShowRotatePrompt(true);
          });
        } else {
          // Fallback para iOS o browsers que no soportan la API
          const isPortrait = window.innerHeight > window.innerWidth;
          if (isPortrait) setShowRotatePrompt(true);
        }
      } catch (e) {
        setShowRotatePrompt(true);
      }
    }
    
    return () => {
      if (typeof screen !== 'undefined') {
        const orientation = screen.orientation as any;
        if (orientation && orientation.unlock) {
          try {
            orientation.unlock();
          } catch (e) {}
        }
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === 'BLADO_RESPONDING' || phase === 'EVALUATING') {
        advanceTurn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, activeInsult, selectedOptionId, responseOptions, playerScore, bladoScore, knowledge]);

  const startBladoTurn = () => {
    setCurrentAttacker('blado');
    const insult = selectBladoInsult(INSULTS, usedInsults, knowledge);
    setActiveInsult(insult);
    setUsedInsults(prev => [...prev, insult.id]);
    
    // Blado atacó, el jugador aprende el insulto
    setKnowledge(prev => onBladoAttacked(insult.id, prev));
    
    setResponseOptions(buildResponseOptions(insult, INSULTS, knowledge));
    setSelectedOptionId(null);
    setPhase('BLADO_ATTACKING');
  };

  const startPlayerTurn = () => {
    setCurrentAttacker('player');
    setActiveInsult(null);
    setSelectedOptionId(null);
    setPhase('PLAYER_ATTACKING');
  };

  const handleTimeout = () => {
    if (phase !== 'BLADO_ATTACKING') return;
    // El jugador no respondió a tiempo
    setSelectedOptionId(null);
    setPhase('EVALUATING');
  };

  const handlePlayerResponseSelection = (option: ResponseOption) => {
    if (phase !== 'BLADO_ATTACKING' || !activeInsult) return;
    
    setSelectedOptionId(option.id);
    setPhase('EVALUATING');
  };

  const handlePlayerAttackSelection = (insultId: string) => {
    const insult = INSULTS.find(i => i.id === insultId);
    if (!insult) return;

    setActiveInsult(insult);
    setPhase('BLADO_RESPONDING');
  };

  const advanceTurn = () => {
    if (phase === 'BLADO_RESPONDING') {
      // Blado es invencible y SIEMPRE responde bien
      setKnowledge(prev => onPlayerWitnessedBladoResponse(activeInsult!.id, prev));
      setBladoScore(prev => {
        const newScore = prev + 1;
        checkWinCondition(playerScore, newScore);
        return newScore;
      });
    } else if (phase === 'EVALUATING') {
      if (selectedOptionId) {
        const option = responseOptions.find(o => o.id === selectedOptionId);
        if (option?.isCorrect) {
          setPlayerScore(prev => {
            const newScore = prev + 1;
            checkWinCondition(newScore, bladoScore);
            return newScore;
          });
        } else {
          setBladoScore(prev => {
            const newScore = prev + 1;
            checkWinCondition(playerScore, newScore);
            return newScore;
          });
        }
      } else {
        // No respondió a tiempo
        setBladoScore(prev => {
          const newScore = prev + 1;
          checkWinCondition(playerScore, newScore);
          return newScore;
        });
      }
    }
  };

  const checkWinCondition = (newPlayerScore: number, newBladoScore: number) => {
    if (newBladoScore >= 4 || newPlayerScore >= 4) {
      setTimeout(() => onFinishDuel(newPlayerScore, newBladoScore, knowledge), 1000);
    } else {
      // Cambiar de turno
      setPhase('TRANSITION');
      setTimeout(() => {
        if (currentAttacker === 'blado') {
          startPlayerTurn();
        } else {
          startBladoTurn();
        }
      }, 1000);
    }
  };

  // Iniciar la primera ronda siempre con el jugador atacando
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startPlayerTurn();
  }, []);

  return (
    <>
      {(phase === 'BLADO_RESPONDING' || phase === 'EVALUATING') && (
        <div 
          className="fixed inset-0 z-50 cursor-pointer" 
          onClick={advanceTurn}
          aria-label="Toca cualquier parte para continuar"
        />
      )}
      {showRotatePrompt && <RotatePrompt onDismiss={() => setShowRotatePrompt(false)} />}
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full relative z-10 font-mono text-white p-1 md:p-2 pb-2 md:pb-4 overflow-hidden">
        <DuelLights playerScore={playerScore} bladoScore={bladoScore} />

        {/* Fila de Avatares compartida */}
        <div className="flex justify-between items-end w-full mt-1 md:mt-2 px-4 md:px-16 shrink-0">
          <div className={`transition-all duration-300 ${currentAttacker === 'player' ? 'scale-110 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]' : 'opacity-50'}`}>
            <AvatarRenderer config={playerAvatar} size={isMobile ? 100 : 120} />
          </div>
          <div className="text-xl md:text-3xl font-bold text-gray-800 tracking-widest px-2 pb-8">VS</div>
          <div className="flex flex-col items-end">
            <ScoreBoard 
              playerName={playerAvatar.name} 
              playerScore={sessionCounts.player} 
              bladoScore={sessionCounts.blado} 
            />
            <div className={`transition-all duration-300 mt-2 ${currentAttacker === 'blado' ? 'scale-110 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'opacity-50'}`}>
              <BladoPortrait size={isMobile ? 100 : 120} />
            </div>
          </div>
        </div>

        {/* Contenedor principal de Diálogos y Controles */}
        <div className="flex-1 flex flex-col w-full mt-1 md:mt-2 relative justify-end min-h-0">
          
          {/* Zona de Diálogo (burbujas) */}
          <div className="w-full mb-2 flex flex-col justify-end shrink-0 px-2 md:px-8">
            {activeInsult && currentAttacker === 'player' && (
              <div className="self-start mb-2 animate-in fade-in slide-in-from-left-4 duration-300">
                <InsultBubble speaker="player" text={activeInsult.attacker} />
              </div>
            )}
            
            {activeInsult && currentAttacker === 'blado' && (
              <div className="self-end mb-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <InsultBubble speaker="blado" text={activeInsult.attacker} />
              </div>
            )}

            {phase === 'BLADO_RESPONDING' && activeInsult && (
              <div className="self-end mb-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <InsultBubble speaker="blado" text={activeInsult.correctResponse} />
              </div>
            )}
          </div>

          {/* Zona de Controles (opciones, timer) */}
          <div className="w-full relative flex-1 min-h-[160px]">
            {phase === 'PLAYER_ATTACKING' && (
              <div className="absolute inset-0 bg-[#0a0a0a] border border-toxic p-3 md:p-5 overflow-y-auto shadow-[0_0_15px_rgba(57,255,20,0.2)] scrollbar-thin scrollbar-thumb-toxic/50 scrollbar-track-transparent">
                <h3 className="text-toxic text-xs md:text-sm uppercase mb-3 font-bold sticky top-0 bg-[#0a0a0a] pb-2 z-10">Selecciona tu ataque:</h3>
                <div className="space-y-2">
                  {knowledge.knownInsults.map(id => {
                    const ins = INSULTS.find(i => i.id === id);
                    if (!ins) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => handlePlayerAttackSelection(id)}
                        className="w-full text-left p-2 border border-gray-800 hover:border-toxic hover:text-toxic hover:bg-toxic/10 text-xs md:text-sm transition-colors"
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
                  onTimeout={handleTimeout} 
                />
                <div className="mt-2 md:mt-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
                  <ResponseOptions 
                    options={responseOptions}
                    disabled={false}
                    selectedId={null}
                    showFeedback={false}
                    onSelect={handlePlayerResponseSelection}
                  />
                </div>
              </div>
            )}

            {phase === 'EVALUATING' && currentAttacker === 'blado' && (
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="mt-2 md:mt-4 flex-1 overflow-y-auto pb-8">
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
