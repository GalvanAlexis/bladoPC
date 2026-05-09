import dynamic from 'next/dynamic';
import { getSkillTreeData } from '@/lib/markdown';
import BladoAvatar from '@/components/BladoAvatar';
import AppShell from '@/components/AppShell';

// next/dynamic es obligatorio en Next.js App Router para lazy-load de Client Components
// React.lazy() solo funciona dentro de Client Components — causa SSR mismatch
const GameEngine = dynamic(() => import('@/components/GameEngine'), {
  loading: () => <BladoAvatar message="Invocando el Grimorio..." />,
  ssr: false,
});

export default function Home() {
  const { nodes, edges } = getSkillTreeData();
  return (
    <AppShell>
      <GameEngine initialNodes={nodes} initialEdges={edges} />
    </AppShell>
  );
}
