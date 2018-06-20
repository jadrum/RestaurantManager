import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import drinks from './drinks';
import appetizers from './appetizers';
import desserts from './desserts';
import auth from './auth/auth';

export default combineReducers({
  router: routerReducer,
  drinks,
  appetizers,
  desserts,
  auth
});
