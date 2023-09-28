import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profiles';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';
import RecipesDetails from './pages/RecipesDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id" element={ <RecipesDetails /> } />
        <Route path="/drinks/:id" element={ <RecipesDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
