import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Header from '../Header';
import { fetchMealsRecipesDetails, fetchDrinksApi } from '../../utils/SearchApi';
import './styles.css';
import shortcake from '../../images/🦆 emoji _shortcake_.svg';
import shareIcon from '../../images/Share.svg';
import like from '../../images/like.svg';
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
      <Header title="" search={ false } profile />
      {Array.isArray(meals) && meals.map((meal: any, index: any) => (
        <div key={ index }>
          <div>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid="recipe-photo"
              className="img-details"
            />
            <div>
              <h3
                data-testid="recipe-title"
                className="title-details"
              >
                {meal.strMeal }
              </h3>
              <button
                data-testid="share-btn"
                onClick={ handleShareClick }
                className="share-btn"
              >
                <img src={ shareIcon } alt="share" />
              </button>
              <img
                src={ shortcake }
                alt="like"
                className="shortcake"
              />
              <input
                className="favorite-btn"
                type="image"
                src={ favorite ? like : whiteHeart }
                alt="Favorite"
                data-testid="favorite-btn"
                onClick={ saveFavorite }
              />
              { copied && <span>Link copied!</span> }
              <p
                data-testid="recipe-category"
                className="category"
              >
                { meal.strCategory }
              </p>
            </div>
          </div>
          <h3
            className="h3"
          >
            Ingredients
          </h3>
          <div className="conteiner">
            <ul
              className="list-ingredients"
            >
              {getIngredients().map((ingredient, index2) => (
                <li
                  data-testid={ `${index2}-ingredient-name-and-measure` }
                  key={ index2 }
                >
                  {ingredient}

                </li>
              ))}
            </ul>
          </div>
          <h3
            className="h3"
          >
            Instructions
          </h3>
          <div className="conteiner">
            <p
              data-testid="instructions"
              className="instructions"
            >
              { meal.strInstructions }
            </p>
          </div>
          <h3
            className="h3"
          >
            Video
          </h3>
          <iframe
            className="video"
            data-testid="video"
            width="560"
            height="315"
            src={ meals[0].strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            allowFullScreen
          />
        </div>
      ))}
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
