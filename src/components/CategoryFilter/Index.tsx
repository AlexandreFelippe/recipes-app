import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMealsCategory, fetchDrinksCategory } from '../../utils/SearchApi';

export default function CategoryFilter() {
  const [mealsCategory, setMealsCategory] = useState<any>();
  const [drinksCategory, setDrinksCategory] = useState<any>();
  const { pathname } = useLocation();
  console.log(mealsCategory);
  console.log(drinksCategory);

  useEffect(() => {
    const fetchApis = async () => {
      const dataMeals = await fetchMealsCategory();
      setMealsCategory(dataMeals);
      // console.log(dataMeals);
      const dataDrinks = await fetchDrinksCategory();
      setDrinksCategory(dataDrinks);
      // console.log(dataDrinks);
    };
    fetchApis();
  }, []);

  return (
    <div>
      {/* {mealsCategory.meals.map((meal: string) => meal === mealsCategory
        .meals.strCategory)} */}
    </div>
  );
}
