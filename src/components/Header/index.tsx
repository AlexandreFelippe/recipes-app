import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';

type HeaderProps = {
  title: string;
  search: boolean;
  profile: boolean;
};

export default function Header({ title, search, profile }: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  function toggleSearchVisibility() {
    setIsSearchVisible(!isSearchVisible);
  }

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
          placeholder="Digite sua busca"
        />
      )}
      <SearchBar />
    </header>
  );
}
