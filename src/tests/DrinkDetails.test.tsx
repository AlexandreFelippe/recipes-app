import { screen } from '@testing-library/react';
import DrinkDetails from '../components/DrinkDetails';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';

describe('DrinkDetails page', () => {
  test('renders correctly', () => {
    renderWithRouterAndRedux(<DrinkDetails />);
    expect(screen.getByText('DrinkDetails')).toBeInTheDocument();
  });
});
