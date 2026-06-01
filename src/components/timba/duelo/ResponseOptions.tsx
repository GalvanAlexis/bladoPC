import React, { useEffect, useRef } from 'react';
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
  showFeedback,
}: ResponseOptionsProps) {
  return (
    <div className="w-full flex flex-col space-y-2.5">
      {options.map((opt, index) => {
        const isSelected = selectedId === opt.id;
        const isCorrectFeedback = showFeedback && isSelected && opt.isCorrect;
        const isWrongFeedback = showFeedback && isSelected && !opt.isCorrect;

        return (
          <OptionButton
            key={opt.id}
            option={opt}
            index={index}
            isSelected={isSelected}
            isCorrectFeedback={isCorrectFeedback}
            isWrongFeedback={isWrongFeedback}
            showFeedback={showFeedback}
            disabled={disabled}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}

interface OptionButtonProps {
  option: ResponseOption;
  index: number;
  isSelected: boolean;
  isCorrectFeedback: boolean;
  isWrongFeedback: boolean;
  showFeedback: boolean;
  disabled: boolean;
  onSelect: (option: ResponseOption) => void;
}

function OptionButton({
  option,
  index,
  isSelected,
  isCorrectFeedback,
  isWrongFeedback,
  showFeedback,
  disabled,
  onSelect,
}: OptionButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Fuerza re-aplicación de animación cuando cambia el feedback
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isCorrectFeedback || isWrongFeedback) {
      el.classList.remove('response-option--correct', 'response-option--wrong');
      // Trigger reflow para reiniciar la animación
      void el.offsetWidth;
      if (isCorrectFeedback) el.classList.add('response-option--correct');
      if (isWrongFeedback) el.classList.add('response-option--wrong');
    }
  }, [isCorrectFeedback, isWrongFeedback]);

  let baseStyle =
    'border-gray-800 text-gray-400 bg-[#0a0a0a]';
  let hoverStyle =
    'hover:border-toxic hover:text-toxic hover:bg-[oklch(0.85_0.3_145_/_0.06)] hover:shadow-[0_0_12px_oklch(0.85_0.3_145_/_0.25)]';

  if (isCorrectFeedback) {
    baseStyle =
      'border-toxic text-toxic bg-[oklch(0.85_0.3_145_/_0.12)] shadow-[0_0_20px_oklch(0.85_0.3_145_/_0.6),inset_0_0_20px_oklch(0.85_0.3_145_/_0.08)]';
    hoverStyle = '';
  } else if (isWrongFeedback) {
    baseStyle =
      'border-crimson text-crimson bg-[oklch(0.55_0.25_25_/_0.12)] shadow-[0_0_20px_oklch(0.55_0.25_25_/_0.6),inset_0_0_20px_oklch(0.55_0.25_25_/_0.08)]';
    hoverStyle = '';
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      onClick={() => onSelect(option)}
      className={`response-option w-full text-left p-3 md:p-4 font-mono text-sm border-2 transition-all duration-200 ${baseStyle} ${hoverStyle} ${
        disabled && !isSelected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={{ '--option-index': index } as React.CSSProperties}
    >
      {/* Badge de letra arcade */}
      <span
        className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold mr-2 border align-middle ${
          isCorrectFeedback
            ? 'border-toxic text-toxic bg-toxic/10'
            : isWrongFeedback
            ? 'border-crimson text-crimson bg-crimson/10'
            : 'border-gray-700 text-gray-500'
        }`}
      >
        {String.fromCharCode(65 + index)}
      </span>
      {option.text}
    </button>
  );
}
