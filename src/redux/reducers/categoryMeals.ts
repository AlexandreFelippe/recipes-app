import { AnyAction } from 'redux';
import { MEALS_CATEGORY_SEARCH } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

const mealsCategorySearch = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MEALS_CATEGORY_SEARCH:
      return {
        ...state,
        drinks: action.payload,
      };
    default:
      return state;
  }
};

export default mealsCategorySearch;
