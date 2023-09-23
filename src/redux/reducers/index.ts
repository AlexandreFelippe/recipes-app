import { combineReducers } from 'redux';
import meals from './mealsDefault';
import drinks from './drinksDefault';
import mealsSearch from './mealsSearch';
import drinksSearch from './drinksSearch';

const rootreducer = combineReducers({ meals, drinks, mealsSearch, drinksSearch });

export default rootreducer;
