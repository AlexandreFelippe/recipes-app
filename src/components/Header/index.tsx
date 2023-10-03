import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/icone-perfil.svg';
import searchIcon from '../../images/icone pesquisar.png';
import SearchBar from '../SearchBar';
import { HeaderProps, FormType } from '../../types';
import { mealsSearch, drinksSearch } from '../../redux/actions';
import { fetchFirstLetter, fetchIngredients, fetchName, fetchFirstLetterDrinks,
  fetchIngredientsDrinks, fetchNameDrinks } from '../../utils/SearchApi';
import CategoryFilter from '../CategoryFilter/Index';
import styles from './Header.module.css';
import iconeprato from '../../images/icone-prato.svg';
import iconeRecipes from '../../images/ícone Recipes app.svg';

const initial = {
  searchText: '',
  searchType: '',
};

export default function Header({ title, search, profile }: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchData, setSearchData] = useState<FormType>(initial);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible);

  const handleChange = ({ target: { name, value } }: any) => {
    const updatedData = {
      ...searchData,
      [name]: value,
    };
    setSearchData(updatedData);
  };

  const handleApiResponse = (data: any, type: string) => {
    if (data === null) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
      return;
    }

    if (data.length === 1) {
      navigate(`/${type}/${data[0][type === 'meals' ? 'idMeal' : 'idDrink']}`);
      return;
    }

    if (type === 'meals') {
      dispatch(mealsSearch(data));
    } else {
      dispatch(drinksSearch(data));
    }
  };

  const fetchAndHandle = async (fetchFunction: any, type: string) => {
    const data = await fetchFunction(searchData.searchText);
    handleApiResponse(data, type);
  };

  const checkMeals = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          fetchAndHandle(fetchIngredients, 'meals');
        }
        break;
      case 'name':
        if (searchData.searchText.length > 1) {
          fetchAndHandle(fetchName, 'meals');
        }
        break;
      case 'letter':
        if (searchData.searchText.length === 1) {
          fetchAndHandle(fetchFirstLetter, 'meals');
        } else {
          alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        console.log('Ainda vou pôr');
    }
  };

  const checkDrinks = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          fetchAndHandle(fetchIngredientsDrinks, 'drinks');
        }
        break;
      case 'name':
        if (searchData.searchText.length > 1) {
          fetchAndHandle(fetchNameDrinks, 'drinks');
        }
        break;
      case 'letter':
        if (searchData.searchText.length === 1) {
          fetchAndHandle(fetchFirstLetterDrinks, 'drinks');
        } else {
          alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        console.log('Ainda vou pôr');
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
      <div className={ styles.button }>
        <img src={ iconeRecipes } alt="recipe icon" />
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
      </div>
      <div>
        <img className={ styles.icone } src={ iconeprato } alt="logo" />
        <h1 className={ styles.h1 } data-testid="page-title">{title}</h1>
      </div>
      {isSearchVisible && (
        <>
          <input
            data-testid="search-input"
            type="text"
            name="searchText"
            value={ searchData.searchText }
            onChange={ handleChange }
            placeholder="Digite sua busca"
          />
          <SearchBar
            searchData={ searchData }
            handleChange={ handleChange }
            handleFetchApi={ handleFetchApi }
          />
        </>
      )}
      <CategoryFilter />
    </header>
  );
}
