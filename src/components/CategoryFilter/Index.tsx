import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMealsCategory, fetchDrinksCategory } from '../../utils/SearchApi';

export default function CategoryFilter() {
  const [mealsCategory, setMealsCategory] = useState<any>([]);
  const [drinksCategory, setDrinksCategory] = useState<any>([]);
  const { pathname } = useLocation();
  const mealsSlice = mealsCategory.slice(0, 5);
  const drinksSlice = drinksCategory.slice(0, 5);
  console.log(mealsCategory);
  console.log(drinksCategory);
  useEffect(() => {
    const fetchApis = async () => {
      const dataMeals = await fetchMealsCategory();
      setMealsCategory(dataMeals);
      const dataDrinks = await fetchDrinksCategory();
      setDrinksCategory(dataDrinks);
    };
    fetchApis();
  }, []);
  return (
    <div>
      {pathname === '/meals' && (
        <>
          {mealsSlice.map((meal: any, index: string) => (
            <button
              key={ index }
              data-testid={ `${meal.strCategory}-category-filter` }
            >
              {meal.strCategory}
            </button>
          ))}
        </>
      )}
      {pathname === '/drinks' && (
        <>
          {drinksSlice.map((drink: any, index: string) => (
            <button
              key={ index }
              data-testid={ `${drink.strCategory}-category-filter` }
            >
              {drink.strCategory}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
