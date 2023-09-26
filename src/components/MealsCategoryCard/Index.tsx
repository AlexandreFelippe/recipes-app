import { useSelector } from 'react-redux';
import { ReduxState } from '../../types';

export default function MealsCategoryCard() {
  const { meals } = useSelector((state: ReduxState) => state.mealsCategorySearch);
  const mealsData = meals.slice(0, 12);

  return (
    <>
      {mealsData.map((meal, index) => (
        <div key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
          <h3 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
        </div>
      ))}
    </>
  );
}
