import { screen } from '@testing-library/react';
import DrinkDetails from '../components/DrinkDetails';
import renderWithRouter from '../renderwithRouter';

describe('DrinkDetails page', () => {
  test('renders correctly', () => {
    renderWithRouter(<DrinkDetails />);
    expect(screen.getByText('DrinkDetails')).toBeInTheDocument();
  });
});
