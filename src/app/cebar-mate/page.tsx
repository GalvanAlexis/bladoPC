"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
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
    
    // Bienvenida
    setMessages([{ role: 'assistant', content: "¡Pase, mortal! El agua ya está a 80 grados y la yerba despolvada. Siéntese... ¿De qué charlamos mientras cebamos?" }]);
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
          topic: 'mate', // Tópico para cebar mates
        }),
      });

      if (!res.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await res.json();
      const reply = data.reply || "Se me lavó el mate, no sé qué decirte.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Maldición, el agua hirvió y quemé la yerba. (Error de conexión)." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] font-mono text-gray-200">
      {/* Header */}
      <header className="h-14 border-b border-toxic/30 bg-black/50 flex items-center px-4 justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-toxic/20 flex items-center justify-center border border-toxic shadow-[0_0_10px_rgba(57,255,20,0.5)] text-xl">
            🧉
          </div>
          <div>
            <h1 className="text-toxic font-bold uppercase tracking-widest text-sm">Ronda de Mates</h1>
            <p className="text-[10px] text-gray-500">con Blado</p>
          </div>
        </div>
        <Link 
          href="/"
          className="text-xs uppercase border border-gray-700 px-3 py-1 rounded hover:bg-gray-800 transition-colors"
        >
          Volver
        </Link>
      </header>

      {/* Chat Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-w-3xl mx-auto w-full custom-scrollbar"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-lg text-sm md:text-base leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-toxic text-black rounded-tr-none' 
                  : 'bg-[#111] border border-toxic/30 rounded-tl-none shadow-[0_0_15px_rgba(57,255,20,0.1)] text-gray-300'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="bg-[#111] border border-toxic/30 p-3 rounded-lg rounded-tl-none text-sm text-gray-500 animate-pulse">
              Cebando...
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 border-t border-toxic/20 bg-[#0a0a0a]">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Pregunta o comenta algo..."
            className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-toxic focus:ring-1 focus:ring-toxic disabled:opacity-50 transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-toxic text-black px-6 rounded-lg font-bold uppercase tracking-wider hover:bg-[#32e012] disabled:opacity-50 transition-colors"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}
