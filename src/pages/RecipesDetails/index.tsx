import { useParams, useLocation } from 'react-router-dom';
import DrinkDetails from '../../components/DrinkDetails';
import MealDetails from '../../components/MealDetails';
import StartRecipesBtn from '../../components/StartRecipeBtn';

function RecipesDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const mealsUrl = () => pathname === `/meals/${id}`;
  const drinksUrl = () => pathname === `/drinks/${id}`;

  return (
    <>
      {mealsUrl() && <MealDetails />}
      {drinksUrl() && <DrinkDetails />}
      <StartRecipesBtn />
    </>
  );
}

export default RecipesDetails;
