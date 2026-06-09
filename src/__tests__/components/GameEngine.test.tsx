/**
 * Tests para src/components/GameEngine.tsx
 * Cubre: flujo de diálogos, apertura de SkillTree, modal CV, cierre de diálogo
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameEngine from '@/components/GameEngine';
import { AppContext } from '@/lib/AppContext';

// ── Mocks de componentes externos complejos ───────────────────────────────────

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.PropsWithChildren<Record<string, unknown>>) => <div {...p}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

jest.mock('@/components/PortfolioScene', () =>
  function MockPortfolioScene({ onBladoClick }: { onBladoClick: () => void }) {
    return <button data-testid="blado-sprite" onClick={onBladoClick}>Blado</button>;
  }
);

jest.mock('@/components/biblioteca/LibraryRoom', () =>
  function MockLibraryRoom() {
    return <div data-testid="library-room">LibraryRoom</div>;
  }
);

jest.mock('@/components/ReadmeModal', () =>
  function MockReadmeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
    return (
      <div data-testid="readme-modal">
        <button onClick={onClose}>Cerrar CV</button>
      </div>
    );
  }
);

jest.mock('@/components/Navbar', () =>
  function MockNavbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
    return <nav><button onClick={onToggleSidebar}>Toggle Sidebar</button></nav>;
  }
);

jest.mock('@/components/Sidebar', () =>
  function MockSidebar() {
    return <aside data-testid="sidebar" />;
  }
);

jest.mock('@/components/DialogBox', () => {
  return function MockDialogBox({
    text,
    choices,
    onClose,
    speakerName,
  }: {
    text: string;
    choices: Array<{ label: string; action: () => void }>;
    onClose?: () => void;
    speakerName: string;
  }) {
    return (
      <div data-testid="dialog-box">
        <span data-testid="speaker">{speakerName}</span>
        <p data-testid="dialog-text">{text}</p>
        {choices.map((c, i) => (
          <button key={i} onClick={c.action}>{c.label}</button>
        ))}
        {onClose && <button onClick={onClose}>Cerrar</button>}
      </div>
    );
  };
});

// ── Datos de prueba mínimos ───────────────────────────────────────────────────



// ── Contexto mock ─────────────────────────────────────────────────────────────

const mockContext: React.ContextType<typeof AppContext> = {
  replayIntro: jest.fn(),
  particlesEnabled: true,
  animationsEnabled: true,
  setParticlesEnabled: jest.fn(),
  setAnimationsEnabled: jest.fn(),
};

function renderGameEngine() {
  render(
    <AppContext.Provider value={mockContext}>
      <GameEngine />
    </AppContext.Provider>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function openDialog() {
  await userEvent.click(screen.getByTestId('blado-sprite'));
}

// ── Tests de flujo de diálogos ────────────────────────────────────────────────

describe('GameEngine — diálogo inicial', () => {
  it('no muestra el dialog box hasta clickear a Blado', () => {
    renderGameEngine();
    expect(screen.queryByTestId('dialog-box')).not.toBeInTheDocument();
  });

  it('muestra el dialog box al clickear a Blado', async () => {
    renderGameEngine();
    await openDialog();
    expect(screen.getByTestId('dialog-box')).toBeInTheDocument();
  });

  it('el diálogo inicial muestra al speaker "Blado"', async () => {
    renderGameEngine();
    await openDialog();
    expect(screen.getByTestId('speaker').textContent).toBe('Blado');
  });

  it('el diálogo inicial contiene texto de bienvenida', async () => {
    renderGameEngine();
    await openDialog();
    expect(screen.getByTestId('dialog-text').textContent).toContain('Hola');
  });
});

describe('GameEngine — navegación entre diálogos', () => {
  it('clickear "¿Quién es Alexis?" cambia el diálogo a whoAmI', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('¿Quién es Alexis?'));
    expect(screen.getByTestId('dialog-text').textContent).toContain('Alexis Galván');
  });

  it('clickear "Volver al menú" regresa al diálogo de vuelta (back)', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('¿Quién es Alexis?'));
    await userEvent.click(screen.getByText('Volver al menú'));
    // El nodo 'back' tiene su propio texto de transición
    expect(screen.getByTestId('dialog-text').textContent).toContain('¿Qué más');
  });

  it('navegar a "Ver sus habilidades" muestra el texto de skills', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('Ver sus habilidades'));
    expect(screen.getByTestId('dialog-text').textContent).toContain('habilidades');
  });
});

describe('GameEngine — Grimorio (LibraryRoom)', () => {
  it('el LibraryRoom no se muestra inicialmente', () => {
    renderGameEngine();
    expect(screen.queryByTestId('library-room')).not.toBeInTheDocument();
  });

  it('navegar a skills y abrir el Árbol de Habilidades muestra el LibraryRoom', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('Ver sus habilidades'));
    await userEvent.click(screen.getByText('Abrir árbol de habilidades'));
    expect(screen.getByTestId('library-room')).toBeInTheDocument();
  });
});

describe('GameEngine — modal CV', () => {
  it('el ReadmeModal no se muestra inicialmente', () => {
    renderGameEngine();
    expect(screen.queryByTestId('readme-modal')).not.toBeInTheDocument();
  });

  it('clickear "Ver CV" abre el ReadmeModal', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('Ver CV / Experiencia'));
    expect(screen.getByTestId('readme-modal')).toBeInTheDocument();
  });

  it('cerrar el ReadmeModal lo oculta', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('Ver CV / Experiencia'));
    await userEvent.click(screen.getByText('Cerrar CV'));
    expect(screen.queryByTestId('readme-modal')).not.toBeInTheDocument();
  });
});

describe('GameEngine — cerrar diálogo', () => {
  it('el botón Cerrar oculta el dialog box', async () => {
    renderGameEngine();
    await openDialog();
    await userEvent.click(screen.getByText('Cerrar'));
    expect(screen.queryByTestId('dialog-box')).not.toBeInTheDocument();
  });
});
