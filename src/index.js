import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import { firebase } from './firebase/firebase';
import { login, initDataAsync, logout } from './actions/auth/auth';
import AppRouter from './containers/routes/appRouter';

import 'sanitize.css/sanitize.css';
import './index.css';
import './firebase/firebase';

const target = document.querySelector('#root');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    render(jsx, target);
    hasRendered = true;
  }
};

/** Tracks user authentication **/
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
    store.dispatch(login(user.uid));
    store.dispatch(initDataAsync(user.uid)); // this breaks routing
    /*    this fixes routing?
    store.dispatch(login(
      'asdf',
      'fdsa',
      'ADMIN',
      'Sammy\'s'
    ));
    */
    renderApp();
    if (history.location.pathname === '/') {
      // send to dashboard after login
      history.push('/dashboard');
    }
  } else {
    console.log('log out');
    store.dispatch(logout());
    renderApp();
    history.push('/'); // Sends user back to home page
  }
});
