import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mealsCategorySearch,
  drinksCategorySearch, removeCategory } from '../../redux/actions';
import { fetchMealsCategory, fetchDrinksCategory,
  fetchDrinksFiltered, fetchMealsFiltered } from '../../utils/SearchApi';

export default function CategoryFilter() {
  const [mealsFilter, setMealsFilter] = useState<any>([]);
  const [drinksFilter, setDrinksFilter] = useState<any>([]);
  const [mealsCategory, setMealsCategory] = useState<any>([]);
  const [drinksCategory, setDrinksCategory] = useState<any>([]);
  const [toggleMeals, setToggleMeals] = useState(false);
  const [toggleDrinks, setToggleDrink] = useState(false);
  const { pathname } = useLocation();
  const mealsSlice = mealsCategory.slice(0, 5);
  const drinksSlice = drinksCategory.slice(0, 5);

  const dispatch = useDispatch();
  // console.log(drinksFilter);

  useEffect(() => {
    const fetchApis = async () => {
      const dataMeals = await fetchMealsCategory();
      setMealsCategory(dataMeals);
      const dataDrinks = await fetchDrinksCategory();
      setDrinksCategory(dataDrinks);
    };
    fetchApis();
  }, []);

  const handleClickFilterMeals = async (e: any) => {
    if (toggleMeals === false) {
      const name = e.target.innerText;
      const data = await fetchMealsFiltered(name);
      dispatch(mealsCategorySearch(data));
      setMealsFilter(data);
      setToggleMeals(true);
    }
    if (toggleMeals === true) {
      dispatch(removeCategory());
      setToggleMeals(false);
    }
  };

  const handleClickFilterDrinks = async (e: any) => {
    if (toggleDrinks === false) {
      const name = e.target.innerText;
      const data = await fetchDrinksFiltered(name);
      dispatch(drinksCategorySearch(data));
      setDrinksFilter(data);
      setToggleDrink(true);
    }
    if (toggleDrinks === true) {
      dispatch(removeCategory());
      setToggleDrink(false);
    }
  };

  const handleResetCategory = () => {
    dispatch(removeCategory());
  };

  return (
    <div>
      {pathname === '/meals' && (
        <>
          {mealsSlice.map((meal: any, index: string) => (
            <button
              key={ index }
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ handleClickFilterMeals }
            >
              {meal.strCategory}
            </button>
          ))}
          <button
            data-testid="All-category-filter"
            onClick={ handleResetCategory }
          >
            All

          </button>
        </>
      )}
      {pathname === '/drinks' && (
        <>
          {drinksSlice.map((drink: any, index: string) => (
            <button
              key={ index }
              data-testid={ `${drink.strCategory}-category-filter` }
              onClick={ handleClickFilterDrinks }

            >
              {drink.strCategory}
            </button>
          ))}
          <button
            data-testid="All-category-filter"
            onClick={ handleResetCategory }
          >
            All

          </button>
        </>
      )}
    </div>
  );
}
