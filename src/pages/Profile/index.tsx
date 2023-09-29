import Header from '../../components/Header';

export default function Profile() {
  return (
    <>
      <Header title="Profile" search={ false } profile />
      <div>Profile</div>
      <h2 data-testid="profile-email">dadas</h2>
      <div>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </>
  );
}
