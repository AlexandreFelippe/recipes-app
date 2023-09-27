import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import DrinkDetails from '../../components/DrinkDetails';
import MealDetails from '../../components/MealDetails';
import StartRecipeBtn from '../../components/StartRecipeBtn';
import ContinueRecipeBtn from '../../components/ContinueRecipeBtn';

function RecipesDetails() {
  const [toggle, setToggle] = useState(true);
  const { id } = useParams();
  const { pathname } = useLocation();

  const mealsUrl = () => pathname === `/meals/${id}`;
  const drinksUrl = () => pathname === `/drinks/${id}`;

  const handleClick = () => setToggle(false);

  return (
    <>
      {mealsUrl() && <MealDetails />}
      {drinksUrl() && <DrinkDetails />}
      <ContinueRecipeBtn />
      { toggle && <StartRecipeBtn handleClick={ handleClick } />}
    </>
  );
}

export default RecipesDetails;
