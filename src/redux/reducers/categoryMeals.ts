import { AnyAction } from 'redux';
import { MEALS_CATEGORY_SEARCH, REMOVE_CATEGORY } from '../actions';

const INITIAL_STATE = {
  meals: [],
};

const mealsCategorySearch = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MEALS_CATEGORY_SEARCH:
      return {
        ...state,
        meals: action.payload,
      };

    case REMOVE_CATEGORY:
      return {
        ...state,
        meals: [],
      };

    default:
      return state;
  }
};

export default mealsCategorySearch;
