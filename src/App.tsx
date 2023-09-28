import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/index';
import './App.css';
import DoneRecipes from './pages/DoneRecipes/index';
import Meals from './pages/Meals/index';
import Drinks from './pages/Drinks/index';
import Profile from './pages/Profile/index';
import FavoriteRecipes from './pages/FavoriteRecipes/index';
import Footer from './components/Footer/index';
import RecipesDetails from './pages/RecipesDetails/index';
import RecipeInProgress from './pages/RecipeInProgress/index';

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
