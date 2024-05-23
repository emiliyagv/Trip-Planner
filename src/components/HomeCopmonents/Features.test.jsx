import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from './Features';

jest.mock('./Hero/styles', () => () => ({
  featuresContainer: 'mock-featuresContainer',
  featuresTitle: 'mock-featuresTitle',
}));

describe('Features Component', () => {
  test('renders Features component', () => {
    render(<Features />);

    expect(screen.getByText('Features to make your next trip easier.')).toBeInTheDocument();
    const images = screen.queryAllByAltText('');
    expect(images).toHaveLength(4);

    images.forEach(image => {
      expect(image).toBeInTheDocument();
    });

    expect(images[0]).toHaveAttribute('src', '/images/featureimages/MainFeatureTiles__addPlaces.png');
    expect(images[1]).toHaveAttribute('src', '/images/featureimages/MainFeatureTiles__budget.png');
    expect(images[2]).toHaveAttribute('src', '/images/featureimages/MainFeatureTiles__checklist.png');
    expect(images[3]).toHaveAttribute('src', '/images/featureimages/MainFeatureTiles__recommendations.png');
  });
  test('renders feature items with correct alt text and source URLs', () => {
    render(<Features />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4); 

    images.forEach((image, index) => {
      expect(image).toHaveAttribute('alt', expect.any(String)); 
      expect(image).toHaveAttribute('src', expect.stringContaining('featureimages')); 
    });
  });

});
