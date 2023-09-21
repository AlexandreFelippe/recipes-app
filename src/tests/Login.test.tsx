import { fireEvent } from '@testing-library/react';
import Login from '../pages/Login/Login';
import renderWithRouter from '../renderwithRouter';

test('renderiza o formulário de login', () => {
  const { getByText, getByTestId, user } = renderWithRouter(<Login />);

  const loginHeader = getByText('Login');
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const submitButton = getByTestId('login-submit-btn');

  user.type(emailInput, 'trybe@gmail.com');
  user.type(passwordInput, '1234567');
  user.click(submitButton);
  expect(loginHeader).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  /*  expect(screen.getByText('/meals')).toBeInTheDocument(); */
});

test('valida e-mail e senha corretamente', () => {
  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const submitButton = getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});

/* test('redireciona para a tela principal de receitas', () => {
  const { getByTestId, user } = renderWithRouter(<Login />);

  user.type(emailInput, 'trybe@gmail.com');
  user.type(passwordInput, '1234567');
  user.click(submitButton);
  expect(window.location.pathname).toBe('/meals');
}); */
