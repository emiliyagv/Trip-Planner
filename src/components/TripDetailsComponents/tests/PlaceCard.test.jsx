import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaceCard from '../PlaceCard';
import { BrowserRouter as Router } from 'react-router-dom';

const places = [
  {
    imageUrl: 'http://example.com/image1.jpg',
    title: 'Place 1',
    cuisine: [{ name: 'Italian' }, { name: 'Mexican' }],
    rating: 4.5,
  },
  {
    imageUrl: 'http://example.com/image2.jpg',
    title: 'Place 2',
    cuisine: [{ name: 'Chinese' }, { name: 'Thai' }],
    rating: 4.1,
  },
  {
    imageUrl: 'http://example.com/image2.jpg',
    title: 'Place 3',
    cuisine: [ { name: 'Japanese' }],
    rating: 4.4,
  },
  {
    imageUrl: 'http://example.com/image2.jpg',
    title: 'Place 4',
    cuisine: [{ name: 'Indonesian' }, { name: 'Vietnamese' }],
    rating: 4.6,
  },
];
const swipeEvent = new CustomEvent('swipe', {
  bubbles: true,
  cancelable: true,
  detail: { deltaX: 100 } 
});
const mockHandleAddPlace = jest.fn();
const mockHandleDelete = jest.fn();

describe('PlaceCard Component', () => {
  test('renders the PlaceCard component with places', () => {
    render(
      <Router>
        <PlaceCard places={places} handleAddPlace={mockHandleAddPlace} handleDelete={mockHandleDelete} />
      </Router>
    );

    places.forEach(place => {
      expect(screen.getByText(place.title)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${place.rating}`)).toBeInTheDocument();
      place.cuisine.forEach(cuisine => {
        expect(screen.getByText(cuisine.name)).toBeInTheDocument();
      });
    });
  });

  test('calls handleAddPlace when "Add to Places" button is clicked', () => {
    render(
      <Router>
        <PlaceCard places={places} handleAddPlace={mockHandleAddPlace} handleDelete={mockHandleDelete} />
      </Router>
    );

    const addButton = screen.getAllByText('Add to Places')[0];
    fireEvent.click(addButton);

    expect(mockHandleAddPlace).toHaveBeenCalledWith(places[0]);
  });

  test('calls handleDelete when delete button is clicked', () => {
    render(
      <Router>
        <PlaceCard places={places} handleAddPlace={mockHandleAddPlace} handleDelete={mockHandleDelete} />
      </Router>
    );

    const deleteButton = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButton[0]);

    expect(mockHandleDelete).toHaveBeenCalledWith(0);
  });

  test('renders Next and Prev arrows conditionally', () => {
    render(
      <Router>
        <PlaceCard places={places} handleAddPlace={mockHandleAddPlace} handleDelete={mockHandleDelete} />
      </Router>
    );

    const slickList = document.getElementsByClassName('slick-list')[0];
    slickList.dispatchEvent(swipeEvent);
    const nextArrow =screen.getByTestId('NextArrow')

    expect(nextArrow).toBeInTheDocument();

    fireEvent.click(nextArrow);

    expect(screen.getByTestId('PrevArrow')).toBeInTheDocument();
  });
});
