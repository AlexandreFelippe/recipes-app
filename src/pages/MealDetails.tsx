import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchMealsRecipesDetails } from '../utils/SearchApi';

export default function MealDetails() {
  const [meals, setMeals] = useState<any>();
  const { id } = useParams();
  console.log(meals);

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
    <>
      <Header title="MealsDetails" search={ false } profile />
      {Array.isArray(meals) && meals.map((meal: any, index: any) => (
        <div key={ index }>
          <h3 data-testid="recipe-title">{meal.strMeal }</h3>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">{ meal.strCategory }</p>
          <p data-testid="instructions">{ meal.strInstructions }</p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ meals[0].strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            allowFullScreen
          />
        </div>
      ))}
      <h3>Ingredientes</h3>
      <ul>
        {getIngredients().map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {ingredient}

          </li>
        ))}
      </ul>
    </>
  );
}
