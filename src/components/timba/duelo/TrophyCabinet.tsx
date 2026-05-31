import React, { useState } from 'react';
import Link from 'next/link';

interface Trophy {
  id: string;
  name: string;
  description: string;
  bladoMockLine: string;
}

const TROPHIES: Trophy[] = [
  { id: 't1', name: 'Golpe Limpio', description: 'Gánale a Blado 4-0', bladoMockLine: '¡Ja! Ni en tus mejores sueños, mortal.' },
  { id: 't2', name: 'Sobreviviente', description: 'Gánale 5 veces a Blado', bladoMockLine: 'Sobrevivirás, pero tu dignidad ya murió.' },
  { id: 't3', name: 'Lengua de Plata', description: 'Descubre todos los insultos', bladoMockLine: 'Demasiadas palabras para un cerebro tan pequeño.' },
  { id: 't4', name: 'Perfección Absoluta', description: 'No falles ni una sola respuesta', bladoMockLine: '¿Perfección? La única perfección aquí es mi peinado.' },
  { id: 't5', name: 'Maestro de la Caverna', description: 'Derrota a Blado en 10 segundos', bladoMockLine: '10 segundos es lo que tardas en empezar a llorar.' },
  { id: 't6', name: 'Burlón Supremo', description: 'Usa el insulto final', bladoMockLine: 'Ese trofeo acumulará mucho polvo, pobrecito.' },
];

interface TrophyCabinetProps {
  onBack: () => void;
}

export default function TrophyCabinet({ onBack }: TrophyCabinetProps) {
  const [activeTrophy, setActiveTrophy] = useState<Trophy | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-toxic mb-8 uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] text-center">
        Reliquias Invaluables
      </h2>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TROPHIES.map(trophy => (
            <div 
              key={trophy.id}
              onMouseEnter={() => setActiveTrophy(trophy)}
              onMouseLeave={() => setActiveTrophy(null)}
              className="aspect-square bg-[#0a0a0a] border-2 border-gray-800 flex flex-col items-center justify-center p-2 cursor-help hover:border-gray-600 transition-colors relative"
            >
              <div className="text-4xl opacity-30 mb-2">🔒</div>
              <div className="text-xs text-gray-500 font-bold uppercase text-center">{trophy.name}</div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-64 flex flex-col items-center">
          <div className="w-32 h-32 border-4 border-crimson bg-[#110000] flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] mb-6">
            <span className="text-6xl">😈</span>
          </div>
          
          <div className="min-h-[120px] w-full bg-[#1a0a0a] border border-crimson p-4 relative">
            <div className="absolute w-4 h-4 border-t border-l border-crimson bg-[#1a0a0a] transform rotate-45 -top-2.5 left-1/2 -ml-2" />
            <p className="text-red-100 text-sm font-mono leading-relaxed italic text-center">
              {activeTrophy 
                ? `"${activeTrophy.bladoMockLine}"`
                : "Pasa el cursor sobre un trofeo para que te explique por qué nunca lo tendrás."}
            </p>
            {activeTrophy && (
              <div className="mt-4 pt-4 border-t border-red-900/50">
                <span className="text-xs text-toxic font-bold block uppercase mb-1">Requisito (Imposible):</span>
                <span className="text-xs text-gray-400">{activeTrophy.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 flex space-x-4">
        <button 
          onClick={onBack}
          className="border border-gray-700 hover:border-white text-gray-400 hover:text-white px-8 py-3 uppercase tracking-widest transition-colors font-bold text-sm"
        >
          ← Volver al Duelo
        </button>
        <Link 
          href="/timba"
          className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 uppercase tracking-widest transition-colors font-bold text-sm"
        >
          Ir al Hub
        </Link>
      </div>
    </div>
  );
}
