import React from 'react';
import { ResponseOption } from '@/lib/duelEngine';

interface ResponseOptionsProps {
  options: ResponseOption[];
  onSelect: (option: ResponseOption) => void;
  disabled: boolean;
  selectedId: string | null;
  showFeedback: boolean;
}

export default function ResponseOptions({ 
  options, 
  onSelect, 
  disabled, 
  selectedId, 
  showFeedback 
}: ResponseOptionsProps) {
  return (
    <div className="w-full flex flex-col space-y-3">
      {options.map((opt, index) => {
        const isSelected = selectedId === opt.id;
        
        let buttonStyle = "border-gray-800 text-gray-400 bg-[#0a0a0a] hover:border-toxic hover:text-toxic hover:bg-toxic/5";
        
        if (showFeedback && isSelected) {
          if (opt.isCorrect) {
            buttonStyle = "border-toxic text-toxic bg-toxic/20 shadow-[0_0_15px_rgba(57,255,20,0.5)] animate-pulse";
          } else {
            buttonStyle = "border-crimson text-crimson bg-crimson/20 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse";
          }
        } else if (showFeedback && opt.isCorrect) {
          // Si mostró feedback y el jugador se equivocó, NO revelamos la correcta visualmente 
          // a menos que queramos ayudarlo. Según el spec: 
          // "sin revelar cuál era la correcta si estaba bloqueada".
          // Así que no hacemos nada especial aquí para la correcta no seleccionada.
        }

        return (
          <button
            key={opt.id}
            disabled={disabled}
            onClick={() => onSelect(opt)}
            className={`w-full text-left p-4 font-mono text-sm transition-all border-2 ${buttonStyle} ${
              disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="font-bold mr-2 text-xs opacity-50">
              {String.fromCharCode(65 + index)})
            </span>
            {opt.text}
          </button>
        );
      })}
    </div>
  );
}
