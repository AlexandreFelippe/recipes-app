import { screen, waitFor } from '@testing-library/react';
// import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
// import { oneMeal } from '../utils/mocks/spicyArrabiataPenne';
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
    screen.findByText(/link copied!/i);
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
  test('Testa o botão finish recipe', async () => {
    const route = rotaFetch;
    const { user } = renderWithRouterAndRedux(<App />, route);
    const finishButton = await screen.findByRole('button', { name: /finish recipe/i });
    await waitFor(async () => {
      await screen.findByRole('checkbox', { name: /1 pound penne rigate/i });
    }, { timeout: 5000 });
    const checkbox1 = await screen.findByRole('checkbox', { name: /1 pound penne rigate/i });
    const checkbox2 = await screen.findByRole('checkbox', { name: /1\/4 cup olive oil/i });
    const checkbox3 = await screen.findByRole('checkbox', { name: /3 cloves garlic/i });
    const checkbox4 = await screen.findByRole('checkbox', { name: /1 tin chopped tomatoes/i });
    const checkbox5 = await screen.findByRole('checkbox', { name: '1/2 teaspoon red chile flakes' });
    const checkbox6 = await screen.findByRole('checkbox', { name: '1/2 teaspoon italian seasoning' });
    const checkbox7 = await screen.findByRole('checkbox', { name: '6 leaves basil' });
    const checkbox8 = await screen.findByRole('checkbox', { name: 'spinkling Parmigiano-Reggiano' });
    await user.click(checkbox1);
    await user.click(checkbox2);
    await user.click(checkbox3);
    await user.click(checkbox4);
    await user.click(checkbox5);
    await user.click(checkbox6);
    await user.click(checkbox7);
    await user.click(checkbox8);
    await user.click(finishButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/done-recipes');
    }, { timeout: 5000 });
  });
});
