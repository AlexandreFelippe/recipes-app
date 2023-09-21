import { screen } from '@testing-library/react';
import renderWithRouter from '../renderwithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profiles';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

test('Testa a rota Meals:', () => {
  renderWithRouter(<Meals />);
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
test('Testa a rota profile:', () => {
  renderWithRouter(<Profile />);
  const profileButton = screen.getByRole('button', { name: /perfil/i });
  const h1 = screen.getByRole('heading', { name: /profile/i });
  expect(profileButton).toBeInTheDocument();
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
