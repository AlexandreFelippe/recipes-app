import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

const rotaFetch = '/drinks/15997/in-progress';

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
    waitFor(() => {
      expect(window.location.pathname).toBe('/done-recipes');
    }, { timeout: 5000 });
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
      await screen.findByRole('checkbox', { name: /null Ginger ale/i });
    }, { timeout: 5000 });
    await user.click(screen.getByRole('checkbox', { name: /null Ginger ale/i }));
    screen.debug();
    expect(screen.getByRole('checkbox', { name: /null Ginger ale/i })).toBeChecked();
  });
  test('Testa o botão finish recipe', async () => {
    const route = rotaFetch;
    const { user } = renderWithRouterAndRedux(<App />, route);
    const finishButton = await screen.findByRole('button', { name: /finish recipe/i });
    await waitFor(async () => {
      await screen.findByRole('checkbox', { name: /2 1\/2 shots Galliano/i });
    }, { timeout: 5000 });
    const checkbox1 = await screen.findByRole('checkbox', { name: /2 1\/2 shots Galliano/i });
    const checkbox2 = await screen.findByRole('checkbox', { name: /null Ginger ale/i });
    const checkbox3 = await screen.findByRole('checkbox', { name: /null Ice/i });
    await user.click(checkbox1);
    await user.click(checkbox2);
    await user.click(checkbox3);
    await user.click(finishButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/done-recipes');
    }, { timeout: 5000 });
  });
});
