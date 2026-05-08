"use client";

import React, { useState, useMemo, useEffect } from 'react';
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
import { SkillNode, SkillEdge } from '@/lib/markdown';

const nodeTypes = {
  rune: RuneNode,
};

const CAREERS = ['Todos', '1 Ing Sistemas', '2 Ing Datos', '3 Lic IA'];

function SkillTreeInner({ initialNodes, initialEdges, selectedCareer }: { initialNodes: SkillNode[], initialEdges: SkillEdge[], selectedCareer: string }) {
  const { fitView } = useReactFlow();

  const filteredNodes = useMemo(() => {
    if (selectedCareer === 'Todos') return initialNodes;
    return initialNodes.filter(n => n.career === selectedCareer);
  }, [initialNodes, selectedCareer]);

  const filteredEdges = useMemo(() => {
    // Solo mantener aristas cuyos nodos origen y destino existan en los nodos filtrados
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return initialEdges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));
  }, [initialEdges, filteredNodes]);

  const flowNodes: Node[] = useMemo(() => {
    return filteredNodes.map((n, i) => ({
      id: n.id,
      type: 'rune',
      // Layout ingenuo: distribuimos en una cuadrícula
      position: { x: (i % 4) * 250 + 50, y: Math.floor(i / 4) * 150 + 50 },
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

  // Recalcular el fitView cuando cambian los nodos
  useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);
  }, [flowNodes, fitView]);

  return (
    <ReactFlow
      nodes={flowNodes}
      edges={flowEdges}
      nodeTypes={nodeTypes}
      fitView
      className="bg-obsidian"
      colorMode="dark"
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={2} color="#222" />
      <Controls className="fill-white text-black" />
    </ReactFlow>
  );
}

export default function SkillTreeViewer({ initialNodes, initialEdges }: { initialNodes: SkillNode[], initialEdges: SkillEdge[] }) {
  const [selectedCareer, setSelectedCareer] = useState<string>('Todos');

  return (
    <div className="w-full h-full flex flex-col bg-obsidian">
      {/* Panel de filtros */}
      <div className="flex gap-2 p-4 bg-black/50 border-b border-gray-800 backdrop-blur-sm z-10">
        {CAREERS.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCareer(c)}
            className={`px-4 py-2 rounded-md text-sm transition-colors font-medium border border-gray-700
              ${selectedCareer === c 
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
          >
            {c.replace(/^\d\s/, '')} {/* Limpiar "1 Ing Sistemas" -> "Ing Sistemas" visualmente */}
          </button>
        ))}
      </div>
      
      {/* Contenedor del Grafo */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <SkillTreeInner 
            initialNodes={initialNodes} 
            initialEdges={initialEdges} 
            selectedCareer={selectedCareer} 
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
