import React from 'react';
//import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Login = props => (
  <div>
    <h1>Login</h1>
    <p>You need to login</p>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
