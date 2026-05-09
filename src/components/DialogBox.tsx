"use client";

import React, { useState, useEffect } from 'react';

export interface Choice {
  label: string;
  action: () => void;
}

interface DialogBoxProps {
  speakerName: string;
  text: string;
  choices: Choice[];
  onAskQuestion?: (question: string) => void;
  isTyping?: boolean;
  onClose?: () => void;
}

export default function DialogBox({ speakerName, text, choices, onAskQuestion, isTyping, onClose }: DialogBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 20); // typing speed

    return () => clearInterval(interval);
  }, [text]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onAskQuestion) {
      onAskQuestion(inputValue);
      setInputValue('');
      setShowInput(false);
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
      <div className="bg-black/80 backdrop-blur-sm border-2 border-crimson rounded-lg p-6 shadow-[0_0_30px_rgba(220,38,38,0.5)] font-mono relative">
        
        {/* Name Badge */}
        <div className="absolute -top-4 left-6 bg-crimson text-black font-bold px-4 py-1 rounded-sm uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(220,38,38,0.8)]">
          {speakerName}
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-4 right-6 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 font-bold px-3 py-1 rounded-sm uppercase tracking-widest text-sm border border-gray-700 transition-colors"
            title="Cerrar dialogo"
          >
            Cerrar
          </button>
        )}

        {/* Text */}
        <div className="text-gray-200 text-lg min-h-[80px] mb-4">
          {displayedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>

        {/* Action Area */}
        <div className="flex flex-col gap-2 mt-4">
          {choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={choice.action}
              className="text-left px-4 py-2 hover:bg-gray-800 text-toxic border border-transparent hover:border-toxic rounded transition-colors text-sm uppercase tracking-wide"
            >
              {choice.label}
            </button>
          ))}

          {onAskQuestion && !showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="text-left px-4 py-2 hover:bg-gray-800 text-sulfur border border-transparent hover:border-sulfur rounded transition-colors text-sm uppercase tracking-wide"
            >
              Hacer una pregunta abierta...
            </button>
          )}

          {showInput && (
            <form onSubmit={handleAsk} className="flex mt-2">
              <span className="text-sulfur p-2">_</span>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent border-b border-sulfur text-sulfur p-2 outline-none focus:border-toxic focus:text-toxic transition-colors"
                placeholder="Preguntale a Blado..."
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
