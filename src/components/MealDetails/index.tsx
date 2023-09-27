import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header';
import { fetchMealsRecipesDetails, fetchDrinksApi } from '../../utils/SearchApi';
import './styles.css';

export default function MealDetails() {
  const [meals, setMeals] = useState<any>();
  const [drinksRecommended, setDrinksRecommended] = useState<any>([]);
  const [copied, setCopied] = useState(false);

  const { id } = useParams();

  const drinksSlice = drinksRecommended.slice(0, 6);

  useEffect(() => {
    if (!id) return;
    const fechtsApi = async () => {
      try {
        const dataMeals = await fetchMealsRecipesDetails(id);
        if (dataMeals) setMeals(dataMeals);
        const dataDrinks = await fetchDrinksApi();
        setDrinksRecommended(dataDrinks);
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

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => console.error('Erro ao copiar link:', error));
  };

  return (
    <>
      <Header title="MealsDetails" search={ false } profile />
      {Array.isArray(meals) && meals.map((meal: any, index: any) => (
        <div key={ index }>
          <div>
            <h3 data-testid="recipe-title">{meal.strMeal }</h3>
            <button data-testid="share-btn" onClick={ handleShareClick }>Share</button>
            <button data-testid="favorite-btn">Favorite</button>
            { copied && <span>Link copied!</span> }
          </div>
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
      <h3>Recomendados</h3>
      <div className="container-recommended-drinks">
        <div className="drinks-recommended">
          {Array.isArray(drinksSlice) && drinksSlice.map((drink, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ drink.strDrink }
              className="card-recommended-drinks"
            >
              <h3
                data-testid={ `${index}-recommendation-title` }
              >
                {drink.strDrink }

              </h3>
              <img
                className="drinks-img"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid="recipe-photo"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
