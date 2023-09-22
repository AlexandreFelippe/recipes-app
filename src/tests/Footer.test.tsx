import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderwithRouter';
import App from '../App';

describe('Footer component', () => {
  test('Click para navegar para outra rotas', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const drinks = 'drinks-bottom-btn';
    await userEvent.click(screen.getByTestId(drinks));
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
  test('Click para navegar para a rota meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const meals = 'meals-bottom-btn';
    await userEvent.click(screen.getByTestId(meals));
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    screen.debug();
  });
});
