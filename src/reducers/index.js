import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import drinks from './drinks';
import appetizers from './appetizers';

export default combineReducers({
  router: routerReducer,
  drinks,
  appetizers
});
