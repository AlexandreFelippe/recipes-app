function SearchBar() {
  return (
    <div>
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}
export default SearchBar;
