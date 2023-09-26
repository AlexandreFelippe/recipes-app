import { useSelector } from 'react-redux';
import { ReduxState } from '../../types';

export default function DrinksCategoryCard() {
  const { drinks } = useSelector((state: ReduxState) => state.drinksCategorySearch);
  const drinksData = drinks.slice(0, 12);

  return (
    <>
      {drinksData.map((drink, index) => (
        <div key={ drink.strDrink } data-testid={ `${index}-recipe-card` }>
          <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </div>
      ))}
    </>
  );
}
