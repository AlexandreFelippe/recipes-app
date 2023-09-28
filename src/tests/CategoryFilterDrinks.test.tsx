import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
import { cocoaDrinks } from '../utils/mocks/CocoaDrinks';

const rotaFetch = '../utils/SearchApi';
describe.only('Testa os filtros de Bebida do Header:', () => {
  beforeEach(() => {
    vi.mock(rotaFetch, async () => {
      const actual = await vi.importActual(rotaFetch) as object;
      return {
        ...actual,
        fetchDrinksFiltered: vi.fn().mockResolvedValue(cocoaDrinks.drinks),
      };
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Testa os filtros do componente:', async () => {
    const route = '/drinks';
    const { user } = renderWithRouterAndRedux(<App />, route);
    await waitFor(() => {
      screen.getByRole('button', { name: /ordinary drink/i });
    }, { timeout: 5000 });
    const DrinkButton = screen.getByRole('button', { name: /ordinary drink/i });
    await user.click(DrinkButton);
    screen.findByRole('img', { name: /mile long island iced tea/i });
    await user.click(DrinkButton);
    screen.findByRole('img', { name: /gg/i });
  });
});
