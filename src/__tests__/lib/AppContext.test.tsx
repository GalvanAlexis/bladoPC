/**
 * Tests para src/lib/AppContext.tsx
 * Cubre: valores iniciales y toggles de preferencias visuales
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider, useAppContext } from '@/lib/AppContext';

// ── Componente auxiliar que expone el contexto en el DOM ─────────────────────
function ContextConsumer() {
  const { animationsEnabled, setAnimationsEnabled } = useAppContext();
  return (
    <div>
      <span data-testid="animations">{String(animationsEnabled)}</span>
      <button onClick={() => setAnimationsEnabled(!animationsEnabled)}>Toggle Animaciones</button>
    </div>
  );
}

function renderWithProvider() {
  render(
    <AppProvider>
      <ContextConsumer />
    </AppProvider>
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('AppContext — valores iniciales', () => {
  it('animationsEnabled inicia en true', async () => {
    renderWithProvider();
    expect(screen.getByTestId('animations').textContent).toBe('true');
  });
});

describe('AppContext — toggles de preferencias visuales', () => {
  it('setAnimationsEnabled cambia animationsEnabled a false', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Toggle Animaciones'));
    expect(screen.getByTestId('animations').textContent).toBe('false');
  });
});
