import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import share from '../../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState<any>([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getStorage = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      setRecipes(doneRecipes);
      setFilteredRecipes(doneRecipes);
    };
    getStorage();
  }, []);

  const handleFilter = (filter: string) => {
    switch (filter) {
      case 'All':
        setFilteredRecipes(recipes);
        break;
      case 'Meals':
        setFilteredRecipes(recipes.filter((recipe: any) => recipe.type === 'meal'));
        break;
      case 'Drinks':
        setFilteredRecipes(recipes.filter((recipe: any) => recipe.type === 'drink'));
        break;
      default:
        console.error('Ainda vou pôr');
        break;
    }
  };

  const handleShareClick = (recipeId: string, recipeType: string) => {
    const urlToCopy = `${window.location.origin}/${recipeType}s/${recipeId}`;
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => console.error('Erro ao copiar link:', error));
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
            <Link
              to={ recipe.type === 'drink'
                ? `/drinks/${recipe.id}` : `/meals/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '200px', height: 'auto' } }
              />
            </Link>
            {recipe.type === 'drink' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality
                  ? `${recipe.nationality} - ${recipe.category}` : recipe.category}
              </p>
            )}
            <Link
              to={ recipe.type === 'drink'
                ? `/drinks/${recipe.id}` : `/meals/${recipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            {recipe.tags
              && recipe.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}

            <input
              type="image"
              src={ share }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareClick(recipe.id, recipe.type) }
            />
            { copied && <span>Link copied!</span> }
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
