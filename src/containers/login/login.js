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
      email: '',
      emailError: '',
      emailValid: true,
      password: '',
      passwordError: '',
      passwordValid: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .startLogin({
        email: this.state.email,
        password: this.state.password
      })
      .then(
        user => {
          console.log('login in successful');
          console.log('user -- ', user.user.uid);
        },
        error => {
          console.log('error code: ', error.code);
          console.log('error message: ', error.message);
        }
      );
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  emailValidation = () => {
    if (this.state.emailValid === false) {
      return 'error';
    }
  };

  passwordValidation = () => {
    if (this.state.passwordValid === false) {
      return 'error';
    }
  };

  render() {
    return (
      <Row className="login-form">
        <form onSubmit={this.handleSubmit}>
          <Col className="less-padding" xs={12} md={5}>
            <FormGroup
              controlId="email"
              validationState={this.emailValidation()}
              bsSize="small">
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="email"
                required
              />

              <HelpBlock>
                <Col sm={2} />
                <Col sm={10}>{this.state.emailError}</Col>
              </HelpBlock>
            </FormGroup>
          </Col>

          <Col className="less-padding" xs={12} md={5}>
            <FormGroup
              controlId="password"
              validationState={this.passwordValidation()}
              bsSize="small">
              <FormControl
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="password"
                required
              />
              <HelpBlock>
                <Col sm={2} />
                <Col sm={10}>{this.state.passwordError}</Col>
              </HelpBlock>
            </FormGroup>
          </Col>

          <Col className="less-padding" xs={12} md={2}>
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

export default connect(
  null,
  { startLogin }
)(Login);
