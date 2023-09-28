import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinksRecipesDetails } from '../../utils/SearchApi';
import './style.css';

export default function DrinkProgress() {
  const [drinks, setDrinks] = useState<any>();
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(20)
    .fill(false));

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fechtsApi = async () => {
      try {
        const dataDrinks = await fetchDrinksRecipesDetails(id);
        if (dataDrinks) setDrinks(dataDrinks);
      } catch (error) {
        console.error('Erro ao buscar detalhes da bebida:', error);
      }
    };
    fechtsApi();
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
  };

  return (
    <div>
      {Array.isArray(drinks) && drinks.map((drink: any, drinkIndex: any) => (
        <div key={ drinkIndex }>
          <button data-testid="share-btn">Share</button>
          <button data-testid="favorite-btn">Favorite</button>
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
                  <input type="checkbox" onChange={ () => toggleIngredient(index) } />
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
