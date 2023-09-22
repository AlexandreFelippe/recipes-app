import { AnyAction } from 'redux';
import { SUBMIT_USER, MEALS_DATA } from '../actions';

const INITIAL_STATE = {
  meals: [],
};

const meals = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SUBMIT_USER:
      return {
        ...state,
        email: action.payload,
      };

    case MEALS_DATA:
      return {
        ...state,
        meals: action.payload,
      };

    default:
      return state;
  }
};

export default meals;
