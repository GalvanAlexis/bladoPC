import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import React from 'react';

type RuneNodeType = Node<{ label: string; status: string; type: string }, 'rune'>;

export default function RuneNode({ data }: NodeProps<RuneNodeType>) {
  const { label, status, type } = data;

  let bgClass = "bg-obsidian border-gray-700 text-gray-500";
  let glowClass = "";

  if (status === "completed") {
    bgClass = "bg-black border-toxic text-toxic";
    glowClass = "shadow-[0_0_15px_rgba(57,255,20,0.6)]";
  } else if (status === "progress") {
    bgClass = "bg-black border-crimson text-crimson";
    glowClass = "shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse";
  }

  const icon = type === 'materia' ? '📚' : type === 'tecnologia' ? '💻' : '⚔️';

  return (
    <div className={`px-4 py-3 rounded-lg border-2 min-w-[150px] text-center font-mono ${bgClass} ${glowClass}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-gray-500" />
      
      <div className="text-xl mb-1">{icon}</div>
      <div className="font-bold text-sm uppercase tracking-widest">{label}</div>
      <div className="text-xs opacity-70 mt-1">{status}</div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-gray-500" />
    </div>
  );
}
