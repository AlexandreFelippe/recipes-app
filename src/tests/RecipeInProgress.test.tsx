import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import { oneMeal } from '../utils/mocks/spicyArrabiataPenne';
import App from '../App';
// import { cocoaDrinks } from '../utils/mocks/CocoaDrinks';

const rotaFetch = '/meals/52771/in-progress';

describe('testes da página RecipeInProgress', () => {
  // beforeEach(() => {
  //   vi.mock(rotaFetch, async () => {
  //     const actual = await vi.importActual(rotaFetch) as object;
  //     return {
  //       ...actual,
  //       fetchMealsRecipesDetails: vi.fn().mockResolvedValue(oneMeal.meals),
  //     };
  //   });
  // });
  // afterEach(() => {
  //   vi.restoreAllMocks();
  // });
  test('Testa o botão share:', async () => {
    const route = rotaFetch;
    const { user } = renderWithRouterAndRedux(<App />, route);
    const shareButton = await screen.findByRole('img', { name: /share/i });
    await user.click(shareButton);
    screen.getByText(/link copied!/i);
  });
  test('Testa o botão favorite:', async () => {
    const route = rotaFetch;
    const { user } = renderWithRouterAndRedux(<App />, route);
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await user.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });
  test('Testa o checkbox:', async () => {
    const route = rotaFetch;
    const { user } = renderWithRouterAndRedux(<App />, route);
    await waitFor(async () => {
      await screen.findByRole('checkbox', { name: /1 pound penne rigate/i });
    }, { timeout: 5000 });
    await user.click(screen.getByRole('checkbox', { name: /1 pound penne rigate/i }));
    screen.debug();
    expect(screen.getByRole('checkbox', { name: /1 pound penne rigate/i })).toBeChecked();
  });
});
