import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderwithRouter';
import App from '../App';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';

describe('Footer component', () => {
  test('Click para navegar para outra rotas', async () => {
    const route = '/drinks';
    renderWithRouterAndRedux(<App />, route);
    const drinks = 'drinks-bottom-btn';
    await userEvent.click(screen.getByTestId(drinks));
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
  test('Click para navegar para a rota meals', async () => {
    const route = '/meals';
    renderWithRouterAndRedux(<App />, route);
    const meals = 'meals-bottom-btn';
    await userEvent.click(screen.getByTestId(meals));
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    screen.debug();
  });
});
