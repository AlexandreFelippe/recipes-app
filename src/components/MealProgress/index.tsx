import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsRecipesDetails } from '../../utils/SearchApi';

export default function MealProgress() {
  const [meals, setMeals] = useState<any>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(20)
    .fill(false));

  const { id } = useParams();

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

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  return (
    <div>
      { Array.isArray(meals) && meals.map((meal: any, mealIndex: any) => (
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
            <div key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                style={ { textDecoration: checkedIngredients[index]
                  ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
              >
                <input type="checkbox" onChange={ () => toggleIngredient(index) } />
                {ingredient}
              </label>
            </div>
          ))}

          <p data-testid="instructions">{meal.strInstructions}</p>
          <button data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      ))}
    </div>
  );
}
