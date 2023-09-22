import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchDrinksApi, fetchMealsApi } from '../../utils/SearchApi';
import { mealsData, drinksData } from '../../redux/actions';
import MealsCard from '../MealsCard';
import DrinksCard from '../DrinksCard';

export default function Recipes() {
  const { pathname } = useLocation();
  const [selectedCategory, setselectedCategory] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === '/drinks') {
      const drinks = async () => {
        const data = await fetchDrinksApi();
        dispatch(drinksData(data));
      };
      drinks();
    }

    if (pathname === '/meals') {
      const meals = async () => {
        const data = await fetchMealsApi();
        dispatch(mealsData(data));
      };
      meals();
    }
  }, []);

  return (
    <>
      { pathname === '/drinks' && <DrinksCard /> }
      { pathname === '/meals' && <MealsCard /> }
    </>
  );
}
