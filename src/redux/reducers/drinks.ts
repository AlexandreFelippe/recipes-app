import { AnyAction } from 'redux';
import { DRINKS_DATA } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

const drinks = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case DRINKS_DATA:
      return {
        ...state,
        drinks: action.payload,
      };
    default:
      return state;
  }
};

export default drinks;
