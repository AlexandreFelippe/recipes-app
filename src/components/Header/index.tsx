import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import { fetchFirstLetter, fetchIngredients, fetchName, fetchFirstLetterDrinks,
  fetchIngredientsDrinks, fetchNameDrinks } from '../../utils/SearchApi';

type HeaderProps = {
  title: string;
  search: boolean;
  profile: boolean;
};

type FormType = {
  searchText: string,
  searchType: string,
};

const initial = {
  searchText: '',
  searchType: '',
};

export default function Header({ title, search, profile }: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchData, setSearchData] = useState<FormType>(initial);
  const [searchResults, setSearchResults] = useState([]);
  const [searchDrinks, setsearchDrinks] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible);

  const handleChange = ({ target: { name, value } }: any) => {
    const updatedData = {
      ...searchData,
      [name]: value,
    };
    setSearchData(updatedData);
  };

  const checkMeals = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          const data = await fetchIngredients(searchData.searchText);
          setSearchResults(data);
        }
        break;
      case 'name':
        if (searchData.searchText.length > 1) {
          const data = await fetchName(searchData.searchText);
          setSearchResults(data);
        }
        break;
      case 'letter':
        if (searchData.searchText.length > 1) {
          alert('Your search must have only 1 (one) character');
        } else {
          const data = await fetchFirstLetter(searchData.searchText);
          setSearchResults(data);
        }
        break;
      default: console.log('Ainda vou pôr');
    }
  };

  const checkDrinks = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          const data = await fetchIngredientsDrinks(searchData.searchText);
          setsearchDrinks(data);
        }
        break;
      case 'name':
        if (searchData.searchText.length > 1) {
          const data = await fetchNameDrinks(searchData.searchText);
          setsearchDrinks(data);
        }
        break;
      case 'letter':
        if (searchData.searchText.length > 1) {
          alert('Your search must have only 1 (one) character');
        } else {
          const data = await fetchFirstLetterDrinks(searchData.searchText);
          setSearchResults(data);
        }
        break;
      default: console.log('Ainda vou pôr');
    }
  };

  const handleFetchApi = async () => {
    if (pathname === '/meals') {
      checkMeals();
    }
    if (pathname === '/drinks') {
      checkDrinks();
    }
  };

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      {search && (
        <button
          onClick={ toggleSearchVisibility }
        >
          <img
            src={ searchIcon }
            alt="pesquisar"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {profile && (
        <button
          onClick={ () => navigate('/profile') }
        >
          <img src={ profileIcon } alt="perfil" data-testid="profile-top-btn" />
        </button>
      )}
      {isSearchVisible && (
        <input
          data-testid="search-input"
          type="text"
          name="searchText"
          value={ searchData.searchText }
          onChange={ handleChange }
          placeholder="Digite sua busca"
        />
      )}
      <SearchBar
        searchData={ searchData }
        handleChange={ handleChange }
        handleFetchApi={ handleFetchApi }
      />
    </header>
  );
}
