import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealDetails from './pages/MealDetails';
import MealProgress from './pages/MealProgress';
import Profile from './pages/Profiles';
import DrinkDetails from './pages/DrinkDetails';
import DrinkProgress from './pages/DrinkProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id-da-receita" element={ <MealDetails /> } />
        <Route path="/drinks/:id-da-receita" element={ <DrinkDetails /> } />
        <Route path="/meals/:id-da-receita/in-progress" element={ <MealProgress /> } />
        <Route path="/drinks/:id-da-receita/in-progress" element={ <DrinkProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
