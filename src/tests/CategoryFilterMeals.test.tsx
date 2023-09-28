import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import beefMeals from '../utils/mocks/BeefMeals';
import App from '../App';

const rotaFetch = '../utils/SearchApi';
describe.only('testes dos filtros de Comida do Header', () => {
  beforeEach(() => {
    vi.mock(rotaFetch, async () => {
      const actual = await vi.importActual(rotaFetch) as object;
      return {
        ...actual,
        fetchMealsFiltered: vi.fn().mockResolvedValue(beefMeals.meals),
      };
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Testa os filtros do componente:', async () => {
    const route = '/meals';
    const { user } = renderWithRouterAndRedux(<App />, route);
    const beefButton = await screen.findByRole('button', { name: /beef/i });
    await user.click(beefButton);
    screen.findByRole('img', { name: /beef and mustard pie/i });
    await user.click(beefButton);
  });
});
