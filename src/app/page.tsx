import { getSkillTreeData } from '@/lib/markdown';
import AppShell from '@/components/AppShell';
import GameEngineLoader from '@/components/GameEngineLoader';

export default function Home() {
  const { nodes, edges } = getSkillTreeData();
  return (
    <AppShell>
      <GameEngineLoader initialNodes={nodes} initialEdges={edges} />
    </AppShell>
  );
}

