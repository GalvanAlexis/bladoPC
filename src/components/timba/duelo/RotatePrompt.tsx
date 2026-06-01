import React from 'react';

interface RotatePromptProps {
  onDismiss?: () => void;
}

export default function RotatePrompt({ onDismiss }: RotatePromptProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-6 text-center select-none landscape:hidden">
      <div className="border-2 border-crimson p-8 bg-[#110505] shadow-[0_0_30px_rgba(220,38,38,0.4)] max-w-sm rounded-xl">
        <div className="text-6xl mb-6 animate-pulse">📱→📺</div>
        <h2 className="text-xl font-bold text-crimson mb-4 uppercase tracking-widest">
          ¡Gira tu dispositivo!
        </h2>
        <p className="text-gray-300 mb-8 leading-relaxed text-sm">
          Este duelo de insultos es demasiado intenso para una pantalla vertical. Gira tu móvil para continuar la batalla de forma horizontal.
        </p>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            [ Ignorar ]
          </button>
        )}
      </div>
    </div>
  );
}
