import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchDrinksApi, fetchMealsApi } from '../../utils/SearchApi';
import { mealsData, drinksData } from '../../redux/actions';
import MealsCard from '../MealsCard';
import DrinksCard from '../DrinksCard';
import DrinksSearchCard from '../DrinksSearchCard';
import MealsSearchCard from '../MealsSearchCard';
import { ReduxState } from '../../types';

export default function Recipes() {
  const { pathname } = useLocation();
  const [selectedCategory, setselectedCategory] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const { meals } = useSelector((state: ReduxState) => state.mealsSearch);
  const { drinks } = useSelector((state: ReduxState) => state.drinksSearch);
  console.log(drinks.length);

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
  }, []);

  const checkDrinks = () => {
    if (pathname === '/drinks' && drinks.length === 0) return true;
  };

  const checkMeals = () => {
    if (pathname === '/meals' && meals.length === 0) return true;
  };

  return (
    <>
      { checkDrinks() && <DrinksCard /> }
      { checkMeals() && <MealsCard /> }
      { drinks.length > 0 && <DrinksSearchCard />}
      { meals.length > 0 && <MealsSearchCard />}
    </>
  );
}
