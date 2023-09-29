import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export default function Profile() {
  const navigate = useNavigate();

  const getEmail = () => {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj?.email || 'Email não encontrado';
    }
    return 'Email não encontrado';
  };

  return (
    <>
      <Header title="Profile" search={ false } profile />
      <div>Profile</div>
      <h3 data-testid="profile-email">{getEmail()}</h3>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes

        </button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </>
  );
}
