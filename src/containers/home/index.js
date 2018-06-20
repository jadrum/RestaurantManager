import React from 'react';
//import { push } from 'react-router-redux'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { startLogin } from '../../actions/auth/auth';

const Home = ({ startLogin }) => (
  <div>
    <h1>Login</h1>
    <div>
      <Button onClick={startLogin}>Login</Button>
    </div>
    <div>
      <Button>Register restaurant</Button>
    </div>
    <div>
      <Button>Continue as guest</Button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(Home);
