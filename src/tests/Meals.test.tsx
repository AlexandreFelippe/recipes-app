import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

describe('testes do Meals', () => {
  test('Testa os filtros do componente:', async () => {
    const route = '/meals';
    renderWithRouterAndRedux(<App />, route);
    await waitFor(async () => {
      await screen.findByRole('img', { name: /corba/i });
    }, { timeout: 5000 });
    screen.getByRole('img', { name: /sushi/i });
  });
});
