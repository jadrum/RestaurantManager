import React from 'react';
import { Component } from 'react';
//import { push } from 'react-router-redux'
import { Button, Col, Glyphicon, Row } from 'react-bootstrap';
import Login from './login';
import Register from './register';
import 'normalize.css/normalize.css';

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
      <div className="container-fluid h-100">
        <Row className="h-100">
          <Col className="pull-right" xs={12} sm={6} md={6} lg={6}>
            <Login
              showLoginModal={this.state.showLoginModal}
              closeLogin={this.closeLogin}
              startLogin={startLogin}
            />
            <Register
              showRegisterModal={this.state.showRegisterModal}
              closeRegister={this.closeRegister}
            />
            <Row className="register-form">
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Row className="home-title">
                  Start managing your restaurant with ease today!
                </Row>
                <Row className="top-padding">
                  <Button block bsStyle="primary">
                    Register your restaurant
                  </Button>
                </Row>
                <Row className="top-padding">
                  <Button block bsStyle="primary">
                    Continue as a guest
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col className="blue" xs={12} sm={6} md={6} lg={6}>
            <div className="home-info">
              <Row className="bottom-padding">
                <Col xs={2}>
                  <Glyphicon glyph="pencil" />
                </Col>
                <Col xs={10}>Manage restaurant menu</Col>
              </Row>

              <Row className="top-padding bottom-padding">
                <Col xs={2}>
                  <Glyphicon glyph="shopping-cart" />
                </Col>
                <Col xs={10}>Open and close customer tabs</Col>
              </Row>

              <Row className="top-padding">
                <Col xs={2}>
                  <Glyphicon glyph="stats" />
                </Col>
                <Col xs={10}>Track your staff performance</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
