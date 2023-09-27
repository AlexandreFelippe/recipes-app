import './style.css';

function ContinueRecipeBtn() {
  const handleClick = () => {
    console.log('Vou aplicar depois');
  };

  return (
    <button
      className="start-recipes-btn"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      Continue Recipe

    </button>
  );
}

export default ContinueRecipeBtn;
