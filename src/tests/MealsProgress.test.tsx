import { screen } from '@testing-library/dom';
import MealProgress from '../pages/MealProgress';
import renderWithRouter from '../renderwithRouter';

describe('MealProgress page', () => {
  test('renders correctly', () => {
    renderWithRouter(<MealProgress />);
    expect(screen.getByText('MealProgress')).toBeInTheDocument();
  });
});
