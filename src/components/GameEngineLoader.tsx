"use client";

/**
 * GameEngineLoader — Client Component wrapper
 *
 * next/dynamic con ssr:false SOLO puede usarse dentro de un Client Component.
 * page.tsx es un Server Component, por lo que el dynamic() debe vivir aquí.
 */
import dynamic from 'next/dynamic';
import BladoAvatar from '@/components/BladoAvatar';
import { SkillNode, SkillEdge } from '@/lib/markdown';

const GameEngine = dynamic(() => import('@/components/GameEngine'), {
  loading: () => <BladoAvatar message="Invocando el Grimorio..." />,
  ssr: false,
});

interface GameEngineLoaderProps {
  initialNodes: SkillNode[];
  initialEdges: SkillEdge[];
}

export default function GameEngineLoader({ initialNodes, initialEdges }: GameEngineLoaderProps) {
  return <GameEngine initialNodes={initialNodes} initialEdges={initialEdges} />;
}
