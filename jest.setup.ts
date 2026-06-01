import '@testing-library/jest-dom';

// Polyfill de structuredClone para entornos Node donde no está disponible
// (requerido por @dagrejs/dagre en tests)
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
}

// Mockear dependencias ESM de react-markdown para los tests
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: React.ReactNode }) {
    return `<div>{children}</div>`;
  };
});
jest.mock('remark-gfm', () => jest.fn());
jest.mock('rehype-highlight', () => jest.fn());
