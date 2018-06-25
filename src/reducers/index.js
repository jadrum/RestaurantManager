import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import drinks from './manage/drinks';
import appetizers from './manage/appetizers';
import desserts from './manage/desserts';
import auth from './auth/auth';

export default combineReducers({
  router: routerReducer,
  drinks,
  appetizers,
  desserts,
  auth
});
