import React, { useEffect, useState, useRef } from 'react';
import MarkdownRenderer from '@/lib/markdownRenderer';

interface TopicPageProps {
  careerId: string;
  year: number;
  bookSlug: string;
  activeTopicId: string | null;
}

export default function TopicPage({ careerId, year, bookSlug, activeTopicId }: TopicPageProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar el documento markdown completo al montar
  useEffect(() => {
    async function fetchMarkdown() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL('/api/library/topic', window.location.origin);
        url.searchParams.append('career', careerId);
        url.searchParams.append('year', year.toString());
        url.searchParams.append('slug', bookSlug);
        
        const res = await fetch(url.toString());
        if (!res.ok) {
          throw new Error('No se pudo encontrar el tomo');
        }
        const data = await res.json();
        setContent(data.markdown);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMarkdown();
  }, [careerId, year, bookSlug]);

  // Hacer scroll automático hacia la sección seleccionada (esperando que ReactMarkdown renderice el id)
  // ReactMarkdown remark-slug (o similar) asigna IDs. Generamos los ids de forma similar
  useEffect(() => {
    if (activeTopicId && content && !loading) {
      // Necesitamos un pequeño delay para permitir que el DOM se renderice con react-markdown
      const timeoutId = setTimeout(() => {
        if (!containerRef.current) return;
        
        // Buscar elementos H2 o H3. No tenemos remark-slug, por lo que buscamos
        // el texto de los headings
        const headings = containerRef.current.querySelectorAll('h2, h3');
        
        for (let i = 0; i < headings.length; i++) {
          const heading = headings[i];
          // Generar un slug simple desde el textContent para comparar
          const text = heading.textContent || '';
          const slug = text.toLowerCase()
            .replace(/[áäâà]/g, 'a')
            .replace(/[éëêè]/g, 'e')
            .replace(/[íïîì]/g, 'i')
            .replace(/[óöôò]/g, 'o')
            .replace(/[úüûù]/g, 'u')
            .replace(/[ñ]/g, 'n')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
            
          if (slug === activeTopicId) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          }
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [activeTopicId, content, loading]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a0f08]">
        <div className="text-cinzel text-[#d4c3a3] animate-pulse text-xl">Descifrando glifos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a0f08] p-8 text-center">
        <span className="text-4xl mb-4">🦇</span>
        <h3 className="text-cinzel text-red-400 text-xl font-bold mb-2">Página perdida</h3>
        <p className="text-crimson text-gray-400">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a0f08]">
        <p className="text-crimson text-gray-500 italic">Selecciona un tema del índice para leer.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#1a0f08] overflow-y-auto dialog-scrollbar relative px-6 md:px-12 py-8" ref={containerRef}>
      <MarkdownRenderer content={content} />
      
      <div className="mt-16 pt-8 border-t border-[#8b7355]/20 text-center">
        <p className="text-crimson text-gray-600 italic">Fin de la página.</p>
      </div>
    </div>
  );
}
