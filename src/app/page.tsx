// Server Component — lee el sistema de archivos y pasa los datos al motor del juego
import { getSkillTreeData } from '@/lib/markdown';
import GameEngine from '@/components/GameEngine';

export default function Home() {
  const { nodes, edges } = getSkillTreeData();
  return <GameEngine initialNodes={nodes} initialEdges={edges} />;
}
