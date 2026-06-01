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
    setPhase('EVALUATING');
    setTimeout(() => {
      setBladoScore(prev => {
        const newScore = prev + 1;
        checkWinCondition(playerScore, newScore);
        return newScore;
      });
    }, 1500);
  };

  const handlePlayerResponseSelection = (option: ResponseOption) => {
    if (phase !== 'BLADO_ATTACKING' || !activeInsult) return;
    
    setSelectedOptionId(option.id);
    setPhase('EVALUATING');
    
    setTimeout(() => {
      if (option.isCorrect) {
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
    }, 1500);
  };

  const handlePlayerAttackSelection = (insultId: string) => {
    const insult = INSULTS.find(i => i.id === insultId);
    if (!insult) return;

    setActiveInsult(insult);
    setPhase('BLADO_RESPONDING');
    
    setTimeout(() => {
      // Blado es invencible y SIEMPRE responde bien
      setKnowledge(prev => onPlayerWitnessedBladoResponse(insult.id, prev));
      setBladoScore(prev => {
        const newScore = prev + 1;
        checkWinCondition(playerScore, newScore);
        return newScore;
      });
    }, 2500);
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
      {showRotatePrompt && <RotatePrompt onDismiss={() => setShowRotatePrompt(false)} />}
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative z-10 font-mono text-white p-4 pb-12">
      <ScoreBoard 
        playerName={playerAvatar.name} 
        playerScore={sessionCounts.player} 
        bladoScore={sessionCounts.blado} 
      />
      <DuelLights playerScore={playerScore} bladoScore={bladoScore} />

      <div className="flex-1 flex flex-col md:flex-row mt-8 gap-8 relative">
        {/* Lado Jugador */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="mb-4">
            <AvatarRenderer config={playerAvatar} size={150} className="mx-auto md:mx-0" />
          </div>
          
          <div className="h-48 md:h-64 relative">
            {phase === 'PLAYER_ATTACKING' && (
              <div className="absolute bottom-0 w-full bg-[#0a0a0a] border border-toxic p-4 overflow-y-auto h-full shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <h3 className="text-toxic text-xs uppercase mb-3 font-bold">Selecciona tu ataque:</h3>
                <div className="space-y-2">
                  {knowledge.knownInsults.map(id => {
                    const ins = INSULTS.find(i => i.id === id);
                    if (!ins) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => handlePlayerAttackSelection(id)}
                        className="w-full text-left p-2 border border-gray-800 hover:border-toxic hover:text-toxic hover:bg-toxic/10 text-sm transition-colors"
                      >
                        &quot;{ins.attacker}&quot;
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {activeInsult && currentAttacker === 'player' && (
              <div className="absolute bottom-4 left-0">
                <InsultBubble speaker="player" text={activeInsult.attacker} />
              </div>
            )}

            {phase === 'BLADO_ATTACKING' && (
              <div className="absolute bottom-0 w-full">
                <DuelTimer 
                  seconds={15} 
                  isActive={true} 
                  onTimeout={handleTimeout} 
                />
                <div className="mt-4">
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
              <div className="absolute bottom-0 w-full">
                <ResponseOptions 
                  options={responseOptions}
                  disabled={true}
                  selectedId={selectedOptionId}
                  showFeedback={true}
                  onSelect={() => {}}
                />
              </div>
            )}
          </div>
        </div>

        {/* Lado Blado */}
        <div className="flex-1 flex flex-col justify-end items-end">
          <div className="mb-4">
            <BladoPortrait size={150} />
          </div>
          
          <div className="h-48 md:h-64 relative w-full flex justify-end">
            {activeInsult && currentAttacker === 'blado' && (
              <div className="absolute bottom-4 right-0">
                <InsultBubble speaker="blado" text={activeInsult.attacker} />
              </div>
            )}

            {phase === 'BLADO_RESPONDING' && activeInsult && (
              <div className="absolute bottom-4 right-0">
                <InsultBubble 
                  speaker="blado" 
                  text={activeInsult.correctResponse} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
