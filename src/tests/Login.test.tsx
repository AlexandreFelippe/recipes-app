import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/Login/Login';

test('renderiza o formulário de login', () => {
  const { getByText, getByTestId } = render(<Login />);

  const loginHeader = getByText('Login');
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const submitButton = getByTestId('login-submit-btn');

  expect(loginHeader).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('valida e-mail e senha corretamente', () => {
  const { getByTestId } = render(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const submitButton = getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
