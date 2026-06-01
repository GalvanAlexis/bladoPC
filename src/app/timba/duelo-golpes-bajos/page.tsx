"use client";

import React, { useState, useEffect } from 'react';
import { 
  getAvatarState, 
  hasCreatedAvatar, 
  updatePlayerStats,
  getKnowledgeState,
  saveKnowledgeState,
  getSessionDuelCounts,
  incrementSessionDuelCount
} from '@/lib/duelStorage';
import { PlayerKnowledge } from '@/lib/duelEngine';
import AvatarCreator from '@/components/timba/duelo/AvatarCreator';
import DuelArena from '@/components/timba/duelo/DuelArena';
import DuelResult from '@/components/timba/duelo/DuelResult';
import TrophyCabinet from '@/components/timba/duelo/TrophyCabinet';
import Link from 'next/link';

type GameScreen = 'START_SCREEN' | 'AVATAR_CREATOR' | 'ARENA' | 'RESULT' | 'TROPHIES';

export default function DueloGolpesBajosPage() {
  const [screen, setScreen] = useState<GameScreen>('START_SCREEN');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [duelResult, setDuelResult] = useState<{player: number, blado: number} | null>(null);

  const [knowledge, setKnowledge] = useState<PlayerKnowledge | null>(null);
  const [sessionCounts, setSessionCounts] = useState<{player: number, blado: number} | null>(null);

  // Evitar hidratación mismatch y cargar estado inicial persistente
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setKnowledge(getKnowledgeState());
    setSessionCounts(getSessionDuelCounts());
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const handleStartDuel = () => {
    if (hasCreatedAvatar()) {
      setScreen('ARENA');
    } else {
      setScreen('AVATAR_CREATOR');
    }
  };

  const handleFinishDuel = (playerScore: number, bladoScore: number, finalKnowledge: PlayerKnowledge) => {
    setDuelResult({ player: playerScore, blado: bladoScore });
    updatePlayerStats(playerScore);
    
    saveKnowledgeState(finalKnowledge);
    setKnowledge(finalKnowledge);
    
    const winner = bladoScore >= 4 ? 'blado' : 'player';
    incrementSessionDuelCount(winner);
    setSessionCounts(getSessionDuelCounts());
    
    setScreen('RESULT'); // Fase 3, por ahora mostraremos un placeholder si no existe
  };

  return (
    <main className="h-screen bg-[#050505] text-white font-mono overflow-hidden flex flex-col relative select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] pointer-events-none z-0" />
      
      {/* Diálogo de abandono */}
      {showExitDialog && screen === 'ARENA' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#110505] border-2 border-crimson p-8 max-w-md w-full relative shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            <button 
              onClick={() => setShowExitDialog(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-white text-xl"
            >
              x
            </button>
            <h2 className="text-xl font-bold text-crimson mb-4 uppercase tracking-widest text-center">¿Abandonar el Duelo?</h2>
            <p className="text-gray-300 text-center mb-8">
              &quot;¿Quieres abandonar el duelo? mejor ve al psicologo y dile que estas estresado... jeje&quot;
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/timba" className="px-6 py-2 bg-crimson text-white hover:bg-red-700 font-bold uppercase transition-colors">
                SÍ
              </Link>
              <button disabled className="px-6 py-2 border border-gray-700 text-gray-600 cursor-not-allowed uppercase font-bold">
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header en Arena */}
      {screen === 'ARENA' && (
        <div className="w-full p-4 flex justify-between items-center bg-black/80 border-b border-crimson/30 relative z-20">
          <h1 className="text-crimson font-bold uppercase tracking-widest text-sm md:text-base">Duelo con Golpes Bajos</h1>
          <button 
            onClick={() => setShowExitDialog(true)}
            className="text-gray-500 hover:text-crimson text-sm uppercase transition-colors"
          >
            [ Abandonar ]
          </button>
        </div>
      )}

      <div className={`flex-1 flex flex-col relative z-10 w-full h-full overflow-hidden ${screen !== 'ARENA' ? 'items-center justify-center' : ''}`}>
        {screen === 'START_SCREEN' && (
          <div className="flex flex-col items-center justify-center text-center max-w-2xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-crimson mb-6 uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
              Duelo con Golpes Bajos
            </h1>
            <p className="text-gray-400 mb-12 max-w-lg leading-relaxed">
              Las palabras cortan más que las espadas. Enfrenta a Blado, el guardián de la caverna, en un duelo a muerte de insultos.
            </p>
            
            <div className="flex flex-col space-y-4 w-64">
              <button 
                onClick={handleStartDuel}
                className="bg-crimson hover:bg-red-700 text-white py-3 px-6 uppercase font-bold tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all"
              >
                Nuevo Duelo
              </button>
              
              {hasCreatedAvatar() && (
                <button 
                  onClick={() => setScreen('AVATAR_CREATOR')}
                  className="border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white py-3 px-6 uppercase font-bold tracking-widest transition-all"
                >
                  Cambiar Avatar
                </button>
              )}
              
              <Link 
                href="/timba"
                className="text-gray-600 hover:text-gray-400 text-sm uppercase tracking-widest mt-8 transition-colors"
              >
                ← Volver al Hub
              </Link>
            </div>
          </div>
        )}

        {screen === 'AVATAR_CREATOR' && (
          <AvatarCreator 
            onComplete={() => setScreen('ARENA')} 
            onCancel={hasCreatedAvatar() ? () => setScreen('START_SCREEN') : undefined}
          />
        )}

        {screen === 'ARENA' && knowledge && sessionCounts && (
          <DuelArena 
            playerAvatar={getAvatarState().avatar} 
            initialKnowledge={knowledge}
            sessionCounts={sessionCounts}
            onFinishDuel={handleFinishDuel} 
          />
        )}
        
        {screen === 'RESULT' && duelResult && (
          <DuelResult 
            playerScore={duelResult.player}
            bladoScore={duelResult.blado}
            onRematch={() => setScreen('ARENA')}
            onViewTrophies={() => setScreen('TROPHIES')}
          />
        )}

        {screen === 'TROPHIES' && (
          <TrophyCabinet 
            onBack={() => setScreen('START_SCREEN')}
          />
        )}
      </div>
    </main>
  );
}
