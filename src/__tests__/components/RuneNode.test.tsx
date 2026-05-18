/**
 * Tests para src/components/RuneNode.tsx
 * Cubre: estilos según status, íconos según type, handles con posición dinámica
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RuneNode from '@/components/RuneNode';
import { Position } from '@xyflow/react';

// ── Mock de @xyflow/react ─────────────────────────────────────────────────────
jest.mock('@xyflow/react', () => ({
  Handle: ({ type, position }: { type: string; position: string }) => (
    <div data-testid={`handle-${type}`} data-position={position} />
  ),
  Position: {
    Top: 'top',
    Bottom: 'bottom',
    Left: 'left',
    Right: 'right',
  },
}));

// ── Helper ────────────────────────────────────────────────────────────────────
function renderRuneNode(
  status: string,
  type: string,
  targetPosition = 'top',
  sourcePosition = 'bottom'
) {
  // NodeProps requiere la forma completa del nodo; simulamos lo mínimo necesario
  const props = {
    id: 'test-id',
    type: 'rune',
    data: { label: 'Test Label', status, type },
    targetPosition: targetPosition as Position,
    sourcePosition: sourcePosition as Position,
    selected: false,
    isConnectable: true,
    zIndex: 0,
    xPos: 0,
    yPos: 0,
    dragging: false,
    deletable: true,
    selectable: true,
    draggable: true,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return render(<RuneNode {...(props as any)} />);
}

// ── Tests de renderizado base ─────────────────────────────────────────────────

describe('RuneNode — renderizado base', () => {
  it('muestra el label del nodo', () => {
    renderRuneNode('locked', 'materia');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('muestra el status como texto', () => {
    renderRuneNode('locked', 'materia');
    expect(screen.getByText('locked')).toBeInTheDocument();
  });
});

// ── Tests de estilos por status ───────────────────────────────────────────────

describe('RuneNode — estilos por status', () => {
  it('status "locked" usa clases grises', () => {
    const { container } = renderRuneNode('locked', 'materia');
    const div = container.querySelector('div');
    expect(div?.className).toContain('text-gray-500');
    expect(div?.className).toContain('border-gray-700');
  });

  it('status "completed" usa clases toxic (verde neón)', () => {
    const { container } = renderRuneNode('completed', 'materia');
    const div = container.querySelector('div');
    expect(div?.className).toContain('text-toxic');
    expect(div?.className).toContain('border-toxic');
  });

  it('status "completed" incluye glow verde', () => {
    const { container } = renderRuneNode('completed', 'materia');
    const div = container.querySelector('div');
    expect(div?.className).toContain('shadow-');
  });

  it('status "progress" usa clases crimson (rojo)', () => {
    const { container } = renderRuneNode('progress', 'materia');
    const div = container.querySelector('div');
    expect(div?.className).toContain('text-crimson');
    expect(div?.className).toContain('border-crimson');
  });

  it('status "progress" incluye animate-pulse', () => {
    const { container } = renderRuneNode('progress', 'materia');
    const div = container.querySelector('div');
    expect(div?.className).toContain('animate-pulse');
  });
});

// ── Tests de íconos por tipo ───────────────────────────────────────────────────

describe('RuneNode — íconos por tipo', () => {
  it('tipo "materia" muestra 📚', () => {
    renderRuneNode('locked', 'materia');
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  it('tipo "tecnologia" muestra 💻', () => {
    renderRuneNode('locked', 'tecnologia');
    expect(screen.getByText('💻')).toBeInTheDocument();
  });

  it('tipo "proyecto" muestra ⚔️', () => {
    renderRuneNode('locked', 'proyecto');
    expect(screen.getByText('⚔️')).toBeInTheDocument();
  });
});

// ── Tests de handles dinámicos (BUG-01 fix) ───────────────────────────────────

describe('RuneNode — handles dinámicos (BUG-01)', () => {
  it('usa targetPosition recibido por props (TB → top)', () => {
    renderRuneNode('locked', 'materia', 'top', 'bottom');
    expect(screen.getByTestId('handle-target')).toHaveAttribute('data-position', 'top');
  });

  it('usa sourcePosition recibido por props (TB → bottom)', () => {
    renderRuneNode('locked', 'materia', 'top', 'bottom');
    expect(screen.getByTestId('handle-source')).toHaveAttribute('data-position', 'bottom');
  });

  it('usa targetPosition=left en layout LR', () => {
    renderRuneNode('locked', 'materia', 'left', 'right');
    expect(screen.getByTestId('handle-target')).toHaveAttribute('data-position', 'left');
  });

  it('usa sourcePosition=right en layout LR', () => {
    renderRuneNode('locked', 'materia', 'left', 'right');
    expect(screen.getByTestId('handle-source')).toHaveAttribute('data-position', 'right');
  });

  it('usa fallback top/bottom si targetPosition es undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {
      id: 'test',
      type: 'rune',
      data: { label: 'X', status: 'locked', type: 'materia' },
      // Sin targetPosition ni sourcePosition
    };
    render(<RuneNode {...props} />);
    expect(screen.getByTestId('handle-target')).toHaveAttribute('data-position', 'top');
    expect(screen.getByTestId('handle-source')).toHaveAttribute('data-position', 'bottom');
  });
});
