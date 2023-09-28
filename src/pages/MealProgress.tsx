import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsRecipesDetails } from '../utils/SearchApi';

export default function MealProgress() {
  const { id } = useParams();
  const [meals, setMeals] = useState<any>([]);

  useEffect(() => {
    if (!id) return;
    const fechtsApi = async () => {
      try {
        const dataMeals = await fetchMealsRecipesDetails(id);
        if (dataMeals) {
          setMeals(dataMeals);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes da refeição:', error);
      }
    };
    fechtsApi();
  }, [id]);

  const getIngredients = () => {
    if (!meals || !meals.length) return [];
    const meal = meals[0];
    const validIngredients: string[] = [];
    for (let index = 1; index <= 20; index++) {
      const ingredientKey = `strIngredient${index}`;
      const measureKey = `strMeasure${index}`;
      const ingredientValue = meal[ingredientKey];
      const measureValue = meal[measureKey];
      if (ingredientValue && ingredientValue !== null) {
        const combinedValue = `${measureValue} ${ingredientValue}`;
        validIngredients.push(combinedValue);
      }
    }
    return validIngredients;
  };

  return (
    <div>
      {meals.map((meal: any, mealIndex: any) => (
        <div key={ mealIndex }>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{meal.strMeal}</h1>
          <button data-testid="share-btn">Share</button>
          <button data-testid="favorite-btn">Favorite</button>
          <h2 data-testid="recipe-category">{meal.strCategory}</h2>

          {getIngredients().map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}

          <p data-testid="instructions">{meal.strInstructions}</p>
          <button data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      ))}
    </div>
  );
}
