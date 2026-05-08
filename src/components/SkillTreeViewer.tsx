"use client";

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import RuneNode from './RuneNode';
import { SkillNode, SkillEdge } from '@/lib/markdown';

const nodeTypes = {
  rune: RuneNode,
};

export default function SkillTreeViewer({ initialNodes, initialEdges }: { initialNodes: SkillNode[], initialEdges: SkillEdge[] }) {
  
  // Transform back-end nodes into React Flow format with naive layouting
  // In a real app we would use Dagre for auto-layout, but this is a simple baseline.
  const flowNodes: Node[] = useMemo(() => {
    return initialNodes.map((n, i) => ({
      id: n.id,
      type: 'rune',
      position: { x: (i % 3) * 250 + 100, y: Math.floor(i / 3) * 150 + 50 },
      data: { label: n.label, status: n.status, type: n.type }
    }));
  }, [initialNodes]);

  const flowEdges: Edge[] = useMemo(() => {
    return initialEdges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 }
    }));
  }, [initialEdges]);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
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
    </div>
  );
}
