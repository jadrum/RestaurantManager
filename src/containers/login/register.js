import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal
} from 'react-bootstrap';
import { startRegisterUser, addRestaurant } from '../../actions/auth/auth';

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: '',
      firstnameError: '',
      firstNameValid: true,
      lastName: '',
      lastnameError: '',
      lastNameValid: true,
      restaurantName: '',
      restaurantNameError: '',
      restaurantNameValid: true,
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

    //validate password function
    const finalPasswordValidation = () => {
      const password = this.state.password;
      if (password.length === 0) {
        return null;
      }
      const regExpression = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
      );
      const isPasswordValid = regExpression.test(String(password));

      if (isPasswordValid === false) {
        return 'error';
      }
    };

    //validate email function
    const finalEmailValidation = () => {
      const email = this.state.email;
      if (email.length === 0) {
        return null;
      }
      const regExpression = new RegExp(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      const isEmailValid = regExpression.test(String(email).toLowerCase());

      if (isEmailValid === false) {
        return 'error';
      }
    };

    //if both the password and email are valid then add it to the db
    if (
      finalPasswordValidation(this.state.password) !== 'error' ||
      finalEmailValidation(this.state.email !== 'error')
    ) {
      this.props
        .startRegisterUser({
          email: this.state.email,
          password: this.state.password
        })
        .then(
          user => {
            this.props.addRestaurant({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              user: user.user.uid,
              restaurant: this.state.restaurantName
            });
          },
          error => {
            //TODO need to handle specific errors and display accordingly
            //https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createUserWithEmailAndPassword
            //changevalidation methods
            console.log('error code: ', error.code);
            console.log('error message: ', error.message);
            if (error.code === 'auth/invalid-email') {
              this.setState({
                emailError: 'Email must be in the form of: "* @ * . *"'
              });
            } else if (
              error.code === 'auth/weak-password' ||
              error.code === 'Password not valid'
            ) {
              this.setState({
                passwordError:
                  'Password must have : Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              });
            }
          }
        );
      //else if there is a password error then display that
    } else if (finalPasswordValidation(this.state.password === 'error')) {
      this.setState({
        passwordError:
          'Password must have : Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      });
    }
    //else that means it is an email error and display that
    else {
      this.setState({
        emailError: 'Email must be in the form of: "* @ * . *"'
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  nameValidation = () => {
    if (this.state.restaurantNameValid === false) {
      return 'error';
    }
  };

  emailValidation = () => {
    const email = this.state.email;
    if (email.length === 0) {
      return null;
    }
    const regExpression = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isEmailValid = regExpression.test(String(email).toLowerCase());

    if (isEmailValid === false) {
      return 'error';
    }

    // if (this.state.emailValid === false) {
    //   return 'error';
    // }
  };

  passwordValidation = () => {
    const password = this.state.password;
    if (password.length === 0) {
      return null;
    }
    const regExpression = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
    );
    const isPasswordValid = regExpression.test(String(password));

    if (isPasswordValid === false) {
      return 'error';
    }

    // if (this.state.passwordValid === false) {
    //   return 'error';
    // }
  };

  firstNameValidation = () => {
    if (this.state.firstNameValid === false) {
      return 'error';
    }
  };

  lastNameValidation = () => {
    if (this.state.lastNameValid === false) {
      return 'error';
    }
  };

  render() {
    const { showRegisterModal, closeRegister } = this.props;

    return (
      <div>
        <Modal show={showRegisterModal} onHide={closeRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Register your restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Login">
              <form onSubmit={this.handleSubmit}>
                <FormGroup
                  controlId="firstName"
                  validationState={this.firstNameValidation()}
                  bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    placeholder="first name"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.firstNameError}</Col>
                  </HelpBlock>
                </FormGroup>

                <FormGroup
                  controlId="lastName"
                  validationState={this.lastNameValidation()}
                  bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    placeholder="last name"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.lastNameError}</Col>
                  </HelpBlock>
                </FormGroup>

                <FormGroup
                  controlId="restaurantName"
                  validationState={this.nameValidation()}
                  bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.restaurantName}
                    onChange={this.handleChange}
                    placeholder="restaurant name"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.restaurantNameError}</Col>
                  </HelpBlock>
                </FormGroup>

                <FormGroup
                  controlId="email"
                  validationState={this.emailValidation()}
                  bsSize="large">
                  <FormControl
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

                <FormGroup
                  controlId="password"
                  validationState={this.passwordValidation()}
                  bsSize="large">
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

                <Button
                  block
                  bsSize="large"
                  bsStyle="primary"
                  disabled={!this.validateForm()}
                  type="submit">
                  Get Started!
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect(null, {
  startRegisterUser,
  addRestaurant
})(Register);
