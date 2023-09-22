import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderwithRouter';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import App from '../App';

test('Testa a rota Meals:', () => {
  renderWithRouterAndRedux(<Meals />);
  const searchImage = screen.getByRole('img', { name: /pesquisar/i });
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /meals/i });
  expect(profileButton).toBeInTheDocument();
  expect(searchImage).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('Testa a rota drinks:', () => {
  renderWithRouter(<Drinks />);
  const searchImage = screen.getByRole('img', { name: /pesquisar/i });
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /drinks/i });
  expect(profileButton).toBeInTheDocument();
  expect(searchImage).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('Testa a rota done-recipies:', () => {
  renderWithRouter(<DoneRecipes />);
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /done recipes/i });
  expect(profileButton).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('Testa a rota favorite-recipies:', () => {
  renderWithRouter(<FavoriteRecipes />);
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /favorite recipes/i });
  expect(profileButton).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('toggleSearchVisibility alterna a visibilidade da entrada de pesquisa', async () => {
  renderWithRouter(<App />, { route: '/meals' });
  const searchInput = 'search-input';
  const searchButton = 'search-top-btn';

  expect(screen.getByTestId(searchButton)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(searchButton));
  expect(await screen.findByTestId(searchInput)).toBeInTheDocument();
});

test('Testando o botão do perfil', async () => {
  renderWithRouter(<App />, { route: '/meals' });
  const profileButton = 'profile-top-btn';
  expect(screen.getByTestId(profileButton)).toBeInTheDocument();
  await userEvent.click(screen.getByTestId(profileButton));
  expect(screen.getByTestId('page-title')).toBeInTheDocument();
});

test('Testando a rota Profile', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const profileButton1 = screen.getByTestId('profile-top-btn');
  await user.click(profileButton1);
  expect(window.location.pathname).toBe('/profile');
  screen.debug();
});
