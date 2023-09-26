import { screen } from '@testing-library/dom';
import MealDetails from '../components/MealDetails';
import renderWithRouter from '../renderwithRouter';

describe('MealDetails page', () => {
  test('renders correctly', () => {
    renderWithRouter(<MealDetails />);
    expect(screen.getByText('MealDetails')).toBeInTheDocument();
  });
});
