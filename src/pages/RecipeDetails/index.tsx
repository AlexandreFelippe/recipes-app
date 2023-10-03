import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DrinkDetails from '../../components/DrinkDetails';
import MealDetails from '../../components/MealDetails';
import StartRecipeBtn from '../../components/StartRecipeBtn';
import ContinueRecipeBtn from '../../components/ContinueRecipeBtn';

function RecipeDetails() {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const { id: rawId } = useParams();
  const id = rawId!;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMeal = pathname.includes('/meals/');
  const isDrink = pathname.includes('/drinks/');
  let category: 'meals' | 'drinks' | null = null;
  if (isMeal) {
    category = 'meals';
  } else if (isDrink) {
    category = 'drinks';
  }

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');

    const isRecipeDone = doneRecipes.some((recipe: any) => recipe.id === id);
    const isRecipeInProgress = category
      && inProgressRecipes[category] ? !!inProgressRecipes[category][id] : false;

    setIsDone(isRecipeDone);
    setIsInProgress(isRecipeInProgress);
  }, [id, isMeal, isDrink, category]);

  const handleClick = () => {
    if (isDrink) navigate(`/drinks/${id}/in-progress`);
    if (isMeal) navigate(`/meals/${id}/in-progress`);
  };

  return (
    <>
      {isMeal && <MealDetails />}
      {isDrink && <DrinkDetails />}
      {
        !isDone && (
          isInProgress
            ? <ContinueRecipeBtn handleClick={ handleClick } />
            : <StartRecipeBtn handleClick={ handleClick } />
        )
      }
    </>
  );
}

export default RecipeDetails;
