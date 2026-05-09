import dagre from '@dagrejs/dagre';
import { Node, Edge, Position } from '@xyflow/react';

const NODE_WIDTH = 250;
const NODE_HEIGHT = 80;

export type LayoutDirection = 'TB' | 'LR';

export function getLayoutedElements(nodes: Node[], edges: Edge[], direction: LayoutDirection = 'TB') {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const rankdir = direction === 'LR' ? 'LR' : 'TB';
  dagreGraph.setGraph({ rankdir, ranksep: 100, nodesep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const isLR = direction === 'LR';

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      // Adaptar handles según la dirección del layout
      targetPosition: isLR ? Position.Left  : Position.Top,
      sourcePosition: isLR ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2,
        y: nodeWithPosition.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
