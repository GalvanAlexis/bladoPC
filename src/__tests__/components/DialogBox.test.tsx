/**
 * Tests para src/components/DialogBox.tsx
 * Cubre: renderizado, choices, typewriter, formulario de pregunta libre
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DialogBox from '@/components/DialogBox';

// ── Helpers ───────────────────────────────────────────────────────────────────

const defaultProps = {
  speakerName: 'Blado',
  text: 'Hola mortal',
  choices: [
    { label: 'Opción A', action: jest.fn() },
    { label: 'Opción B', action: jest.fn() },
  ],
};

// ── Tests de renderizado base ─────────────────────────────────────────────────

describe('DialogBox — renderizado', () => {
  it('muestra el nombre del hablante', () => {
    render(<DialogBox {...defaultProps} />);
    expect(screen.getByText('Blado')).toBeInTheDocument();
  });

  it('renderiza el texto (puede estar parcial por typewriter)', async () => {
    render(<DialogBox {...defaultProps} />);
    // Espera a que el typewriter termine de escribir
    await waitFor(() => {
      expect(screen.getByText('Hola mortal')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('muestra todas las choices como botones', () => {
    render(<DialogBox {...defaultProps} />);
    expect(screen.getByText('Opción A')).toBeInTheDocument();
    expect(screen.getByText('Opción B')).toBeInTheDocument();
  });
});

// ── Tests de interacción con choices ─────────────────────────────────────────

describe('DialogBox — choices', () => {
  it('llama la action al clickear una choice', async () => {
    const actionA = jest.fn();
    render(
      <DialogBox
        {...defaultProps}
        choices={[{ label: 'Click Me', action: actionA }]}
      />
    );
    await userEvent.click(screen.getByText('Click Me'));
    expect(actionA).toHaveBeenCalledTimes(1);
  });

  it('con choices vacías no muestra botones de opción', () => {
    render(<DialogBox {...defaultProps} choices={[]} />);
    expect(screen.queryByRole('button', { name: /Opción/i })).not.toBeInTheDocument();
  });
});

// ── Tests del botón Cerrar ─────────────────────────────────────────────────────

describe('DialogBox — botón cerrar', () => {
  it('no muestra el botón Cerrar si onClose no se pasa', () => {
    render(<DialogBox {...defaultProps} />);
    expect(screen.queryByText('Cerrar')).not.toBeInTheDocument();
  });

  it('muestra el botón Cerrar si onClose se pasa', () => {
    render(<DialogBox {...defaultProps} onClose={jest.fn()} />);
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });

  it('llama onClose al clickear Cerrar', async () => {
    const onClose = jest.fn();
    render(<DialogBox {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByText('Cerrar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ── Tests del formulario de pregunta libre ────────────────────────────────────

describe('DialogBox — pregunta libre', () => {
  it('no muestra el botón de pregunta si onAskQuestion no se pasa', () => {
    render(<DialogBox {...defaultProps} />);
    expect(screen.queryByText(/pregunta abierta/i)).not.toBeInTheDocument();
  });

  it('muestra botón de pregunta si onAskQuestion se pasa', () => {
    render(<DialogBox {...defaultProps} onAskQuestion={jest.fn()} />);
    expect(screen.getByText(/pregunta abierta/i)).toBeInTheDocument();
  });

  it('al clickear el botón aparece el input', async () => {
    render(<DialogBox {...defaultProps} onAskQuestion={jest.fn()} />);
    await userEvent.click(screen.getByText(/pregunta abierta/i));
    expect(screen.getByPlaceholderText(/Preguntale a Blado/i)).toBeInTheDocument();
  });

  it('al enviar el formulario llama onAskQuestion con el texto', async () => {
    const onAskQuestion = jest.fn();
    render(<DialogBox {...defaultProps} onAskQuestion={onAskQuestion} />);
    await userEvent.click(screen.getByText(/pregunta abierta/i));
    const input = screen.getByPlaceholderText(/Preguntale a Blado/i);
    await userEvent.type(input, 'Qué sabes de Python?');
    await userEvent.keyboard('{Enter}');
    expect(onAskQuestion).toHaveBeenCalledWith('Qué sabes de Python?');
  });

  it('no llama onAskQuestion si el input está vacío', async () => {
    const onAskQuestion = jest.fn();
    render(<DialogBox {...defaultProps} onAskQuestion={onAskQuestion} />);
    await userEvent.click(screen.getByText(/pregunta abierta/i));
    // Enter sin escribir nada
    await userEvent.keyboard('{Enter}');
    expect(onAskQuestion).not.toHaveBeenCalled();
  });
});

// ── Tests del estado isTyping ─────────────────────────────────────────────────

describe('DialogBox — isTyping', () => {
  it('muestra el cursor | cuando isTyping=true', () => {
    render(<DialogBox {...defaultProps} isTyping={true} />);
    // El cursor es un span con animate-pulse conteniendo '|'
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('no muestra el cursor cuando isTyping=false', () => {
    render(<DialogBox {...defaultProps} isTyping={false} />);
    expect(screen.queryByText('|')).not.toBeInTheDocument();
  });
});
