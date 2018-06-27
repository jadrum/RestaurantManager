import React from 'react';
import { Component } from 'react';
//import { push } from 'react-router-redux'
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap';
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
      <Grid fluid>
        <Row>
          <Col className="pull-right login-index__right" xs={12} sm={6}>
            <Login
              showLoginModal={this.state.showLoginModal}
              closeLogin={this.closeLogin}
              startLogin={startLogin}
            />
            <Register
              showRegisterModal={this.state.showRegisterModal}
              closeRegister={this.closeRegister}
            />
            <Row className="login-index__right__options">
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Row>Start managing your restaurant with ease today!</Row>
                <Row>
                  <Button block bsStyle="primary">
                    Register your restaurant
                  </Button>
                </Row>
                <Row>
                  <Button block bsStyle="primary">
                    Continue as a guest
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col className="login-index__left" xs={12} sm={6}>
            <Row className="login-index__left__info">
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Row>
                  <Col xs={2}>
                    <Glyphicon glyph="pencil" />
                  </Col>
                  <Col xs={10}>Manage restaurant menu</Col>
                </Row>

                <Row>
                  <Col xs={2}>
                    <Glyphicon glyph="shopping-cart" />
                  </Col>
                  <Col xs={10}>Open and close customer tabs</Col>
                </Row>

                <Row>
                  <Col xs={2}>
                    <Glyphicon glyph="stats" />
                  </Col>
                  <Col xs={10}>Track your staff performance</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
