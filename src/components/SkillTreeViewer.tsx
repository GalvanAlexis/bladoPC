"use client";

import React, { useMemo, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import RuneNode from './RuneNode';
import { SkillNode, SkillEdge, CAREERS } from '@/lib/markdown';
import { getLayoutedElements, LayoutDirection } from '@/lib/dagre-layout';

const nodeTypes = {
  rune: RuneNode,
};

function SkillTreeInner({ initialNodes, initialEdges, selectedCareer, selectedYear }: {
  initialNodes: SkillNode[],
  initialEdges: SkillEdge[],
  selectedCareer: string,
  selectedYear: number | null
}) {
  const { fitView } = useReactFlow();
  const [layoutDirection, setLayoutDirection] = useState<LayoutDirection>('TB');

  const filteredNodes = useMemo(() => {
    let result = initialNodes;
    if (selectedCareer !== 'Todos') {
      result = result.filter(n => n.career === selectedCareer);
    }
    if (selectedYear !== null) {
      result = result.filter(n => n.year === selectedYear);
    }
    return result;
  }, [initialNodes, selectedCareer, selectedYear]);

  const filteredEdges = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return initialEdges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));
  }, [initialEdges, filteredNodes]);

  const baseFlowNodes: Node[] = useMemo(() => {
    return filteredNodes.map(n => ({
      id: n.id,
      type: 'rune',
      position: { x: 0, y: 0 },
      data: { label: n.label, status: n.status, type: n.type }
    }));
  }, [filteredNodes]);

  const flowEdges: Edge[] = useMemo(() => {
    return filteredEdges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 }
    }));
  }, [filteredEdges]);

  const layoutedNodes: Node[] = useMemo(() => {
    if (baseFlowNodes.length === 0) return [];
    return getLayoutedElements(baseFlowNodes, flowEdges, layoutDirection).nodes;
  }, [baseFlowNodes, flowEdges, layoutDirection]);

  useEffect(() => {
    // BUG-05: requestAnimationFrame garantiza que los nodos ya tienen dimensiones
    // antes de llamar fitView, a diferencia del setTimeout(100) frágil
    const raf = requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 800 });
    });
    return () => cancelAnimationFrame(raf);
  }, [layoutedNodes, fitView]);

  return (
    <ReactFlow
      nodes={layoutedNodes}
      edges={flowEdges}
      nodeTypes={nodeTypes}
      className="bg-obsidian"
      colorMode="dark"
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={2} color="#222" />
      <Controls className="fill-white text-black" />
      
      {/* Re-layout button */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setLayoutDirection(d => d === 'TB' ? 'LR' : 'TB')}
          className="px-3 py-1.5 rounded-md text-xs font-mono font-medium border
            bg-gray-800 text-gray-400 border-gray-700 
            hover:bg-gray-700 hover:text-white transition-colors"
          title="Cambiar direccion del layout"
          >
          {layoutDirection === 'TB' ? '→ LR' : '↕ TB'}
        </button>
      </div>
    </ReactFlow>
  );
}

export default function SkillTreeViewer({ initialNodes, initialEdges, selectedCareer, selectedYear, onCareerChange, onYearChange }: {
  initialNodes: SkillNode[],
  initialEdges: SkillEdge[],
  selectedCareer: string,
  selectedYear: number | null,
  onCareerChange: (career: string) => void,
  onYearChange: (year: number | null) => void,
}) {
  const availableYears = useMemo(() => {
    const yearSet = new Set(initialNodes.map(n => n.year));
    return Array.from(yearSet).filter(y => y != null).sort((a, b) => a - b) as number[];
  }, [initialNodes]);

  return (
    <div className="w-full h-full flex flex-col bg-obsidian">
      {/* Panel de filtros - Carreras */}
      <div className="flex flex-wrap gap-2 p-4 pb-2 bg-black/50 border-b border-gray-800 backdrop-blur-sm z-10">
        {(['Todos', ...CAREERS] as string[]).map(c => (
          <button
            key={c}
            onClick={() => onCareerChange(c)}
            className={`px-4 py-2 rounded-md text-sm transition-colors font-medium border border-gray-700
              ${selectedCareer === c 
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
          >
            {c.replace(/^\d\s/, '')}
          </button>
        ))}
      </div>

      {/* Panel de filtros - Años */}
      <div className="flex flex-wrap gap-2 px-4 py-2 bg-black/30 border-b border-gray-800/50 backdrop-blur-sm z-10">
        <button
          onClick={() => onYearChange(null)}
          className={`px-3 py-1 rounded-md text-xs transition-colors font-medium border
            ${selectedYear === null 
              ? 'bg-toxic/20 text-toxic border-toxic shadow-[0_0_10px_rgba(57,255,20,0.3)]' 
              : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-300'
            }`}
        >
          Todos los años
        </button>
        {availableYears.map(y => (
          <button
            key={y}
            onClick={() => onYearChange(y)}
            className={`px-3 py-1 rounded-md text-xs transition-colors font-medium border
              ${selectedYear === y 
                ? 'bg-toxic/20 text-toxic border-toxic shadow-[0_0_10px_rgba(57,255,20,0.3)]' 
                : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-300'
              }`}
          >
            Año {y}
          </button>
        ))}
      </div>
      
      {/* Contenedor del Grafo — MEJ-01: empty state cuando no hay nodos */}
      <div className="flex-1 relative">
        {filteredNodes.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-sm">
            No hay habilidades registradas para este filtro.
          </div>
        ) : (
          <ReactFlowProvider>
            <SkillTreeInner 
              initialNodes={initialNodes} 
              initialEdges={initialEdges} 
              selectedCareer={selectedCareer} 
              selectedYear={selectedYear}
            />
          </ReactFlowProvider>
        )}
      </div>
    </div>
  );
}
