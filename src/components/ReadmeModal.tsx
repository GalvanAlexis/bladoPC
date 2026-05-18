"use client";

import React, { useEffect, useCallback, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const README_URL = 'https://raw.githubusercontent.com/GalvanAlexis/GalvanAlexis/main/README.md';

function ReadmeFetcher({ onLoaded, onError }: { onLoaded: (c: string) => void; onError: (e: string) => void }) {
  useEffect(() => {
    let cancelled = false;
    fetch(README_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener el CV');
        return res.text();
      })
      .then(text => { if (!cancelled) onLoaded(text); })
      .catch(err => { if (!cancelled) onError(err.message); });
    return () => { cancelled = true; };
  }, [onLoaded, onError]);
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-crimson border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-500 font-mono text-sm">Consultando el grimorio...</p>
      </div>
    </div>
  );
}

type FetchState = { type: 'loading'; key: number } | { type: 'loaded'; content: string } | { type: 'error'; error: string };

function fetchReducer(state: FetchState, action: { type: 'reset' } | { type: 'loaded'; content: string } | { type: 'error'; error: string }): FetchState {
  switch (action.type) {
    case 'reset': return { type: 'loading', key: state.type === 'loading' ? state.key + 1 : 1 };
    case 'loaded': return { type: 'loaded', content: action.content };
    case 'error': return { type: 'error', error: action.error };
  }
}

export default function ReadmeModal({ isOpen, onClose }: ReadmeModalProps) {
  const [fetchState, dispatch] = useReducer(fetchReducer, { type: 'loading', key: 0 });

  const handleLoaded = useCallback((text: string) => {
    dispatch({ type: 'loaded', content: text });
  }, []);

  const handleError = useCallback((err: string) => {
    dispatch({ type: 'error', error: err });
  }, []);

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'reset' });
    }
  }, [isOpen]);

  const fetchKey = fetchState.type === 'loading' ? fetchState.key : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 z-[95] flex flex-col bg-obsidian/95 border border-crimson/40 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/50">
              <h2 className="text-sm uppercase tracking-widest text-crimson font-mono font-bold">
                Grimorio de Experiencia - CV
              </h2>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider
                  bg-gray-800 text-gray-400 border border-gray-700 rounded
                  hover:text-white hover:border-gray-500 transition-colors"
              >
                Cerrar
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {fetchState.type === 'error' && (
                <div className="text-center py-12">
                  <p className="text-crimson font-mono text-sm mb-2">Error al cargar el grimorio</p>
                  <p className="text-gray-500 font-mono text-xs">{fetchState.error}</p>
                </div>
              )}
              {fetchState.type === 'loaded' && (
                <div className="prose prose-invert max-w-none font-mono
                  prose-headings:text-toxic prose-headings:uppercase prose-headings:tracking-wider
                  prose-h1:text-crimson prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-800 prose-h1:pb-2
                  prose-h2:text-toxic prose-h2:text-xl
                  prose-h3:text-sulfur prose-h3:text-lg
                  prose-a:text-sulfur prose-a:no-underline hover:prose-a:text-crimson
                  prose-strong:text-toxic
                  prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                  prose-li:text-gray-300
                  prose-hr:border-gray-800
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {fetchState.content}
                  </ReactMarkdown>
                </div>
              )}
              {fetchState.type === 'loading' && (
                <ReadmeFetcher key={fetchKey} onLoaded={handleLoaded} onError={handleError} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
