import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchDrinksApi, fetchMealsApi } from '../../utils/SearchApi';
import { mealsData, drinksData } from '../../redux/actions';
import MealsCard from '../MealsCard';
import DrinksCard from '../DrinksCard';
import DrinksSearchCard from '../DrinksSearchCard';
import MealsSearchCard from '../MealsSearchCard';
import { ReduxState } from '../../types';
import DrinksCategoryCard from '../DrinksCategoryCard/Index';
import MealsCategoryCard from '../MealsCategoryCard/Index';

export default function Recipes() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { meals } = useSelector((state: ReduxState) => state.mealsSearch);
  const { drinks } = useSelector((state: ReduxState) => state.drinksSearch);
  const filterCategoryMeals = useSelector((state: ReduxState) => state
    .mealsCategorySearch);
  const filterCategoryDrinks = useSelector((state: ReduxState) => state
    .drinksCategorySearch);
  // console.log(filterCategoryMeals.meals);

  useEffect(() => {
    if (pathname === '/drinks') {
      const drinksApi = async () => {
        const data = await fetchDrinksApi();
        dispatch(drinksData(data));
      };
      drinksApi();
    }

    if (pathname === '/meals') {
      const mealsApi = async () => {
        const data = await fetchMealsApi();
        dispatch(mealsData(data));
      };
      mealsApi();
    }
  }, [dispatch, pathname]);

  const checkDrinks = () => {
    if (pathname === '/drinks' && drinks.length === 0
    && filterCategoryDrinks.drinks.length === 0) {
      return true;
    }
  };

  const checkMeals = () => {
    if (pathname === '/meals' && meals.length === 0
    && filterCategoryMeals.meals.length === 0) {
      return true;
    }
  };

  return (
    <>
      { checkDrinks() && <DrinksCard /> }
      { checkMeals() && <MealsCard /> }
      { drinks && <DrinksSearchCard />}
      { meals && <MealsSearchCard />}
      { filterCategoryMeals.meals && <MealsCategoryCard />}
      { filterCategoryDrinks.drinks && <DrinksCategoryCard />}
    </>
  );
}
