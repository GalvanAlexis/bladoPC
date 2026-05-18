/**
 * Tests unitarios para src/lib/dagre-layout.ts
 * Cubre: getLayoutedElements con dirección TB y LR
 */
import { getLayoutedElements } from '@/lib/dagre-layout';
import { Node, Edge, Position } from '@xyflow/react';

// Nodos de prueba mínimos
const makeNodes = (ids: string[]): Node[] =>
  ids.map(id => ({
    id,
    type: 'rune',
    position: { x: 0, y: 0 },
    data: {},
  }));

const makeEdges = (pairs: [string, string][]): Edge[] =>
  pairs.map(([source, target], i) => ({
    id: `e-${i}`,
    source,
    target,
  }));

describe('getLayoutedElements — layout TB (top-bottom)', () => {
  const nodes = makeNodes(['a', 'b', 'c']);
  const edges = makeEdges([['a', 'b'], ['b', 'c']]);

  it('devuelve el mismo número de nodos', () => {
    const { nodes: result } = getLayoutedElements(nodes, edges, 'TB');
    expect(result.length).toBe(3);
  });

  it('asigna posiciones distintas a nodos conectados verticalmente', () => {
    const { nodes: result } = getLayoutedElements(nodes, edges, 'TB');
    const posA = result.find(n => n.id === 'a')!.position;
    const posB = result.find(n => n.id === 'b')!.position;
    // En layout TB, b debe estar por debajo de a
    expect(posB.y).toBeGreaterThan(posA.y);
  });

  it('asigna targetPosition=Top y sourcePosition=Bottom en TB', () => {
    const { nodes: result } = getLayoutedElements(nodes, edges, 'TB');
    result.forEach(n => {
      expect(n.targetPosition).toBe(Position.Top);
      expect(n.sourcePosition).toBe(Position.Bottom);
    });
  });
});

describe('getLayoutedElements — layout LR (left-right)', () => {
  const nodes = makeNodes(['x', 'y', 'z']);
  const edges = makeEdges([['x', 'y'], ['y', 'z']]);

  it('asigna targetPosition=Left y sourcePosition=Right en LR', () => {
    const { nodes: result } = getLayoutedElements(nodes, edges, 'LR');
    result.forEach(n => {
      expect(n.targetPosition).toBe(Position.Left);
      expect(n.sourcePosition).toBe(Position.Right);
    });
  });

  it('asigna posiciones distintas horizontalmente en LR', () => {
    const { nodes: result } = getLayoutedElements(nodes, edges, 'LR');
    const posX = result.find(n => n.id === 'x')!.position;
    const posY = result.find(n => n.id === 'y')!.position;
    // En layout LR, y debe estar a la derecha de x
    expect(posY.x).toBeGreaterThan(posX.x);
  });

  it('preserva los edges sin modificación', () => {
    const { edges: result } = getLayoutedElements(nodes, edges, 'LR');
    expect(result).toBe(edges); // misma referencia
  });
});

describe('getLayoutedElements — nodos sin edges', () => {
  it('layoutea nodos aislados sin errores', () => {
    const nodes = makeNodes(['solo']);
    const { nodes: result } = getLayoutedElements(nodes, [], 'TB');
    expect(result.length).toBe(1);
    expect(result[0].position).toBeDefined();
  });
});

describe('getLayoutedElements — dirección por defecto', () => {
  it('usa TB si no se especifica dirección', () => {
    const nodes = makeNodes(['p', 'q']);
    const edges = makeEdges([['p', 'q']]);
    const { nodes: result } = getLayoutedElements(nodes, edges);
    result.forEach(n => {
      expect(n.targetPosition).toBe(Position.Top);
      expect(n.sourcePosition).toBe(Position.Bottom);
    });
  });
});
