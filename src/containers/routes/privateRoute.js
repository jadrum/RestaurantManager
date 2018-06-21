import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Header from '../app/header';
import { startLogout } from '../../actions/auth/auth';

/**
 * Finds out if someone is authenticated first.
 * Then it destructures props for the class, grabbing
 * isAuth, and Component from them. The rest of the
 * props is stored in 'rest'. It then returns a Route
 * component. The Route uses a ternary operation to
 * set the component as props if it is authenticated,
 * otherwise it redirects to the home screen.
 */
export const PrivateRoute = ({
  isAuthenticated,
  startLogout,
  component: Component,
  ...rest
}) => {
  console.log('is auth = ', isAuthenticated);
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <div>
            <Header startLogout={startLogout} />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ startLogout }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
);
