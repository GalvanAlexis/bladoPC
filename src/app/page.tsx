import { Suspense, lazy } from 'react';
import { getSkillTreeData } from '@/lib/markdown';
import BladoAvatar from '@/components/BladoAvatar';
import AppShell from '@/components/AppShell';

const GameEngine = lazy(() => import('@/components/GameEngine'));

export default function Home() {
  const { nodes, edges } = getSkillTreeData();
  return (
    <AppShell>
      <Suspense fallback={<BladoAvatar message="Invocando el Grimorio..." />}>
        <GameEngine initialNodes={nodes} initialEdges={edges} />
      </Suspense>
    </AppShell>
  );
}
