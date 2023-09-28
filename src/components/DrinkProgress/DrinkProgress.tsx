import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinksRecipesDetails } from '../../utils/SearchApi';
import share from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

export default function DrinkProgress() {
  const [drinks, setDrinks] = useState<any>();
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(20)
    .fill(false));
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { id } = useParams();

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
  }, [id]);

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

  const isFavorited = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((recipe: any) => recipe.id === id);
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

  return (
    <div>
      {Array.isArray(drinks) && drinks.map((drink: any, drinkIndex: any) => (
        <div key={ drinkIndex }>
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
          <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <ul className="label-ingredient">
            {getIngredients(drink).map((ingredient, index) => (
              <div key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: checkedIngredients[index]
                    ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
                >
                  <input
                    type="checkbox"
                    checked={ checkedIngredients[index] }
                    onChange={ () => toggleIngredient(index) }
                  />
                  {ingredient}
                </label>
              </div>
            ))}
          </ul>
          <button data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      ))}
    </div>
  );
}
