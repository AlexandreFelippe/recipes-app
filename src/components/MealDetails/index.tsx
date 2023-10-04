import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Header from '../Header';
import { fetchMealsRecipesDetails, fetchDrinksApi } from '../../utils/SearchApi';
import './styles.css';
import share from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

export default function MealDetails() {
  const [meals, setMeals] = useState<any>();
  const [drinksRecommended, setDrinksRecommended] = useState<any>([]);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { id } = useParams();

  const drinksSlice = drinksRecommended.slice(0, 6);

  const isFavorited = useCallback(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((recipe: any) => recipe.id === id);
  }, [id]);

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
    setFavorite(isFavorited());
  }, [id, isFavorited]);

  const getIngredients = () => {
    if (!meals || !meals.length) return [];
    const meal = meals[0];
    const validIngredients: string[] = [];

    for (let index = 1; index <= 20; index += 1) {
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

  const saveFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (isFavorited()) {
      const newFavorites = favoriteRecipes.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorite(false);
    } else {
      const newFavorite = {
        id,
        type: 'meal',
        nationality: meals[0].strArea,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newFavorite]));
      setFavorite(true);
    }
  };

  return (
    <div
      className="container-details"
    >
      <Header title="MealsDetails" search={ false } profile />
      {Array.isArray(meals) && meals.map((meal: any, index: any) => (
        <div key={ index }>
          <div>
            <h3
              data-testid="recipe-title"
            >
              {meal.strMeal }
            </h3>
            <button data-testid="share-btn" onClick={ handleShareClick }>
              <img src={ share } alt="share" />
            </button>
            <input
              type="image"
              src={ favorite ? blackHeart : whiteHeart }
              alt="Favorite"
              data-testid="favorite-btn"
              onClick={ saveFavorite }
            />
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
    </div>
  );
}
