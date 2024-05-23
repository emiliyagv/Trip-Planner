import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Hero from './Hero';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserAuth } from '../../../../src/context/AuthContextProvider';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../../../src/context/AuthContextProvider', () => ({
  UserAuth: jest.fn(),
}));
afterEach(() => {
  cleanup();
});


const renderWithProviders = (ui, { theme } = {}) => {
  const defaultTheme = createTheme();

  return render(
    <ThemeProvider theme={theme || defaultTheme}>
      <Router>
        {ui}
      </Router>
    </ThemeProvider>
  );
};

describe('Hero component', () => {
  const mockedNavigate = jest.fn();
  
  beforeEach(() => {
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);
    UserAuth.mockReturnValue({ user: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Hero component', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText((content, element) => content.includes("Wait! Don't plan your trip yet!"))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes("We are here to make everything easier for you"))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes("Travel planning at its best. Build, organize, and map your custom itineraries in a free travel app designed for vacations & road trips, powered by our trip planner AI."))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Plan your trip/i })).toBeInTheDocument();
  });

  test('validates user and navigates on button click', () => {
    renderWithProviders(<Hero />);

    fireEvent.click(screen.getByRole('button', { name: /Plan your trip/i }));
    expect(mockedNavigate).toHaveBeenCalledWith('/Signup');
  });

  test('changes opacity on scroll', () => {
    renderWithProviders(<Hero />);

    const imageGrid = screen.getByAltText('');
    expect(imageGrid).toHaveStyle('opacity: 1');

    fireEvent.scroll(window, { target: { pageYOffset: 500 } });

    expect(imageGrid).toHaveStyle('opacity: 0.5');
  });
});
