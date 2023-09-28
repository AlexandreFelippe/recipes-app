import { useEffect, useState } from 'react';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState<any>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any>([]);

  useEffect(() => {
    const getStorage = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      setRecipes(doneRecipes);
      setFilteredRecipes(doneRecipes);
    };
    getStorage();
  }, []);

  const handleFilter = (filter: string) => {
    if (filter === 'All') setFilteredRecipes(recipes);
    else {
      setFilteredRecipes(recipes
        .filter((recipe: any) => recipe.type === filter.toLowerCase()));
    }
  };

  return (
    <>
      <Header title="Done Recipes" search={ false } profile />
      <br />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('All') }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('Meals') }
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('Drinks') }
        >
          Drinks

        </button>
      </div>
      <br />
      <div>
        {filteredRecipes.map((recipe: any, index: number) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {recipe.tags && recipe.tags.length > 0
              && recipe.tags.map((tag: string, tagIndex: number) => (
                <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
            <button data-testid={ `${index}-horizontal-share-btn` }>
              <img src={ share } alt="share" />
            </button>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
