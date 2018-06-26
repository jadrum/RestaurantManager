import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { history } from '../../store';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import Home from '../login';
import Dashboard from '../dashboard';
import About from '../about';
import ManageDrinks from '../manage/drinks';
import ManageAppetizers from '../manage/appetizers';
import ManageDesserts from '../manage/desserts';

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/about-us" component={About} />
      <PrivateRoute exact path="/manage-drinks" component={ManageDrinks} />
      <PrivateRoute
        exact
        path="/manage-appetizers"
        component={ManageAppetizers}
      />
      <PrivateRoute exact path="/manage-desserts" component={ManageDesserts} />
    </Switch>
  </Router>
);

export default AppRouter;
