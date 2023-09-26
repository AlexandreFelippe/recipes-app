import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ReduxState = {
  meals: {
    meals: Meals;
  }

  drinks: {
    drinks: Drinks;
  }

  mealsSearch: {
    meals: Meals
  }

  drinksSearch: {
    drinks: Drinks;
  }

  mealsCategorySearch: {
    meals: Meals
  }

  drinksCategorySearch: {
    drinks: Drinks
  }
};

export type Drink = {
  strDrink: string;
  strDrinkThumb: string
  idDrink: string;
};

export type Drinks = Drink[];

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type Meals = Meal[];

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
