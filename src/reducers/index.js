import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import menuItems from './manage/menuItems';
import auth from './auth/auth';

export default combineReducers({
  router: routerReducer,
  menuItems,
  auth
});
