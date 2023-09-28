import { screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from '../renderwithRouter';

describe('Login page', () => {
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const loginButton = 'login-submit-btn';
  const value = 'valid-email@example.com';

  test('renders login form', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByTestId(emailInput)).toBeInTheDocument();
    expect(screen.getByTestId(passwordInput)).toBeInTheDocument();
    expect(screen.getByTestId(loginButton)).toBeInTheDocument();
  });

  test('disables login button when form is invalid', () => {
    renderWithRouter(<Login />);
    expect(screen.getByTestId(loginButton)).toBeDisabled();
    fireEvent.change(screen.getByTestId(emailInput), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByTestId(passwordInput), { target: { value: '123' } });
    expect(screen.getByTestId(loginButton)).toBeDisabled();
  });

  test('enables login button when form is valid', () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByTestId(emailInput), { target: { value } });
    fireEvent.change(screen.getByTestId(passwordInput), { target: { value: 'valid-password' } });
    expect(screen.getByTestId(loginButton)).not.toBeDisabled();
  });

  test('submits form with valid email to local storage', () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByTestId(emailInput), { target: { value } });
    fireEvent.change(screen.getByTestId(passwordInput), { target: { value: 'valid-password' } });
    fireEvent.click(screen.getByTestId(loginButton));
    const storedUser = JSON.parse(localStorage.getItem('user') as string);
    expect(storedUser).toEqual({ email: 'valid-email@example.com' });
  });
});
