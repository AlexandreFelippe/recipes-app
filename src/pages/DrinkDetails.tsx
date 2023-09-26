import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchDrinksRecipesDetails } from '../utils/SearchApi';

export default function DrinkDetails() {
  const [drinks, setDrinks] = useState<any>();
  const { id } = useParams();
  console.log(drinks);

  useEffect(() => {
    if (!id) return;
    const fechtsApi = async () => {
      try {
        const dataDrinks = await fetchDrinksRecipesDetails(id);
        if (dataDrinks) setDrinks(dataDrinks);
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

  return (
    <>
      <Header title="DrinkDetails" search={ false } profile />
      {Array.isArray(drinks) && drinks.map((drink: any, index: any) => (
        <div key={ index }>
          <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
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
    </>
  );
}
