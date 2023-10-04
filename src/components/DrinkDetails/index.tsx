import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Header from '../Header/index';
import { fetchDrinksRecipesDetails, fetchMealsApi } from '../../utils/SearchApi';
import './style.css';
import shareIcon from '../../images/Share.svg';
import like from '../../images/like.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

export default function DrinkDetails() {
  const [drinks, setDrinks] = useState<any>();
  const [mealsRecommended, setMealsRecommended] = useState<any>([]);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { id } = useParams();

  const mealsSlice = mealsRecommended.slice(0, 6);

  const isFavorited = useCallback(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((recipe: any) => recipe.id === id);
  }, [id]);

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
    setFavorite(isFavorited());
  }, [id, isFavorited]);

  const getIngredients = () => {
    if (!drinks || !drinks.length) return [];
    const drink = drinks[0];
    const validIngredients: string[] = [];

    for (let index = 1; index <= 20; index += 1) {
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

  const saveFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (isFavorited()) {
      const newFavorites = favoriteRecipes.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorite(false);
    } else {
      const newFavorite = {
        id,
        type: 'drink',
        nationality: '',
        category: drinks[0].strCategory,
        alcoholicOrNot: drinks[0].strAlcoholic,
        name: drinks[0].strDrink,
        image: drinks[0].strDrinkThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newFavorite]));
      setFavorite(true);
    }
  };

  return (
    <>
      <Header title="DrinkDetails" search={ false } profile />
      {Array.isArray(drinks) && drinks.map((drink: any, index: any) => (
        <div key={ index }>
          <div>
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              className="img-details2"
            />
            <div>
              <h3
                data-testid="recipe-title"
                className="title-details"
              >
                { drink.strDrink }
              </h3>
              <button
                data-testid="share-btn"
                onClick={ handleShareClick }
                className="share-btn"
              >
                <img src={ shareIcon } alt="share" />
              </button>
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
                { drink.strAlcoholic }
              </p>
            </div>
          </div>
          <h3
            className="h3"
          >
            Ingredientes
          </h3>
          <div
            className="conteiner"
          >
            <ul>
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
          <div
            className="conteiner"
          >
            <p
              data-testid="instructions"
            >
              { drink.strInstructions }
            </p>
          </div>
        </div>
      ))}
      <h3
        className="h3"
      >
        Recomendados
      </h3>
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
