import React from 'react';
import { Component } from 'react';
//import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap';
import Login from './login';
import Register from './register';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showLoginModal: false,
      showRegisterModal: false
    };
  }

  /** Function used by AddDrink component **/
  showLogin = () => {
    this.setState({ showLoginModal: true });
  };

  /** Function used by AddDrink component **/
  closeLogin = () => {
    this.setState({ showLoginModal: false });
  };

  /** Function used by AddDrink component **/
  showRegister = () => {
    this.setState({ showRegisterModal: true });
  };

  /** Function used by AddDrink component **/
  closeRegister = () => {
    this.setState({ showRegisterModal: false });
  };

  render() {
    const { startLogin } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <div>
          <Button onClick={this.showLogin}>Login</Button>
        </div>
        <div>
          <Button onClick={this.showRegister}>Register restaurant</Button>
        </div>
        <div>
          <Button>Continue as guest</Button>
        </div>
        <Login
          showLoginModal={this.state.showLoginModal}
          closeLogin={this.closeLogin}
          startLogin={startLogin}
        />
        <Register
          showRegisterModal={this.state.showRegisterModal}
          closeRegister={this.closeRegister}
        />
      </div>
    );
  }
}

export default Home;
