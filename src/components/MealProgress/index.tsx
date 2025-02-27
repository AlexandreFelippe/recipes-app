import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealsRecipesDetails } from '../../utils/SearchApi';
import shareIcon from '../../images/Share.svg';
import like from '../../images/like.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import styles from './style.module.css';

export default function MealProgress() {
  const [meals, setMeals] = useState<any>();
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(20)
    .fill(false));
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(meals);

  const isFavorited = useCallback(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((recipe: any) => recipe.id === id);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const mealProgress = savedProgress.meals?.[id];
    if (mealProgress) {
      setCheckedIngredients((prevState) => mealProgress
        .map((item: any, index: any) => item || prevState[index]));
    }

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
    setFavorite(isFavorited());
  }, [id, isFavorited]);

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

    const currentProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (!currentProgress.meals) {
      currentProgress.meals = {};
    }

    if (id) {
      currentProgress.meals[id] = newChecked;
    }

    currentProgress.meals[id!] = newChecked;
    localStorage.setItem('inProgressRecipes', JSON.stringify(currentProgress));
  };

  const handleShareClick = () => {
    const urlToCopy = `${window.location.origin}/meals/${id}`;
    navigator.clipboard.writeText(urlToCopy)
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
    } else if (meals) {
      const meal = meals[0];
      const newFavorite = {
        id,
        type: 'meal',
        nationality: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newFavorite]));
      setFavorite(true);
    }
  };

  const activeFinishRecipeButton = () => {
    if (!meals) return false;
    const ingredients = getIngredients();
    for (let index = 0; index < ingredients.length; index += 1) {
      if (!checkedIngredients[index]) {
        return false;
      }
    }
    return true;
  };

  const handleNavigate = () => {
    if (!meals || !meals.length) return;

    const currentMeal = meals[0];
    const doneRecipe = {
      id,
      type: 'meal',
      nationality: currentMeal.strArea,
      category: currentMeal.strCategory,
      alcoholicOrNot: '',
      name: currentMeal.strMeal,
      image: currentMeal.strMealThumb,
      doneDate: new Date().toISOString(),
      tags: currentMeal.strTags ? currentMeal.strTags.split(',') : [],
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    navigate('/done-recipes');
  };

  return (
    <div>
      { Array.isArray(meals) && meals.map((meal: any, mealIndex: any) => (
        <div key={ mealIndex }>
          <div>
            <button
              data-testid="share-btn"
              onClick={ handleShareClick }
              className={ styles.shareButton }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            <button
              className={ styles.favoriteButton }
            >
              <input
                type="image"
                src={ favorite ? like : whiteHeart }
                alt="Favorite"
                data-testid="favorite-btn"
                onClick={ saveFavorite }
              />
            </button>
          </div>
          { copied && <span>Link copied!</span> }
          <h3
            className={ styles.h3 }
            data-testid="recipe-title"
          >
            {meal.strMeal}
          </h3>
          <img
            className={ styles.image }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid="recipe-photo"
          />
          <p
            className={ styles.category }
            data-testid="recipe-category"
          >
            {meal.strCategory}
          </p>
          <h4
            className={ styles.h4 }
          >
            Ingredients
          </h4>
          <ul
            className={ styles.labelISngredient }
          >
            {getIngredients().map((ingredient, index) => (
              <div key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: checkedIngredients[index]
                    ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
                >
                  <input
                    className={ styles.checkbox }
                    type="checkbox"
                    checked={ checkedIngredients[index] }
                    onChange={ () => toggleIngredient(index) }
                  />
                  {ingredient}
                </label>
              </div>
            ))}
          </ul>
          <h4
            className={ styles.h4 }
          >
            Instructions
          </h4>
          <p
            className={ styles.instructions }
            data-testid="instructions"
          >
            {meal.strInstructions}
          </p>
          <button
            className={ styles.finishRecipesBtn }
            data-testid="finish-recipe-btn"
            disabled={ !activeFinishRecipeButton() }
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ handleNavigate }
          >
            Finish Recipe
          </button>
        </div>
      ))}
    </div>
  );
}
