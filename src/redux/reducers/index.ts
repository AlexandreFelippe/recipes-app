import { combineReducers } from 'redux';
import meals from './meals';
import drinks from './drinks';

const rootreducer = combineReducers({ meals, drinks });

export default rootreducer;
