import React from 'react';
import { render, screen } from '@testing-library/react';
import TrendingPlaces from './TrendingPlaces';
import { createTheme, ThemeProvider } from '@mui/material/styles';

describe('TrendingPlaces Component', () => {
    const theme = createTheme();

  test('renders without crashing', () => {
    render( 
    <ThemeProvider theme={theme}>
        <TrendingPlaces />
        </ThemeProvider>
        );
  });

  test('renders correct number of cards', () => {
    render(   <ThemeProvider theme={theme}>
        <TrendingPlaces />
        </ThemeProvider>
);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3); 
  });

  test('renders cards with correct title, author, and likes', () => {
    render(
        <ThemeProvider theme={theme}>
        <TrendingPlaces />
        </ThemeProvider>
);
    const cards = screen.getAllByRole('article');

    cards.forEach((card, index) => {
      const title = screen.getByText(/Discover your next favorite destination/i);
      const likes = screen.getAllByText(/\d+ likes/); 

      expect(title).toBeInTheDocument();
      expect(likes[0]).toBeInTheDocument();
    });
  });

  test('renders cards with valid image URLs', () => {
    render(   <ThemeProvider theme={theme}>
        <TrendingPlaces />
        </ThemeProvider>
);;
    const images = screen.getAllByRole('img');

    images.forEach((image) => {
      expect(image).toHaveAttribute('src', expect.stringContaining('/images/famousplaces/'));
    });
  });
});