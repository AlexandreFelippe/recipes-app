import './style.css';

function ContinueRecipeBtn({ handleClick }: any) {
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
