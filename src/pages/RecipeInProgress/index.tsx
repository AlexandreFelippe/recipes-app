import { useLocation, useParams } from 'react-router-dom';
import DrinkProgress from '../DrinkProgress';
import MealProgress from '../MealProgress';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const mealsUrl = () => pathname === `/meals/${id}/in-progress`;
  const drinksUrl = () => pathname === `/drinks/${id}/in-progress`;

  return (
    <>
      {mealsUrl() && <MealProgress />}
      {drinksUrl() && <DrinkProgress />}
    </>
  );
}
