import './style.css';

function StartRecipeBtn({ handleClick }: any) {
  return (
    <button
      className="start-recipes-btn"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      Start Recipe
    </button>
  );
}

export default StartRecipeBtn;
