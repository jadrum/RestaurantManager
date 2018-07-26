import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { history } from '../../store';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import Home from '../login';
import Dashboard from '../dashboard';
import About from '../about';
import ManageMenuItems from '../manage';
import ManageActiveMenu from '../manage/activeMenu';

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/about-us" component={About} />
      <PrivateRoute
        exact
        path="/manage-active-menu"
        component={ManageActiveMenu}
      />
      <PrivateRoute
        exact
        path="/manage-drinks"
        menuItem="/drinks"
        component={ManageMenuItems}
      />
      <PrivateRoute
        exact
        path="/manage-appetizers"
        menuItem="/appetizers"
        component={ManageMenuItems}
      />
      <PrivateRoute
        exact
        path="/manage-desserts"
        menuItem="/desserts"
        component={ManageMenuItems}
      />
      <PrivateRoute
        exact
        path="/manage-entrees"
        menuItem="/entrees"
        component={ManageMenuItems}
      />
      <PrivateRoute
        exact
        path="/manage-sides"
        menuItem="/sides"
        component={ManageMenuItems}
      />
    </Switch>
  </Router>
);

export default AppRouter;
