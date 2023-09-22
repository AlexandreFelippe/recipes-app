type FormType = {
  searchText: string,
  searchType: string,
};

type SearchBarProps = {
  searchData: FormType;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFetchApi: () => void,
};

function SearchBar({ searchData, handleChange, handleFetchApi }: SearchBarProps) {
  return (
    <div>
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          name="searchType"
          type="radio"
          value="ingredient"
          checked={ searchData.searchType === 'ingredient' }
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          id="name"
          name="searchType"
          type="radio"
          value="name"
          checked={ searchData.searchType === 'name' }
          onChange={ handleChange }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="letter">
        <input
          id="letter"
          name="searchType"
          type="radio"
          value="letter"
          checked={ searchData.searchType === 'letter' }
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        onClick={ handleFetchApi }
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}
export default SearchBar;
