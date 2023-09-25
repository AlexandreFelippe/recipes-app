import { combineReducers } from 'redux';
import meals from './mealsDefault';
import drinks from './drinksDefault';
import mealsSearch from './mealsSearch';
import drinksSearch from './drinksSearch';
import drinksCategorySearch from './categoryDrink';
import mealsCategorySearch from './categoryMeals';

const rootreducer = combineReducers({
  meals,
  drinks,
  mealsSearch,
  drinksSearch,
  drinksCategorySearch,
  mealsCategorySearch,
});

export default rootreducer;
