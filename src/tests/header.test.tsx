import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import Meals from '../pages/Meals/index';
import Drinks from '../pages/Drinks/index';
import DoneRecipes from '../pages/DoneRecipes/index';
import FavoriteRecipes from '../pages/FavoriteRecipes/index';
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

test('Testando o botão do perfil', async () => {
  const route = '/meals';
  renderWithRouterAndRedux(<App />, route);
  const profileButton = 'profile-top-btn';
  expect(screen.getByTestId(profileButton)).toBeInTheDocument();
  await userEvent.click(screen.getByTestId(profileButton));
  expect(screen.getByTestId('page-title')).toBeInTheDocument();
});
