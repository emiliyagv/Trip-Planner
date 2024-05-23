import React from 'react';
import { render, fireEvent, waitFor, screen, act, within} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Review from './Review';
import { UserAuth } from '../../src/context/AuthContextProvider';
import { useJsApiLoader } from '@react-google-maps/api';


jest.mock('firebase/firestore', () => {
    const firebaseMock = require('../../jest/__mocks__/firebase-firestore').default;
    return firebaseMock;
});
  
jest.mock('../../src/config/firebase-config', () => require('../../jest/__mocks__/firebase-config'));
jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn(),
}));

jest.mock('../../src/context/AuthContextProvider', () => ({
  UserAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));



describe('Review component', () => {
    const mockNavigate = jest.fn();
    const firebaseMock = require('../../jest/__mocks__/firebase-firestore').default;

    beforeAll(() => {

        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });
    beforeEach(() => {
        const firebaseMock = require('../../jest/__mocks__/firebase-firestore').default;
        firebaseMock.getDoc.mockResolvedValue({
          exists: jest.fn().mockReturnValue(true),
          data: jest.fn().mockReturnValue({ reviews: [] }),
        });
      });
  
  beforeEach(() => {
    useJsApiLoader.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });

   
    UserAuth.mockReturnValue({
      user: { uid: 'test-uid', email: 'test@example.com' },
      logout: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    act(() => {
      render(
        <Router>
          <Review />
        </Router>
      );
    });
    expect(screen.getByRole('heading', { name: /Write a review, help others with your experience/i })).toBeInTheDocument();
  });
  test('shows the review form when "Write a review" button is clicked', async () => {
    render(
      <Router>
        <Review />
      </Router>
    );
  
    const input = screen.getByPlaceholderText('Search for places');
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(screen.getByText('Search'));
  
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveTextContent(/Write a review, help others with your experience/i);
    });
  
    await waitFor(() => {
      const writeReviewButton = screen.queryByText(/Write a review/i);
      fireEvent.click(writeReviewButton);
      expect(writeReviewButton).not.toBeNull(); 
    });
  
    
  });
  test('searches and displays place details', async () => {
    render(
      <Router>
        <Review />
      </Router>
    );
  
    const input = screen.getByPlaceholderText('Search for places');
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(screen.getByText('Search'));
  
    await waitFor(() => {
      expect(screen.getByDisplayValue('Paris')).toBeInTheDocument();
    });
  });

  test('deletes a review', async () => {
    const mockUserReviews = [
      {
        reviewId: '1',
        placeDetails: { name: 'Great Place', photo: 'photo1.jpg' },
        rating: 4,
        title: 'Great Place',
        visitDate: '2022-01-01',
        reviewText: 'Loved it!',
      },
    ];
    console.log('Initial Render:');

    UserAuth.mockReturnValue({
      user: { uid: 'test-uid', email: 'test@example.com' },
      logout: jest.fn(),
    });
  
    render(
      <Router>
<Review initialReviews={mockUserReviews} />
      </Router>
    );


    const reviewCard = screen.getByTestId('review-title-1');
    
    const deleteButton = within(reviewCard).getByTestId('delete-button-1');

   fireEvent.click(deleteButton);

   await waitFor(() => {
    expect(screen.queryByText('Great Place')).not.toBeInTheDocument();
   });

  });
});
