import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import { BrowserRouter as Router } from 'react-router-dom'; 

describe('Signup component', () => {
  test('renders login form correctly', () => {
    const { getByLabelText, getByText, getByRole } = render(
      <Router> 
        <Signup />
      </Router>
      
    );
    
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText("Don't have an account? Sign Up")).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('renders signup form correctly', () => {
    const { getByLabelText, getByText, getByRole } = render(
      <Router> 
        <Signup />
      </Router>
    );
    
    fireEvent.click(getByText("Don't have an account? Sign Up"));

    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Already have an account? Login')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
