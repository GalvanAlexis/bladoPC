/**
 * Tests para src/components/Sidebar.tsx
 * Cubre: apertura/cierre, toggles conectados al AppContext, link de GitHub
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/lib/AppContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

function renderSidebar(
  isOpen: boolean,
  overrides: Partial<React.ContextType<typeof AppContext>> = {}
) {
  const ctx = {
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
  it('no renderiza el panel visualmente cuando isOpen=false', () => {
    renderSidebar(false);
    // El panel usa CSS transform para ocultar, no unmount.
    // Verificamos que el panel aside está en el DOM pero no visible (transform).
    const panel = screen.getByRole('dialog', { name: 'Panel de navegacion' });
    expect(panel).toHaveStyle({ transform: 'translateX(-260px)' });
  });

  it('muestra el panel de navegación cuando isOpen=true', () => {
    renderSidebar(true);
    const panel = screen.getByRole('dialog', { name: 'Panel de navegacion' });
    expect(panel).toHaveStyle({ transform: 'translateX(0)' });
  });
});

describe('Sidebar — cerrar', () => {
  it('el botón ✕ llama a onClose', async () => {
    const { onClose } = renderSidebar(true);
    await userEvent.click(screen.getByLabelText('Cerrar panel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Sidebar — toggle Animaciones', () => {
  it('llama setAnimationsEnabled con false cuando están activas', async () => {
    const { setAnimationsEnabled } = renderSidebar(true, { animationsEnabled: true });
    await userEvent.click(screen.getAllByRole('switch')[0]);
    expect(setAnimationsEnabled).toHaveBeenCalledWith(false);
  });

  it('llama setAnimationsEnabled con true cuando están inactivas', async () => {
    const { setAnimationsEnabled } = renderSidebar(true, { animationsEnabled: false });
    await userEvent.click(screen.getAllByRole('switch')[0]);
    expect(setAnimationsEnabled).toHaveBeenCalledWith(true);
  });
});

describe('Sidebar — link GitHub', () => {
  it('muestra el link al repositorio de GitHub', () => {
    renderSidebar(true);
    const link = screen.getByText('GitHub del proyecto').closest('a');
    expect(link).toHaveAttribute('href', 'https://github.com/GalvanAlexis/bladoPC');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('muestra la versión de la app', () => {
    renderSidebar(true);
    expect(screen.getByText(/v1\.0\.0/)).toBeInTheDocument();
  });
});
