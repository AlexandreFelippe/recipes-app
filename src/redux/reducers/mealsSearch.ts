import { AnyAction } from 'redux';
import { MEALS_SEARCH } from '../actions';

const INITIAL_STATE = {
  meals: [],
};

const mealsSearch = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MEALS_SEARCH:
      return {
        ...state,
        meals: action.payload,
      };

    default:
      return state;
  }
};

export default mealsSearch;
