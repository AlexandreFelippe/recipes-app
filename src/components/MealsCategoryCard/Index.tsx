import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReduxState } from '../../types';
import styles from './MealsCategoryCard.module.css';

export default function MealsCategoryCard() {
  const { meals } = useSelector((state: ReduxState) => state.mealsCategorySearch);
  const mealsData = meals.slice(0, 12);

  return (
    <div className={ styles.container }>
      {mealsData.map((meal, index) => (
        <Link
          className={ styles.box }
          key={ index }
          to={ `/meals/${meal.idMeal}` }
        >
          <div
            className={ styles.meals }
            key={ meal.strMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <h3
              className={ styles.h3 }
              data-testid={ `${index}-card-name` }
            >
              { meal.strMeal }
            </h3>
            <img
              className={ styles.img }
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
