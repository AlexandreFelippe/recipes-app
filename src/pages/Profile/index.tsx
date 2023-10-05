import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import style from './Profile.module.css';
import doneIcon from '../../images/Group 10.svg';
import favoriteIcon from '../../images/Group 9.svg';
import loginIcon from '../../images/Group 8.svg';
import profileIcon from '../../images/Perfil.svg';

export default function Profile() {
  const navigate = useNavigate();

  const getEmail = () => {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.email;
    }
    return 'Email não encontrado';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div className={ style.header }>
        <Header title="" search={ false } profile />
      </div>
      <img
        src={ profileIcon }
        alt="profile"
        className={ style.profileIcon }
      />
      <h1
        className={ style.title }
      >
        PROFILE
      </h1>
      <h3
        data-testid="profile-email"
        className={ style.email }
      >
        {getEmail()}
      </h3>
      <div>
        <div
          className={ style.divDone }
        >
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
            className={ style.Donebuttons }
          >
            Done Recipes
          </button>
          <img
            src={ doneIcon }
            alt="done"
            className={ style.divImg }
          />
        </div>
        <div
          className={ style.divFavorite }
        >
          <button
            onClick={ () => navigate('/favorite-recipes') }
            data-testid="profile-favorite-btn"
            className={ style.favoriteButtons }
          >
            Favorite Recipes
            <img
              src={ favoriteIcon }
              alt="favorite"
              className={ style.favoriteImg }
            />
          </button>
        </div>
        <div
          className={ style.divLogout }
        >
          <button
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
            className={ style.logoutButtons }
          >
            Logout
            <img
              src={ loginIcon }
              alt="logout"
              className={ style.logoutImg }
            />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
