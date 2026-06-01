import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookData, CarreraData, YearData, TopicEntry } from '@/lib/libraryTypes';
import BookIndex from './BookIndex';
import TopicPage from './TopicPage';

interface BookViewerProps {
  book: BookData;
  career: CarreraData;
  year: YearData;
  onClose: () => void;
}

export default function BookViewer({ book, career, year, onClose }: BookViewerProps) {
  const [activeTopic, setActiveTopic] = useState<TopicEntry | null>(
    // Si tiene contenido, intentar seleccionar el primero por defecto
    book.topics.find(t => t.hasContent) || null
  );

  return (
    <motion.div 
      className="absolute inset-2 md:inset-8 bg-[#1a0f08] border-4 border-[#3d2415] rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden z-50 flex flex-col"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* Navbar del libro */}
      <div className="w-full h-14 bg-[#1f120a] border-b-2 border-[#3d2415] flex items-center justify-between px-4 shadow-md z-20">
        <div className="flex items-center gap-3">
          <span className="text-xl">{career.icon}</span>
          <h2 className="text-cinzel text-[#e8d5b0] font-bold text-lg md:text-xl truncate max-w-[200px] md:max-w-md">
            {book.fullName}
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-red-900/40 border border-red-500/50 text-red-200 flex items-center justify-center hover:bg-red-600 transition-colors"
          title="Cerrar libro"
        >
          ✕
        </button>
      </div>

      {/* Contenido principal: dos columnas */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxYTBmMDgiLz48cGF0aCBkPSJNMCwwIEw0LDRNMiw0IEw0LDJNMiw0IEwwLDIiIHN0cm9rZT0iIzFmMTIwYSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]">
        
        {/* Panel izquierdo: Índice */}
        <div className="w-full md:w-1/3 lg:w-1/4 h-1/3 md:h-full border-b-2 md:border-b-0 md:border-r-4 border-[#3d2415] flex-shrink-0">
          <BookIndex 
            book={book} 
            activeTopicId={activeTopic?.id || null} 
            onTopicSelect={setActiveTopic} 
          />
        </div>

        {/* Panel derecho: Contenido Markdown */}
        <div className="flex-1 h-2/3 md:h-full relative shadow-inner">
          {/* Luz radial simulando vela */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,170,68,0.05)_0%,transparent_60%)] pointer-events-none z-10" />
          
          <TopicPage 
            careerId={career.id}
            year={year.year}
            bookSlug={book.slug}
            activeTopicId={activeTopic?.id || null}
          />
        </div>
      </div>
    </motion.div>
  );
}
