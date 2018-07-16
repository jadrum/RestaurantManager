import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import menuItems from './manage/menuItems';
import auth from './auth/auth';
import admin from './admin/employees';

export default combineReducers({
  router: routerReducer,
  menuItems,
  auth,
  admin
});
