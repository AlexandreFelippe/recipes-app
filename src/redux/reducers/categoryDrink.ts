import { AnyAction } from 'redux';
import { DRINKS_CATEGORY_SEARCH, REMOVE_CATEGORY } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

const drinksCategorySearch = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case DRINKS_CATEGORY_SEARCH:
      return {
        ...state,
        drinks: action.payload,
      };

    case REMOVE_CATEGORY:
      return {
        ...state,
        drinks: [],
      };

    default:
      return state;
  }
};

export default drinksCategorySearch;
