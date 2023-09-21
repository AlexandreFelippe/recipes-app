export const fetchIngredients = async (ingrediente: string) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};

export const fetchName = async (name: string) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?s=${name}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};

export const fetchFirstLetter = async (letter: string) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?f=${letter}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.meals;
  return results;
};
