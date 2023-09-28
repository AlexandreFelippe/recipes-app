import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';

import App from '../App';

test('toggleSearchVisibility alterna a visibilidade da entrada de pesquisa', async () => {
  const route = '/meals';
  renderWithRouterAndRedux(<App />, route);
  const searchInput = 'search-input';
  const searchButton = 'search-top-btn';

  expect(screen.getByTestId(searchButton)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(searchButton));
  expect(await screen.findByTestId(searchInput)).toBeInTheDocument();
  userEvent.type(await screen.findByTestId(searchInput), 'p');
  userEvent.click(screen.getByText(/first letter/i));
  userEvent.click(screen.getByRole('button', { name: /search/i }));
  expect(screen.findByRole('heading', { name: /pad see ew/i }));
  expect(screen.findByRole('img', { name: /pad see ew/i }));
});
