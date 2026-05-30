import React from 'react';
import { GameTag, TAG_COLORS } from '@/lib/games';

interface TagBadgeProps {
  tag: GameTag;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  const color = TAG_COLORS[tag] || '#888';
  return (
    <span 
      className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest border"
      style={{
        color: color,
        borderColor: `${color}80`,
        backgroundColor: `${color}15`,
        boxShadow: `0 0 5px ${color}40`,
      }}
    >
      {tag}
    </span>
  );
}
