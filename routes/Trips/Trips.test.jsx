import React from 'react';
import { act, render, fireEvent, waitFor, screen } from '@testing-library/react';
import Trips from './Trips';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider, AuthContext } from '../../src/context/AuthContextProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createMemoryHistory } from 'history'; 
import { UserAuth } from '../../src/context/AuthContextProvider'


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  

describe('Trips component', () => {
    const theme = createTheme();
    const mockedNavigate = jest.fn();
    const mockUser = { email: 'test@example.com' };
  
    beforeEach(() => {
      jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);
    });
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    test('should navigate to /signup if user is not signed in', async () => {
      let renderResult;
      await act(async () => {
        renderResult = render(
          <Router>
            <ThemeProvider theme={theme}>
            <AuthContextProvider>
            <Trips />
          </AuthContextProvider>
            </ThemeProvider>
          </Router>
        );
      });
  
      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('/Signup');
      });
    });
  
    test('should submit form with valid inputs', async () => {
      await act(async () => {
        render(
          <Router>
            <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{ user: { email: 'test@example.com' } }}>
          <Trips />
        </AuthContext.Provider>
            </ThemeProvider>
          </Router>
        );
      });

      const destinationInput = screen.getByLabelText(/Where to\?/i);
      const startDateInput = screen.getByLabelText(/Start date/i);
      const endDateInput = screen.getByLabelText(/End date/i);
      const submitButton = screen.getByRole('button', { name: /Start Planning/i });
    
      await act(async () => {
    fireEvent.change(destinationInput, { target: { value: 'Paris' } });
    fireEvent.change(startDateInput, { target: { value: '2023-06-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-06-15' } });
    fireEvent.click(submitButton);
  });
    
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/tripdetails', {
      state: {
        data: {
          tripId: expect.any(String),
          destination: 'Paris',
          startDate: '6/1',
          endDate: '6/15',
        },
      },
    });
    expect(screen.queryByText(/Please provide all the details/i)).toBeNull();
    expect(screen.queryByText(/End date cannot be earlier than start date/i)).toBeNull();
  });
});
  test('should show error for missing fields', async () => {
    
    const { getByRole, getByText } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <Trips />
          </AuthContextProvider>
        </ThemeProvider>
      </Router>
    );

    const submitButton = getByRole('button', { name: 'Start Planning' });
    fireEvent.click(submitButton);

    expect(getByText(/Please provide all the details/i)).toBeInTheDocument();
  });


  test('should show error for invalid date range', async () => {
  
    const { getByRole, getByText, getByPlaceholderText, getAllByText } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <AuthContextProvider value={{ user: null }}>
            <Trips />
          </AuthContextProvider>
        </ThemeProvider>
      </Router>
    );
  
    await waitFor(() => {
      act(() => {
              const destinationInput = getByPlaceholderText('e.g., Paris, Hawaii, Japan');
      const startDateLabel = getAllByText('Start date').find(
        (label) => label.tagName.toLowerCase() === 'label'
      );
      const endDateLabel = getAllByText('End date').find(
        (label) => label.tagName.toLowerCase() === 'label'
      );
  
      const startDateInput = startDateLabel.parentElement.querySelector('input[type="date"]');
      const endDateInput = endDateLabel.parentElement.querySelector('input[type="date"]');
  
      fireEvent.change(destinationInput, { target: { value: 'Paris' } });
      fireEvent.change(startDateInput, { target: { value: '2023-06-15' } });
      fireEvent.change(endDateInput, { target: { value: '2023-06-01' } });
  
      const submitButton = getByRole('button', { name: 'Start Planning' });
      fireEvent.click(submitButton);
    });
  });
  
    await waitFor(() => {
      expect(getByText(/End date cannot be earlier than start date/i)).toBeInTheDocument();
    });
  });
test('should redirect to signup page when not logged in', async () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider value={{ user: null }}>
            <Trips />
          </AuthContextProvider>
        </ThemeProvider>
      </Router>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});