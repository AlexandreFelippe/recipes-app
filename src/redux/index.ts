import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootreducer from './reducers';

const store = createStore(
  rootreducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
