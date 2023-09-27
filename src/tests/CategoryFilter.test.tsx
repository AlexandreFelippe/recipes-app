import { screen, waitFor } from '@testing-library/react';
// import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
// import beefMeals from '../utils/mocks/BeefMeals';
import App from '../App';
// import { cocoaDrinks } from '../utils/mocks/CocoaDrinks';

// const rotaFetch = '../utils/SearchApi';

// describe('testes dos filtros de Comida do Header', () => {
//   beforeEach(() => {
//     vi.mock(rotaFetch, async () => {
//       const actual = await vi.importActual(rotaFetch) as object;
//       return {
//         ...actual,
//         fetchMealsFiltered: vi.fn().mockResolvedValue(beefMeals.meals),
//       };
//     });
//   });
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });
//   test('Testa os filtros do componente:', async () => {
//     const route = '/meals';
//     const { user } = renderWithRouterAndRedux(<App />, route);
//     const beefButton = await screen.findByRole('button', { name: /beef/i });
//     await user.click(beefButton);
//     screen.getByRole('img', { name: /beef and mustard pie/i });
//   });
// });

describe('Testa os filtros de Bebida do Header:', () => {
  // beforeEach(() => {
  //   vi.mock(rotaFetch, async () => {
  //     const actual = await vi.importActual(rotaFetch) as object;
  //     return {
  //       ...actual,
  //       fetchDrinksFiltered: vi.fn().mockResolvedValue(cocoaDrinks.drinks),
  //     };
  //   });
  // });
  // afterEach(() => {
  //   vi.restoreAllMocks();
  // });
  test.only('Testa os botões de filtro:', async () => {
    const route = '/drinks';
    const { user } = renderWithRouterAndRedux(<App />, route);
    // let cocoaButton;
    await waitFor(() => {
      screen.getByRole('button', { name: /cocoa/i });
    }, { timeout: 5000 });
    await user.click(screen.getByRole('button', { name: /cocoa/i }));
    // await user.click(screen.getByRole('button', { name: /cocoa/i }));
    await waitFor(() => {
      screen.getByRole('img', { name: /castillian hot chocolate/i });
    }, { timeout: 10000 });

    screen.debug();
  }, 30000);
});
