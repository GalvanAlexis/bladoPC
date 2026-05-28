/**
 * Tests para src/lib/AppContext.tsx
 * Cubre: valores iniciales, replayIntro, toggles de preferencias visuales
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider, useAppContext } from '@/lib/AppContext';

// ── Mock de CavernIntro para no depender de framer-motion ────────────────────
jest.mock('@/components/CavernIntro', () =>
  function MockCavernIntro({ onSkip }: { onSkip: () => void }) {
    return (
      <div data-testid="cavern-intro">
        <button onClick={onSkip}>Omitir Intro</button>
      </div>
    );
  }
);

// ── Componente auxiliar que expone el contexto en el DOM ─────────────────────
function ContextConsumer() {
  const { particlesEnabled, animationsEnabled, setParticlesEnabled, setAnimationsEnabled, replayIntro } =
    useAppContext();
  return (
    <div>
      <span data-testid="particles">{String(particlesEnabled)}</span>
      <span data-testid="animations">{String(animationsEnabled)}</span>
      <button onClick={() => setParticlesEnabled(!particlesEnabled)}>Toggle Partículas</button>
      <button onClick={() => setAnimationsEnabled(!animationsEnabled)}>Toggle Animaciones</button>
      <button onClick={replayIntro}>Replay Intro</button>
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

// ── Helpers ───────────────────────────────────────────────────────────────────
async function skipIntro() {
  const skipBtn = await screen.findByText('Omitir Intro');
  await userEvent.click(skipBtn);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  sessionStorage.clear();
});

describe('AppContext — valores iniciales', () => {
  it('muestra el CavernIntro al inicio', async () => {
    renderWithProvider();
    expect(await screen.findByTestId('cavern-intro')).toBeInTheDocument();
  });

  it('oculta el intro al saltearlo y muestra los children', async () => {
    renderWithProvider();
    await skipIntro();
    expect(screen.queryByTestId('cavern-intro')).not.toBeInTheDocument();
    expect(screen.getByTestId('particles')).toBeInTheDocument();
  });

  it('particlesEnabled inicia en true', async () => {
    renderWithProvider();
    await skipIntro();
    expect(screen.getByTestId('particles').textContent).toBe('true');
  });

  it('animationsEnabled inicia en true', async () => {
    renderWithProvider();
    await skipIntro();
    expect(screen.getByTestId('animations').textContent).toBe('true');
  });
});

describe('AppContext — toggles de preferencias visuales', () => {
  it('setParticlesEnabled cambia particlesEnabled a false', async () => {
    renderWithProvider();
    await skipIntro();
    await userEvent.click(screen.getByText('Toggle Partículas'));
    expect(screen.getByTestId('particles').textContent).toBe('false');
  });

  it('setParticlesEnabled vuelve a true en segundo click', async () => {
    renderWithProvider();
    await skipIntro();
    await userEvent.click(screen.getByText('Toggle Partículas'));
    await userEvent.click(screen.getByText('Toggle Partículas'));
    expect(screen.getByTestId('particles').textContent).toBe('true');
  });

  it('setAnimationsEnabled cambia animationsEnabled a false', async () => {
    renderWithProvider();
    await skipIntro();
    await userEvent.click(screen.getByText('Toggle Animaciones'));
    expect(screen.getByTestId('animations').textContent).toBe('false');
  });
});

describe('AppContext — replayIntro', () => {
  it('replayIntro vuelve a mostrar el CavernIntro', async () => {
    renderWithProvider();
    await skipIntro();
    // Ya no hay intro visible
    expect(screen.queryByTestId('cavern-intro')).not.toBeInTheDocument();
    // Llamamos replayIntro
    await userEvent.click(screen.getByText('Replay Intro'));
    // Vuelve a aparecer
    expect(screen.getByTestId('cavern-intro')).toBeInTheDocument();
  });
});
