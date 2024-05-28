import '@testing-library/jest-dom';
if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(), 
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    };
  }