import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import App from '../App';

test('Testa a rota Meals:', () => {
  renderWithRouterAndReduxAndRedux(<Meals />);
  const searchImage = screen.getByRole('img', { name: /pesquisar/i });
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /meals/i });
  expect(profileButton).toBeInTheDocument();
  expect(searchImage).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('Testa a rota drinks:', () => {
  renderWithRouterAndRedux(<Drinks />);
  const searchImage = screen.getByRole('img', { name: /pesquisar/i });
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /drinks/i });
  expect(profileButton).toBeInTheDocument();
  expect(searchImage).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('Testa a rota done-recipies:', () => {
  renderWithRouterAndRedux(<DoneRecipes />);
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /done recipes/i });
  expect(profileButton).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('Testa a rota favorite-recipies:', () => {
  renderWithRouterAndRedux(<FavoriteRecipes />);
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /favorite recipes/i });
  expect(profileButton).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
});
test('toggleSearchVisibility alterna a visibilidade da entrada de pesquisa', async () => {
  const route = '/meals';
  renderWithRouterAndRedux(<App />, route);
  const searchInput = 'search-input';
  const searchButton = 'search-top-btn';

  expect(screen.getByTestId(searchButton)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(searchButton));
  expect(await screen.findByTestId(searchInput)).toBeInTheDocument();
});

test('Testando o botão do perfil', async () => {
  const route = '/meals';
  renderWithRouterAndRedux(<App />, route);
  const profileButton = 'profile-top-btn';
  expect(screen.getByTestId(profileButton)).toBeInTheDocument();
  await userEvent.click(screen.getByTestId(profileButton));
  expect(screen.getByTestId('page-title')).toBeInTheDocument();
});
