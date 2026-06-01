import React from 'react';
import { BookData, TopicEntry } from '@/lib/libraryTypes';

interface BookIndexProps {
  book: BookData;
  activeTopicId: string | null;
  onTopicSelect: (topic: TopicEntry) => void;
}

export default function BookIndex({ book, activeTopicId, onTopicSelect }: BookIndexProps) {
  // Calculamos el progreso
  const totalTopics = book.topics.length;
  const completedTopics = book.topics.filter(t => t.hasContent).length;
  const progressPercent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="w-full h-full flex flex-col bg-[#1f120a] border-r-2 border-[#3d2415] shadow-[5px_0_15px_rgba(0,0,0,0.5)] p-6 overflow-y-auto dialog-scrollbar relative z-10">
      
      {/* Cabecera del Índice */}
      <div className="border-b border-[#8b7355]/40 pb-4 mb-6">
        <h2 className="text-cinzel text-xl md:text-2xl text-[#f5e6ce] font-bold">
          {book.fullName}
        </h2>
        
        <div className="flex items-center gap-3 mt-3 text-sm font-crimson">
          <span className={`px-2 py-0.5 rounded ${
            book.status === 'completed' ? 'bg-[#22c55e]/20 text-[#22c55e]' :
            book.status === 'progress' ? 'bg-[#eab308]/20 text-[#eab308]' :
            'bg-gray-600/30 text-gray-400'
          }`}>
            {book.status === 'completed' ? 'Completado' : book.status === 'progress' ? 'En progreso' : 'Bloqueado'}
          </span>
          <span className="text-[#d4c3a3]">{progressPercent}% completado</span>
        </div>
        
        {/* Barra de progreso */}
        <div className="w-full h-1.5 bg-black/40 rounded-full mt-2 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-[#8b7355] transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Lista de temas */}
      <div className="flex-1">
        <h3 className="text-cinzel text-lg text-[#d4c3a3] mb-4 border-b border-[#8b7355]/20 pb-1 inline-block">Índice de Temas</h3>
        
        {!book.hasContent && (
          <p className="text-crimson text-gray-500 italic mt-4 bg-black/20 p-4 rounded border border-gray-800">
            Este tomo está en blanco. Sus secretos aún no han sido revelados.
          </p>
        )}

        {book.hasContent && book.topics.length === 0 && (
          <p className="text-crimson text-[#d4c3a3] italic mt-4">
            El archivo existe pero no tiene un índice estructurado.
          </p>
        )}

        {book.hasContent && book.topics.length > 0 && (
          <ul className="space-y-1">
            {book.topics.map((topic, index) => {
              const isAvailable = topic.hasContent;
              const isActive = topic.id === activeTopicId;
              
              return (
                <li key={`${topic.id}-${index}`} className={`${topic.level === 3 ? 'ml-4' : 'mt-3'} flex items-start group`}>
                  <span className={`mr-2 mt-1 text-xs ${isAvailable ? 'text-[#ffaa44]' : 'text-gray-600'}`}>
                    {isAvailable ? '✦' : '○'}
                  </span>
                  <button
                    onClick={() => isAvailable && onTopicSelect(topic)}
                    disabled={!isAvailable}
                    className={`text-left text-crimson text-[17px] leading-snug transition-all
                      ${!isAvailable ? 'text-gray-500 cursor-not-allowed' : 
                        isActive ? 'text-[#ffaa44] font-bold drop-shadow-[0_0_8px_rgba(255,170,68,0.5)]' : 
                        'text-[#d4c3a3] hover:text-[#f5e6ce]'
                      }
                    `}
                    title={!isAvailable ? 'Aún no has estudiado este tema' : topic.title}
                  >
                    {topic.title}
                    {isAvailable && (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[#ffaa44] text-xs">▸</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
