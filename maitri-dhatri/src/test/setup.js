import '@testing-library/jest-dom';

// Mock Leaflet CSS expectations
Object.defineProperty(global, 'CSS', { writable: true, value: null });

// ResizeObserver mock
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;
