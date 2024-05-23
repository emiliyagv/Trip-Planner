import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import  {AuthContextProvider, AuthContext } from '../../../src/context/AuthContextProvider';
import { createMemoryHistory } from 'history'; 
import TripDetails from './TripDetails';
import * as firebase from 'firebase/firestore';
import { UserAuth } from '../../../src/context/AuthContextProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles';



jest.mock('firebase/firestore', () => {
  const firebaseMock = require('../../../jest/__mocks__/firebase-firestore').default;
  return firebaseMock;
});
jest.mock('../../../src/config/firebase-config', () => require('../../../jest/__mocks__/firebase-config'));




describe('TripDetails', () => {
  const theme = createTheme();

  test('renders TripDetails component', () => {
    const { getByText } = render(
      <Router>
        <TripDetails />
      </Router>
    );

    expect(getByText(/Trip to/i)).toBeInTheDocument();
  });

  test('renders TripDetails component with location state', () => {
    const locationState = {
      data: {
        tripId: 'trip-123',
        destination: 'New York',
        startDate: '2023-06-01',
        endDate: '2023-06-10',
        tripData: {
          title: 'Trip to New York',
          startDate: '2023-06-01',
          endDate: '2023-06-10',
        },
      },
    };

    const { getByText } = render(
      <Router>
        <MemoryRouter initialEntries={[{ state: locationState }]}>
          <Routes>
            <Route path="*" element={<TripDetails />} />
          </Routes>
        </MemoryRouter>
      </Router>
    );

    expect(getByText(/Trip to New York/i)).toBeInTheDocument();
    expect(getByText(/2023-06-01 - 2023-06-10/i)).toBeInTheDocument();
  });

  test('fetches coordinates and sets zoom level', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        features: [
          {
            geometry: {
              coordinates: [-73.98, 40.71],
            },
            place_type: ['city'],
          },
        ],
      }),
    });

    render(
      <Router>
        <TripDetails />
      </Router>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });

  test('adds a place to userPlaces', () => {
    const place = {
      name: 'Central Park',
      photo: { images: { large: { url: 'https://example.com/photo.jpg' } } },
      address: 'New York, NY',
      rating: 4.5,
      cuisine: 'Park',
      website: 'https://www.centralparknyc.org/',
    };

    render(
      <Router>
        <TripDetails />
      </Router>
    );

    const addPlaceButton = screen.getAllByRole('button', { name: /Add/i })[0];
    fireEvent.click(addPlaceButton);

    expect(screen.getByText(/Central Park/i)).toBeInTheDocument();
  });

  test('saves trip details', async () => {
    const mockGetDoc = jest.fn().mockResolvedValue({
      data: jest.fn().mockReturnValue({ trips: [] }),
    });
    const mockUpdateDoc = jest.fn();
    const mockArrayUnion = jest.fn();



    render(
      <Router>
        <TripDetails />
      </Router>
    );

    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateDoc).toHaveBeenCalled();
    });
  });

  test('handles missing destination', async () => {
    const locationState = {
      data: {
        tripId: 'trip-123',
        startDate: '2023-06-01',
        endDate: '2023-06-10',
        tripData: {
          startDate: '2023-06-01',
          endDate: '2023-06-10',
        },
      },
    };

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const navigateMock = jest.spyOn(useNavigate, 'mockResolvedValue');

    render(
      <Router>
        <MemoryRouter initialEntries={[{ state: locationState }]}>
          <Routes>
            <Route path="*" element={<TripDetails />} />
          </Routes>
        </MemoryRouter>
      </Router>
    );

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        'This location does not exist in our database for now. Thank you for you understanding!'
      );
      expect(navigateMock).toHaveBeenCalledWith('/Trips');
    });
  });

  test('renders child components',  async () => {
    const locationState = {
      data: {
        tripId: 'trip-123',
        destination: 'New York',
        startDate: '2023-06-01',
        endDate: '2023-06-10',
        tripData: {
          title: 'Trip to New York',
          startDate: '2023-06-01',
          endDate: '2023-06-10',
        },
      },
    };

    await act(async () => {

    const { getByText } = render(
       <MemoryRouter initialEntries={[{ state: locationState }]}>
                    <ThemeProvider theme={theme}>

        <AuthContextProvider>
        <Routes>
          <Route path="*" element={<TripDetails />} />
          </Routes>

        </AuthContextProvider>
        </ThemeProvider>

    </MemoryRouter>
    );
  });
screen.debug()
    expect(getByText(/Explore new places/i)).toBeInTheDocument();
    expect(getByText(/Reservations/i)).toBeInTheDocument();
    expect(getByText(/Places to visit/i)).toBeInTheDocument();
    expect(getByText(/Your daily itinerary/i)).toBeInTheDocument();
  });
});