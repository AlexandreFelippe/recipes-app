export function saveRecipiesMeals(idMeals: string, step: string) {
  const getLocalStorage = localStorage.getItem('inProgressRecipes');
  if (getLocalStorage) {
    const getParseStorage = JSON.parse(getLocalStorage);
    if (getParseStorage.meals[idMeals]) {
      const newSteps = [...getParseStorage.meals[idMeals], step];
      getParseStorage.meals[idMeals] = newSteps;
      localStorage.setItem('inProgressRecipes', JSON.stringify(getParseStorage));
    } else {
      getParseStorage.meals[idMeals] = [step];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getParseStorage));
    }
  } else {
    const getParseStorage = {
      meals: {
        [idMeals]: [step],
      },
      drinks: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getParseStorage));
  }
}

export function saveRecipiesDrinks(id: string, step: string) {
  const getLocalStorage = localStorage.getItem('inProgressRecipes');
  if (getLocalStorage) {
    const getParseStorage = JSON.parse(getLocalStorage);
    if (getParseStorage.drinks[id]) {
      const newSteps = [...getParseStorage.drinks[id], step];
      getParseStorage.drinks[id] = newSteps;
      localStorage.setItem('inProgressRecipes', JSON.stringify(getParseStorage));
    } else {
      getParseStorage.drinks[id] = [step];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getParseStorage));
    }
  } else {
    const getParseStorage = {
      drinks: {
        [id]: [step],
      },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getParseStorage));
  }
}
