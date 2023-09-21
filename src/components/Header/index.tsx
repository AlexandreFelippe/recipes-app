import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

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
        <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
      )}
      {profile && (
        <button
          onClick={ () => navigate('/profile') }
        >
          <img src={ profileIcon } alt="perfil" data-testid="profile-top-btn" />
        </button>
      )}
      <button onClick={ toggleSearchVisibility }>Toggle Search</button>
      {isSearchVisible && (
        <input
          type="text"
          data-testid="search-input"
          placeholder="Digite sua busca"
        />
      )}
    </header>
  );
}
