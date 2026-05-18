import '@testing-library/jest-dom';

// Polyfill de structuredClone para entornos Node donde no está disponible
// (requerido por @dagrejs/dagre en tests)
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
}
