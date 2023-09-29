import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import share from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
// import whiteHeart from '../../images/whiteHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favorite, setFavorite] = useState<any>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getStorage = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      setFavorite(doneRecipes);
    };
    getStorage();
  }, []);

  const handleShareClick = (recipeId: string, recipeType: string) => {
    const urlToCopy = `${window.location.origin}/${recipeType}s/${recipeId}`;
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => console.error('Erro ao copiar link:', error));
  };

  const handleDesfavorite = (indexToRemove: number) => {
    const updatedFavorites = [...favorite];

    updatedFavorites.splice(indexToRemove, 1);

    setFavorite(updatedFavorites);

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const handleFilter = (filter: string) => {
    let filteredData = [];
    if (filter === 'All') {
      filteredData = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    } else if (filter === 'Meals') {
      filteredData = favorite.filter((recipe: any) => recipe.type === 'meal');
    } else if (filter === 'Drinks') {
      filteredData = favorite.filter((recipe: any) => recipe.type === 'drink');
    }
    setFavorite(filteredData);
  };

  return (
    <>
      <Header title="Favorite Recipes" search={ false } profile />
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
      <div>
        {Array.isArray(favorite) && favorite.map((recipe, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              style={ { width: '200px', height: 'auto' } }
            />
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
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
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
            <input
              type="image"
              src={ blackHeart }
              alt="Favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleDesfavorite(index) }
            />
            { copied && <span>Link copied!</span> }
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
