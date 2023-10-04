import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReduxState } from '../../types';
import styles from './DrinksCard.module.css';

export default function DrinksCard() {
  const { drinks } = useSelector((state: ReduxState) => state.drinks);
  const drinksData = drinks.slice(0, 12);

  return (
    <div className={ styles.container }>
      {drinksData.map((drink, index) => (
        <Link
          className={ styles.box }
          key={ index }
          to={ `/drinks/${drink.idDrink}` }
        >
          <div
            className={ styles.drinks }
            key={ drink.strDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <h3
              className={ styles.h3 }
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
            </h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
