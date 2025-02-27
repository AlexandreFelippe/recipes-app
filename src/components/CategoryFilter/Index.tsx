import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mealsCategorySearch,
  drinksCategorySearch, removeCategory } from '../../redux/actions';
import { fetchMealsCategory, fetchDrinksCategory,
  fetchDrinksFiltered, fetchMealsFiltered } from '../../utils/SearchApi';
import prato from '../../images/icone-prato.svg';
import iconeBebida from '../../images/icone-bebida.svg';
import imagestocategory from './imagestocategory';
import style from './CategoryFilter.module.css';

export default function CategoryFilter() {
  const [mealsCategory, setMealsCategory] = useState<any>([]);
  const [drinksCategory, setDrinksCategory] = useState<any>([]);
  const [toggleMeals, setToggleMeals] = useState(false);
  const [toggleDrinks, setToggleDrink] = useState(false);
  const { pathname } = useLocation();
  const mealsSlice = mealsCategory.slice(0, 5);
  const drinksSlice = drinksCategory.slice(0, 5);

  const dispatch = useDispatch();

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
    <div className={ style.container }>
      {pathname === '/meals' && (
        <>
          <button
            className={ style.categoryButton }
            data-testid="All-category-filter"
            onClick={ handleResetCategory }
          >
            <img src={ prato } alt="All foods" className={ style.allButton } />
            All
          </button>
          {mealsSlice.map((meal: any, index: string) => (
            <button
              className={ style.categoryButton }
              key={ index }
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ handleClickFilterMeals }
            >
              {imagestocategory(meal.strCategory)}
              {meal.strCategory}
            </button>
          ))}
        </>
      )}
      {pathname === '/drinks' && (
        <>
          <button
            className={ style.categoryButton }
            data-testid="All-category-filter"
            onClick={ handleResetCategory }
          >
            <img src={ iconeBebida } alt="All foods" className={ style.allButton } />
            All
          </button>
          {drinksSlice.map((drink: any, index: string) => (
            <button
              className={ style.categoryButton }
              key={ index }
              data-testid={ `${drink.strCategory}-category-filter` }
              onClick={ handleClickFilterDrinks }
            >
              {imagestocategory(drink.strCategory)}
              {drink.strCategory}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
