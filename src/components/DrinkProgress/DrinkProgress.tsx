import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDrinksRecipesDetails } from '../../utils/SearchApi';
import share from '../../images/Share.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/like.svg';
import styles from './DrinkProgress.module.css';

export default function DrinkProgress() {
  const [drinks, setDrinks] = useState<any>();
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(20)
    .fill(false));
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(drinks);

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
        const dataDrinks = await fetchDrinksRecipesDetails(id);
        if (dataDrinks) setDrinks(dataDrinks);
      } catch (error) {
        console.error('Erro ao buscar detalhes da bebida:', error);
      }
    };
    fechtsApi();
    setFavorite(isFavorited());
  }, [id, isFavorited]);

  const getIngredients = (drink: any) => {
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
    const urlToCopy = `${window.location.origin}/drinks/${id}`;
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
    } else if (drinks) {
      const drink = drinks[0];
      const newFavorite = {
        id,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newFavorite]));
      setFavorite(true);
    }
  };

  const activeFinishRecipeButton = () => {
    if (!drinks || !drinks.length) return false;
    const currentDrink = drinks[0];
    const ingredients = getIngredients(currentDrink);

    for (let index = 0; index < ingredients.length; index += 1) {
      if (!checkedIngredients[index]) {
        return false;
      }
    }
    return true;
  };

  const handleNavigate = () => {
    if (!drinks || !drinks.length) return;

    const currentDrink = drinks[0];
    const doneRecipe = {
      id,
      type: 'drink',
      nationality: '',
      category: currentDrink.strCategory,
      alcoholicOrNot: currentDrink.strAlcoholic,
      name: currentDrink.strDrink,
      image: currentDrink.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: currentDrink.strTags ? currentDrink.strTags.split(',') : [],
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    navigate('/done-recipes');
  };

  return (
    <div>
      {Array.isArray(drinks) && drinks.map((drink: any, drinkIndex: any) => (
        <div key={ drinkIndex }>
          <div className={ styles.allButtons }>
            <button
              data-testid="share-btn"
              onClick={ handleShareClick }
              className={ styles.shareButton }
            >
              <img src={ share } alt="share" />
            </button>
            <input
              type="image"
              src={ favorite ? blackHeart : whiteHeart }
              alt="Favorite"
              data-testid="favorite-btn"
              onClick={ saveFavorite }
            />
          </div>
          { copied && <span>Link copied!</span> }
          <h3 className={ styles.h3 } data-testid="recipe-title">{ drink.strDrink }</h3>
          <img
            className={ styles.image }
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
          <h4 className={ styles.h4 }>Ingredients</h4>
          <ul className={ styles.labelISngredient }>
            {getIngredients(drink).map((ingredient, index) => (
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
          <h4 className={ styles.h4 }>Instructions</h4>
          <p
            className={ styles.instructions }
            data-testid="instructions"
          >
            { drink.strInstructions }
          </p>

          <button
            className={ styles.finishRecipeBtn }
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
