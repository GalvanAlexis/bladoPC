import React from 'react';
import Link from 'next/link';
import { GAMES } from '@/lib/games';

export default function GamePage({ params }: { params: { game: string } }) {
  const game = GAMES.find(g => g.id === params.game);

  if (!game || !game.available) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black font-mono px-4 text-center select-none">
        <div className="border border-crimson/50 p-8 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.3)] max-w-xl bg-black/80 z-10">
          <h1 className="text-3xl font-bold text-crimson mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
            {game?.title || "Vacío Arcano"}
          </h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Los dados del destino aún se están tallando y las cartas se están pintando con tinta de demonio...
            <br /><br />
            <span className="text-toxic">Este módulo está en construcción.</span>
          </p>
          <Link 
            href="/timba"
            className="inline-block border border-toxic text-toxic px-6 py-2 rounded uppercase tracking-widest text-sm hover:bg-toxic/10 transition-colors"
          >
            Volver a la Galería
          </Link>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] pointer-events-none z-0" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/50 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold uppercase tracking-widest" style={{ color: game.accentColor || '#dc2626' }}>
          {game.title}
        </h1>
        <Link href="/timba" className="text-gray-400 hover:text-toxic transition-colors text-sm uppercase">
          [ Volver ]
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <p className="text-gray-500 animate-pulse z-10">Cargando motor de juego...</p>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_black_100%)] pointer-events-none z-0" />
      </div>
    </div>
  );
}
