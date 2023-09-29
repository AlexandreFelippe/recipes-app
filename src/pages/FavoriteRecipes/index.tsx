import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import share from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

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

  return (
    <>
      <Header title="Favorite Recipes" search={ false } profile />
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {Array.isArray(favorite) && favorite.map((recipe, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
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
            />
            { copied && <span>Link copied!</span> }
          </div>
        ))}
      </div>
    </>
  );
}
