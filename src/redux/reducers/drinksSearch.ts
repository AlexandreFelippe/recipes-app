import { AnyAction } from 'redux';
import { DRINKS_SEARCH } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

const drinksSearch = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case DRINKS_SEARCH:
      return {
        ...state,
        drinks: action.payload,
      };
    default:
      return state;
  }
};

export default drinksSearch;
