"use client";

/**
 * GameEngineLoader — Client Component wrapper
 *
 * next/dynamic con ssr:false SOLO puede usarse dentro de un Client Component.
 * page.tsx es un Server Component, por lo que el dynamic() debe vivir aquí.
 */
import dynamic from 'next/dynamic';
import BladoAvatar from '@/components/BladoAvatar';

const GameEngine = dynamic(() => import('@/components/GameEngine'), {
  loading: () => <BladoAvatar message="Invocando el Grimorio..." />,
  ssr: false,
});

export default function GameEngineLoader() {
  return <GameEngine />;
}
