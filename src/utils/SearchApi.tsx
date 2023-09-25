export const fetchIngredients = async (ingrediente: string) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};

export const fetchName = async (name: string) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};

export const fetchFirstLetter = async (letter: string) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};

export const fetchIngredientsDrinks = async (ingrediente: string) => {
  const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.drinks;
  return results;
};

export const fetchNameDrinks = async (name: string) => {
  const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.drinks;
  return results;
};

export const fetchFirstLetterDrinks = async (letter: string) => {
  const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.drinks;
  return results;
};

export const fetchMealsApi = async () => {
  const URL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};

export const fetchDrinksApi = async () => {
  const URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.drinks;
  return results;
};

export const fetchMealsCategory = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await data.json();
  return response.meals;
};

export const fetchDrinksCategory = async () => {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await data.json();
  return response.drinks;
};
