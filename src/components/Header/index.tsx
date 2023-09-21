import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import { fetchFirstLetter, fetchIngredients, fetchName } from '../../utils/SearchApi';

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
  const navigate = useNavigate();

  const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible);

  const handleChange = ({ target: { name, value } }: any) => {
    const updatedData = {
      ...searchData,
      [name]: value,
    };
    setSearchData(updatedData);
  };

  console.log(searchData);

  const handleFetchApi = async () => {
    switch (searchData.searchType) {
      case 'ingredient':
        if (searchData.searchText.length > 1) {
          const data = await fetchIngredients(searchData.searchText);
          const result = await data.json();
          console.log(result);
        }
        break;

      case 'name':
        if (searchData.searchText.length > 1) {
          const data = await fetchName(searchData.searchText);
          const result = await data.json();
          console.log(result);
        }
        break;

      case 'letter':
        if (searchData.searchText.length > 1) {
          alert('Your search must have only 1 (one) character');
        } else {
          const data = await fetchFirstLetter(searchData.searchText);
          const result = await data.json();
          console.log(result);
        }
        break;

      default:
        console.log('não pegou');
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
