import React from 'react';
import { YearData, CarreraData, BookData } from '@/lib/libraryTypes';
import BookSpine from './BookSpine';

interface LibraryShelfProps {
  year: YearData;
  career: CarreraData;
  onBookClick: (book: BookData) => void;
}

export default function LibraryShelf({ year, career, onBookClick }: LibraryShelfProps) {
  return (
    <div className="w-full flex flex-col items-center my-6">
      {/* Etiqueta del Año o Estante */}
      <div className="w-11/12 md:w-3/4 bg-[#1f120a] border-2 border-[#3d2415] rounded-t-md p-2 flex items-center justify-between z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.5)]">
        <h3 className="text-cinzel text-[#e8d5b0] font-bold tracking-wide">
          {year.year > 0 ? `Año ${year.year}: ` : ''}{year.title}
        </h3>
        <span className="text-crimson text-[#8b7355] text-sm">
          {year.materias.length} {year.materias.length === 1 ? 'volumen' : 'volúmenes'}
        </span>
      </div>

      {/* Contenedor del estante y libros */}
      <div className="relative w-full max-w-4xl mx-auto px-4 md:px-12 flex items-end justify-center md:justify-start gap-1 py-1 z-20 min-h-[140px]">
        {/* Fondo oscuro tras los libros */}
        <div className="absolute inset-0 bg-black/40 shadow-inner -z-10" />

        {year.materias.map((book) => (
          <BookSpine 
            key={book.slug} 
            book={book} 
            career={career} 
            onClick={() => onBookClick(book)} 
          />
        ))}

        {/* Mensaje de estante vacío */}
        {year.materias.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center -z-0">
            <span className="text-crimson text-gray-600 italic">No hay volúmenes en este estante...</span>
          </div>
        )}
      </div>

      {/* Tabla del estante (madera gruesa) */}
      <div className="relative w-full max-w-5xl h-6 bg-[#3d2415] rounded-b-sm z-30 shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-t border-[#4a2e1b] flex flex-col">
        {/* Borde frontal brillante */}
        <div className="w-full h-1 bg-[#4a2e1b]" />
        {/* Vetas de madera (simuladas) */}
        <div className="w-full flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMzZDI0MTUiLz48cGF0aCBkPSJNMCwwIEw0LDRNMiw0IEw0LDJNMiw0IEwwLDIiIHN0cm9rZT0iIzJhMTYwZCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-30" />
      </div>
    </div>
  );
}
