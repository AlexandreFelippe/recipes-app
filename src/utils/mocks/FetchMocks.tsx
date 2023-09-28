import drinkCategories from './drinkCategories';

export const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(drinkCategories),
});
