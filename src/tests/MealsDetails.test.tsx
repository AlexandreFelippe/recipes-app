import { screen, waitFor } from '@testing-library/dom';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

const route = '/meals/52771';

describe('MealDetails page', () => {
  test('renders correctly', () => {
    renderWithRouterAndRedux(<App />, route);
    expect(screen.getByText('MealsDetails')).toBeInTheDocument();
  });
  test('Testa o botão share:', async () => {
    const { user } = renderWithRouterAndRedux(<App />, route);
    const shareButton = await screen.findByRole('img', { name: /share/i });
    await user.click(shareButton);
    screen.getByText(/link copied!/i);
  });
  test('Testa o botão favorite:', async () => {
    const { user } = renderWithRouterAndRedux(<App />, route);
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await user.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });
  test('Testa o botão start recipe:', async () => {
    const { user } = renderWithRouterAndRedux(<App />, route);
    const startRecipeButton = await screen.findByRole('button', { name: /start recipe/i });
    await user.click(startRecipeButton);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /finish recipe/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
