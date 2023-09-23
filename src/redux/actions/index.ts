export const SUBMIT_USER = 'SUBMIT_USER';
export const MEALS_DATA = 'MEALS_DATA';
export const DRINKS_DATA = 'DRINKS_DATA';
export const DRINKS_SEARCH = 'DRINKS_SEARCH';
export const MEALS_SEARCH = 'MEALS_SEARCH';

export const submitUser = (email: string) => ({
  type: SUBMIT_USER,
  payload: email,
});

export const mealsData = (data: any) => ({
  type: MEALS_DATA,
  payload: data,
});

export const drinksData = (data: any) => ({
  type: DRINKS_DATA,
  payload: data,
});

export const mealsSearch = (data: any) => ({
  type: MEALS_SEARCH,
  payload: data,
});

export const drinksSearch = (data: any) => ({
  type: DRINKS_SEARCH,
  payload: data,
});
