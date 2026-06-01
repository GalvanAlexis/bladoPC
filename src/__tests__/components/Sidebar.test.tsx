/**
 * Tests para src/components/Sidebar.tsx
 * Cubre: apertura/cierre, toggles conectados al AppContext, link de GitHub
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/lib/AppContext';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.PropsWithChildren<Record<string, unknown>>) => <div {...p}>{children}</div>,
    aside: ({ children, ...p }: React.PropsWithChildren<Record<string, unknown>>) => <aside {...p}>{children}</aside>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

function renderSidebar(
  isOpen: boolean,
  overrides: Partial<React.ContextType<typeof AppContext>> = {}
) {
  const ctx = {
    replayIntro: jest.fn(),
    particlesEnabled: true,
    animationsEnabled: true,
    setParticlesEnabled: jest.fn(),
    setAnimationsEnabled: jest.fn(),
    ...overrides,
  };
  const onClose = jest.fn();
  render(
    <AppContext.Provider value={ctx}>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </AppContext.Provider>
  );
  return { onClose, ...ctx };
}

describe('Sidebar — visibilidad', () => {
  it('no renderiza el panel cuando isOpen=false', () => {
    renderSidebar(false);
    expect(screen.queryByText('⚙ Opciones')).not.toBeInTheDocument();
  });

  it('renderiza el panel cuando isOpen=true', () => {
    renderSidebar(true);
    expect(screen.getByText('⚙ Opciones')).toBeInTheDocument();
  });
});

describe('Sidebar — cerrar', () => {
  it('el botón ✕ llama a onClose', async () => {
    const { onClose } = renderSidebar(true);
    await userEvent.click(screen.getByLabelText('Cerrar panel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Sidebar — toggle Partículas', () => {
  it('llama setParticlesEnabled con false cuando están activas', async () => {
    const { setParticlesEnabled } = renderSidebar(true, { particlesEnabled: true });
    await userEvent.click(screen.getAllByRole('switch')[0]);
    expect(setParticlesEnabled).toHaveBeenCalledWith(false);
  });

  it('llama setParticlesEnabled con true cuando están inactivas', async () => {
    const { setParticlesEnabled } = renderSidebar(true, { particlesEnabled: false });
    await userEvent.click(screen.getAllByRole('switch')[0]);
    expect(setParticlesEnabled).toHaveBeenCalledWith(true);
  });
});

describe('Sidebar — toggle Animaciones', () => {
  it('llama setAnimationsEnabled con false cuando están activas', async () => {
    const { setAnimationsEnabled } = renderSidebar(true, { animationsEnabled: true });
    await userEvent.click(screen.getAllByRole('switch')[1]);
    expect(setAnimationsEnabled).toHaveBeenCalledWith(false);
  });

  it('llama setAnimationsEnabled con true cuando están inactivas', async () => {
    const { setAnimationsEnabled } = renderSidebar(true, { animationsEnabled: false });
    await userEvent.click(screen.getAllByRole('switch')[1]);
    expect(setAnimationsEnabled).toHaveBeenCalledWith(true);
  });
});

describe('Sidebar — link GitHub', () => {
  it('muestra el link al repositorio de GitHub', () => {
    renderSidebar(true);
    const link = screen.getByText('GitHub del proyecto').closest('a');
    expect(link).toHaveAttribute('href', 'https://github.com/GalvanAlexis/Progresos-Academicos');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('muestra la versión de la app', () => {
    renderSidebar(true);
    expect(screen.getByText(/v0\.1\.0/)).toBeInTheDocument();
  });
});
