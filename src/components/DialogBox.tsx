"use client";

/**
 * DialogBox — ISS-048 Rebranding Portfolio Blado
 * Panel de chat corporativo, clean. Sin glow RPG.
 * Conserva: typewriter, choices, free input, onClose.
 */
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);
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
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(95%, 600px)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: 'rgba(15,15,15,0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          borderRadius: '8px',
          padding: '20px 24px 16px',
          position: 'relative',
          boxShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 1px rgba(225,29,72,0.2)',
        }}
      >

        {/* Speaker badge */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '3px 12px',
              borderRadius: '4px',
              fontFamily: 'var(--font-geist-sans)',
            }}
          >
            {speakerName}
          </div>
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '-12px',
              right: '16px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '3px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-geist-sans)',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--foreground)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            title="Cerrar"
          >
            Cerrar
          </button>
        )}

        {/* Text content */}
        <div
          className="dialog-scrollbar"
          style={{
            color: 'var(--foreground-2)',
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            lineHeight: 1.7,
            minHeight: '56px',
            maxHeight: '38vh',
            overflowY: 'auto',
            marginBottom: '16px',
            fontFamily: 'var(--font-geist-sans)',
            paddingRight: '4px',
          }}
        >
          {displayedText}
          {isTyping && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: 'var(--accent)',
                marginLeft: '2px',
                animation: 'status-pulse 1s ease-in-out infinite',
                verticalAlign: 'text-bottom',
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--border)',
            marginBottom: '14px',
          }}
        />

        {/* Action area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            maxHeight: '160px',
            overflowY: 'auto',
          }}
          className="dialog-scrollbar"
        >
          {choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={choice.action}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid transparent',
                fontSize: '13px',
                color: 'var(--foreground-2)',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font-geist-sans)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--foreground)';
                e.currentTarget.style.background = 'var(--surface-2)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--foreground-2)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span style={{ color: 'var(--accent)', marginRight: '8px', fontWeight: 600 }}>›</span>
              {choice.label}
            </button>
          ))}

          {onAskQuestion && !showInput && (
            <button
              onClick={() => setShowInput(true)}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid transparent',
                fontSize: '13px',
                color: 'var(--muted)',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font-geist-sans)',
                fontStyle: 'italic',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.background = 'var(--surface-2)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span style={{ color: 'var(--accent)', marginRight: '8px' }}>+</span>
              Hacer una pregunta...
            </button>
          )}

          {showInput && (
            <form onSubmit={handleAsk} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                autoFocus
                aria-label="Pregunta a Blado"
                placeholder="Escribe tu pregunta..."
                style={{
                  flex: 1,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--foreground)',
                  padding: '8px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'var(--font-geist-sans)',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-geist-sans)',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
