import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  HelpBlock,
  Row
} from 'react-bootstrap';
import { startLogin } from '../../actions/auth/auth';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loginEmail: '',
      loginEmailError: '',
      loginEmailValid: true,
      loginPassword: '',
      loginPasswordError: '',
      loginPasswordValid: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .startLogin({
        email: this.state.loginEmail,
        password: this.state.loginPassword
      })
      .then(
        user => {
          console.log('login in successful');
          console.log('user -- ', user.user.uid);
        },
        error => {
          if (error.code === 'auth/invalid-email') {
            this.setState({
              loginEmailError: 'The email address entered is invalid.'
            });
            this.setState({ loginEmailValid: false });
          } else if (error.code === 'auth/user-disabled') {
            this.setState({
              loginEmailError:
                'The account associated with this email address is currently disabled.'
            });
            this.setState({ loginEmailValid: false });
          } else if (error.code === 'auth/user-not-found') {
            this.setState({
              loginEmailError:
                'There is no account found for the entered email address.'
            });
            this.setState({ loginEmailValid: false });
          } else if (error.code === 'auth/wrong-password') {
            this.setState({
              loginEmailError: 'The password entered is invalid, try again.'
            });
            this.setState({ loginEmailValid: false });
          }
        }
      );
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm = () => {
    return (
      this.state.loginEmail.length > 0 && this.state.loginPassword.length > 0
    );
  };

  loginEmailValidation = () => {
    if (this.state.loginEmailValid === false) {
      return 'error';
    }
  };

  loginPasswordValidation = () => {
    if (this.state.loginPasswordValid === false) {
      return 'error';
    }
  };

  render() {
    return (
      <Row className="login-form">
        <form onSubmit={this.handleSubmit}>
          <Col className="less-padding" xs={12} sm={5}>
            <FormGroup
              controlId="loginEmail"
              validationState={this.loginEmailValidation()}
              bsSize="small">
              <FormControl
                autoFocus
                type="email"
                value={this.state.loginEmail}
                onChange={this.handleChange}
                placeholder="email"
                required
              />

              <HelpBlock>
                <Col sm={2} />
                <Col sm={10}>{this.state.loginEmailError}</Col>
              </HelpBlock>
            </FormGroup>
          </Col>

          <Col className="less-padding" xs={12} sm={5}>
            <FormGroup
              controlId="loginPassword"
              validationState={this.loginPasswordValidation()}
              bsSize="small">
              <FormControl
                type="password"
                value={this.state.loginPassword}
                onChange={this.handleChange}
                placeholder="password"
                required
              />
              <HelpBlock>
                <Col sm={2} />
                <Col sm={10}>{this.state.loginPasswordError}</Col>
              </HelpBlock>
            </FormGroup>
          </Col>

          <Col className="less-padding" xs={12} sm={2}>
            <Button
              block
              bsStyle="primary"
              bsSize="small"
              disabled={!this.validateForm()}
              type="submit">
              Log In
            </Button>
          </Col>
        </form>
      </Row>
    );
  }
}

export default connect(null, { startLogin })(Login);
