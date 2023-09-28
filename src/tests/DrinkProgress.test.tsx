import { screen } from '@testing-library/react';
import DrinkProgres from '../components/DrinkProgress/DrinkProgress';
import renderWithRouter from '../renderwithRouter';

describe('DrinkProgress page', () => {
  test('renders correctly', () => {
    renderWithRouter(<DrinkProgres />);
    expect(screen.getByText('DrinkProgress')).toBeInTheDocument();
  });
});
