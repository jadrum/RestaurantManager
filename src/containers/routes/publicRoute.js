import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

/**
 * Keeps logged in users from viewing public routes by
 * doing the opposite of what privateRoute.js did.
 */
export const PublicRoute = ({
  isAuthenticated,
  startLogout,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default withRouter(connect(mapStateToProps)(PublicRoute));
