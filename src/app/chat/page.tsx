"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  whatsappReady?: boolean;
  whatsappMessage?: string | null;
}

export default function CebarMatePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('blado_session_id');
    if (stored) {
      sessionIdRef.current = stored;
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem('blado_session_id', newId);
      sessionIdRef.current = newId;
    }
    
    // Bienvenida corporativa
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages([{ 
      role: 'assistant', 
      content: "¡Hola! Soy el asistente virtual Blado. Cuéntame, ¿qué problema tienes o en qué te puedo ayudar hoy?" 
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    const snapshot: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(snapshot);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: snapshot,
          sessionId: sessionIdRef.current,
          topic: 'mate', // Mantenemos la key para el prompt de contacto
        }),
      });

      if (!res.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await res.json();
      const reply = data.reply || "Hubo un error de comunicación.";
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: reply, 
          whatsappReady: data.whatsappReady, 
          whatsappMessage: data.whatsappMessage 
        }
      ]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Hubo un error de conexión. Por favor, intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="h-14 border-b flex items-center px-4 justify-between sticky top-0 z-10" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border text-xl" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            👋
          </div>
          <div>
            <h1 className="font-bold uppercase tracking-wider text-sm" style={{ color: 'var(--foreground)' }}>Asistente Virtual</h1>
            <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Conecta con Blado</p>
          </div>
        </div>
        <Link 
          href="/"
          className="text-xs uppercase border px-3 py-1 rounded transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--foreground-2)' }}
        >
          Volver al Home
        </Link>
      </header>

      {/* Chat Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-w-3xl mx-auto w-full custom-scrollbar"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col gap-2 max-w-[85%] md:max-w-[75%]">
              <div 
                className={`p-3.5 rounded-xl text-sm md:text-base leading-relaxed ${
                  m.role === 'user' 
                    ? 'rounded-tr-none' 
                    : 'rounded-tl-none border'
                }`}
                style={m.role === 'user' 
                  ? { background: 'var(--accent)', color: 'var(--accent-foreground)' } 
                  : { background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                {m.content}
              </div>
              
              {/* WhatsApp Button si el LLM lo habilita */}
              {m.whatsappReady && m.whatsappMessage && (
                <a 
                  href={`https://wa.me/5492241567142?text=${encodeURIComponent(m.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105"
                  style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 12px rgba(37,211,102,0.2)' }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Enviar mensaje a WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="p-3.5 rounded-xl rounded-tl-none border text-sm animate-pulse" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
              Escribiendo...
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none transition-all"
            style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 rounded-lg font-bold transition-opacity disabled:opacity-50"
            style={{ background: 'var(--foreground)', color: 'var(--background)' }}
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}
