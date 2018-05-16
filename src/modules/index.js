import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import drinks from './drinks';

export default combineReducers({
  router: routerReducer,
  drinks
});
