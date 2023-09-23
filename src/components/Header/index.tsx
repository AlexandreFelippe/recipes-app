import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import { mealsSearch, drinksSearch } from '../../redux/actions';
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
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchDrinks, setsearchDrinks] = useState<any>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // console.log(searchResults);
  console.log(searchDrinks);

  const dispatch = useDispatch();

  const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible);

  const handleChange = ({ target: { name, value } }: any) => {
    const updatedData = {
      ...searchData,
      [name]: value,
    };
    setSearchData(updatedData);
  };

  let dataa;

  const checkMeals = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          const data = await fetchIngredients(searchData.searchText);
          if (data === null) {
            window.alert("Sorry, we haven't found any recipes for these filters.");
            break;
          }
          if (data.length === 1) navigate(`/meals/${data[0].idMeal}`);
          setSearchResults(data);
          dispatch(mealsSearch(data));
        }
        break;

      case 'name':
        if (searchData.searchText.length > 1) {
          const data = await fetchName(searchData.searchText);
          if (data === null) {
            window.alert("Sorry, we haven't found any recipes for these filters.");
            break;
          }
          if (data.length === 1) navigate(`/meals/${data[0].idMeal}`);
          setSearchResults(data);
          dispatch(mealsSearch(data));
        }
        break;

      case 'letter':
        if (searchData.searchText.length > 1) {
          alert('Your search must have only 1 (one) character');
        }

        dataa = await fetchFirstLetter(searchData.searchText);
        if (dataa === null) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
          break;
        }
        if (dataa.length === 1) navigate(`/meals/${dataa[0].idMeal}`);
        setSearchResults(dataa);
        dispatch(mealsSearch(dataa));
        break;

      default: console.log('Ainda vou pôr');
    }
  };

  const checkDrinks = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          const data = await fetchIngredientsDrinks(searchData.searchText);
          if (data === null) {
            window.alert("Sorry, we haven't found any recipes for these filters.");
            break;
          }
          if (data.length === 1) navigate(`/drinks/${data[0].idDrink}`);
          setsearchDrinks(data);
          dispatch(drinksSearch(data));
        }
        break;

      case 'name':
        if (searchData.searchText.length > 1) {
          const data = await fetchNameDrinks(searchData.searchText);
          if (data === null) {
            window.alert("Sorry, we haven't found any recipes for these filters.");
            break;
          }
          if (data.length === 1) navigate(`/drinks/${data[0].idDrink}`);
          setsearchDrinks(data);
          dispatch(drinksSearch(data));
        }
        break;

      case 'letter':
        if (searchData.searchText.length > 1) {
          alert('Your search must have only 1 (one) character');
        }

        dataa = await fetchFirstLetterDrinks(searchData.searchText);
        if (dataa === null) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
          break;
        }
        if (dataa.length === 1) navigate(`/drinks/${dataa[0].idDrink}`);
        setsearchDrinks(dataa);
        dispatch(drinksSearch(dataa));
        break;

      default: console.log('Ainda vou pôr');
    }
  };

  const handleFetchApi = async () => {
    if (pathname === '/meals') {
      checkMeals();
      /* if (searchResults.length === 0 || searchResults === null) {
        alert("Sorry, we haven't found any recipes for these filters");
      } */
    }
    if (pathname === '/drinks') {
      checkDrinks();
      /* if (searchDrinks.length === 0 || searchDrinks === null) {
        alert("Sorry, we haven't found any recipes for these filters");
      } */
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
