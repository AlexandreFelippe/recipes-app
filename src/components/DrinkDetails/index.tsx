import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header';
import { fetchDrinksRecipesDetails, fetchMealsApi } from '../../utils/SearchApi';
import './style.css';

export default function DrinkDetails() {
  const [drinks, setDrinks] = useState<any>();
  const [mealsRecommended, setMealsRecommended] = useState<any>([]);
  const [copied, setCopied] = useState(false);

  const { id } = useParams();

  const mealsSlice = mealsRecommended.slice(0, 6);

  useEffect(() => {
    if (!id) return;
    const fechtsApi = async () => {
      try {
        const dataDrinks = await fetchDrinksRecipesDetails(id);
        if (dataDrinks) setDrinks(dataDrinks);
        const dataMeals = await fetchMealsApi();
        setMealsRecommended(dataMeals);
      } catch (error) {
        console.error('Erro ao buscar detalhes da refeição:', error);
      }
    };
    fechtsApi();
  }, [id]);

  const getIngredients = () => {
    if (!drinks || !drinks.length) return [];
    const drink = drinks[0];
    const validIngredients: string[] = [];

    for (let index = 1; index <= 20; index++) {
      const ingredientKey = `strIngredient${index}`;
      const measureKey = `strMeasure${index}`;

      const ingredientValue = drink[ingredientKey];
      const measureValue = drink[measureKey];

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
      <Header title="DrinkDetails" search={ false } profile />
      {Array.isArray(drinks) && drinks.map((drink: any, index: any) => (
        <div key={ index }>
          <div>
            <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
            <button data-testid="share-btn" onClick={ handleShareClick }>Share</button>
            <button data-testid="favorite-btn">Favorite</button>
            { copied && <span>Link copied!</span> }
          </div>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
          <p data-testid="instructions">{ drink.strInstructions }</p>
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
      <div className="container-recommended-meals">
        <div className="meals-recommended">
          {Array.isArray(mealsSlice) && mealsSlice.map((meal, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ meal.strMealThumb }
              className="card-recommended-meals"
            >
              <h3
                data-testid={ `${index}-recommendation-title` }
              >
                {meal.strMeal }

              </h3>
              <img
                className="meals-img"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid="recipe-photo"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
