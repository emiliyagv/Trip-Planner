import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Signup from './Signup';
import { BrowserRouter as Router } from 'react-router-dom'; 

describe('Signup component', () => {

  test('renders Signup page', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
  
    const signupHeading = screen.getByText('Sign up');
    expect(signupHeading).toBeInTheDocument();
  });
 
  test('renders sign up form fields correctly', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
  
    const firstNameInput = screen.getByText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByText('Email Address');
    const passwordInput = screen.getByText('Password');
  
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders login form correctly', () => {
    const { getByLabelText, getByText, getByRole, getAllByText } = render(
      <Router> 
        <Signup />
      </Router>
      
    );

    const loginLink = screen.getByText("Already have an account? Login");
    fireEvent.click(loginLink);

    expect(getAllByText('Login')[0]).toBeInTheDocument();    
    expect(getByText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText("Don't have an account? Sign Up")).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

 
  
  test('handles form submission with empty fields', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
  
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);
  
    const errorMessage = await waitFor(() => screen.getByText('Name is not provided'));
    expect(errorMessage).toBeInTheDocument();
  });
  
  
  
  test('toggles between sign up and login form', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const loginLink = screen.getByText('Already have an account? Login');
    fireEvent.click(loginLink);
    expect(screen.getAllByText('Login')[0]).toBeInTheDocument();


    const signUpLink = screen.getByText("Don't have an account? Sign Up");
    fireEvent.click(signUpLink);
    expect(screen.getAllByText('Sign up')[0]).toBeInTheDocument();


  });
  
  test('displays error message for invalid email', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
    const signUpLink = screen.getByText("Already have an account? Login");
    fireEvent.click(signUpLink);
    const emailLabelText = screen.getByText('Email Address');
    const emailInputField = emailLabelText.nextElementSibling.querySelector('input');
    const loginButton = screen.getByRole('button', { name: 'Login' });
  
    fireEvent.change(emailInputField, { target: { value: 'invalid-email' } });
    fireEvent.click(loginButton);
  
    const errorMessage = await waitFor(() => screen.getByText('Email is not provided'));
    expect(errorMessage).toBeInTheDocument();
  });
  
  test('displays error message for missing password', async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const signUpLink = screen.getByText("Already have an account? Login");
    fireEvent.click(signUpLink);
  
    const emailLabelText = screen.getByText('Email Address');
    const emailInputField = emailLabelText.nextElementSibling.querySelector('input');
    const loginButton = screen.getByRole('button', { name: 'Login' });
  
    fireEvent.change(emailInputField, { target: { value: 'test@example.com' } });
    fireEvent.click(loginButton);
  
    const errorMessage = await waitFor(() => screen.getByText('Password is not provided'));
    expect(errorMessage).toBeInTheDocument();
  });
});
