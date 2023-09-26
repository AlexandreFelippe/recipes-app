import { useParams, useLocation } from 'react-router-dom';
import DrinkDetails from '../DrinkDetails';
import MealDetails from '../MealDetails';

function RecipesDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const mealsUrl = () => pathname === `/meals/${id}`;
  const drinksUrl = () => pathname === `/drinks/${id}`;

  return (
    <>
      {mealsUrl() && <MealDetails />}
      {drinksUrl() && <DrinkDetails />}
    </>
  );
}

export default RecipesDetails;
