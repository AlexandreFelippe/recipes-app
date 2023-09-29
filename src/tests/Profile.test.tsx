import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';

const route = '/profile';
const route2 = '/';
describe('Testa a rota de perfil', () => {
  test('Testa a rota de perfil', () => {
    renderWithRouterAndRedux(<App />, route);
    const h1 = screen.getByRole('heading', { name: /Profile/i });
    expect(h1).toBeInTheDocument();
  });
  test('Testa o botão que redireciona para o login ', async () => {
    renderWithRouterAndRedux(<App />, route);
    const button = await screen.findByRole('button', { name: /Logout/i });
    await userEvent.click(button);
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
  });
  test('Testa o botão que redireciona para o Done Recipes ', async () => {
    renderWithRouterAndRedux(<App />, route);
    const button = await screen.findByRole('button', { name: /Done Recipes/i });
    await userEvent.click(button);
    expect(screen.getByRole('heading', { name: /Done Recipes/i })).toBeInTheDocument();
  });
  test('Testa o botão que redireciona para o Favorite Recipes ', async () => {
    renderWithRouterAndRedux(<App />, route);
    const button = await screen.findByRole('button', { name: /Favorite Recipes/i });
    await userEvent.click(button);
    expect(screen.getByRole('heading', { name: /Favorite Recipes/i })).toBeInTheDocument();
  });
  test('Testa se não aparece o email no perfil', () => {
    renderWithRouterAndRedux(<App />, route);
    const email = 'Email não encontrado';
    expect(screen.getByText(email)).toBeInTheDocument();
  });
  test('Testa se aparece o email no Profile usando o localStorage', () => {
    renderWithRouterAndRedux(<App />, route2);
    const email = 'trybe@gmail.com';
    localStorage.setItem('user', JSON.stringify({ email }));
    renderWithRouterAndRedux(<App />, route);
    const emailProfile = screen.getByTestId('profile-email');
    expect(emailProfile).toBeInTheDocument();
    expect(emailProfile).toHaveTextContent(email);
  });
});
