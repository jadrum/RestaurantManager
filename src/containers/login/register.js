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
      registerEmail: '',
      registerEmailError: '',
      registerEmailValid: true,
      registerPassword: '',
      registerPasswordError: '',
      registerPasswordValid: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    //validate registerPassword function
    const finalregisterPasswordValidation = () => {
      const registerPassword = this.state.registerPassword;
      if (registerPassword.length === 0) {
        return null;
      }
      const regExpression = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
      );
      const isregisterPasswordValid = regExpression.test(
        String(registerPassword)
      );

      if (isregisterPasswordValid === false) {
        return 'error';
      }
    };

    //validate registerEmail function
    const finalregisterEmailValidation = () => {
      const registerEmail = this.state.registerEmail;
      if (registerEmail.length === 0) {
        return null;
      }
      const regExpression = new RegExp(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      const isregisterEmailValid = regExpression.test(
        String(registerEmail).toLowerCase()
      );

      if (isregisterEmailValid === false) {
        return 'error';
      }
    };

    //if both the registerPassword and registerEmail are valid then add it to the db
    if (
      finalregisterPasswordValidation(this.state.registerPassword) !==
        'error' ||
      finalregisterEmailValidation(this.state.registerEmail !== 'error')
    ) {
      this.props
        .startRegisterUser({
          registerEmail: this.state.registerEmail,
          registerPassword: this.state.registerPassword
        })
        .then(
          user => {
            this.props.addRestaurant({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              registerEmail: this.state.registerEmail,
              user: user.user.uid,
              restaurant: this.state.restaurantName
            });
          },
          error => {
            //TODO need to handle specific errors and display accordingly
            //https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createUserWithregisterEmailAndregisterPassword
            //changevalidation methods
            console.log('error code: ', error.code);
            console.log('error message: ', error.message);
            if (error.code === 'auth/invalid-registerEmail') {
              this.setState({
                registerEmailError:
                  'registerEmail must be in the form of: "* @ * . *"'
              });
            } else if (
              error.code === 'auth/weak-registerPassword' ||
              error.code === 'registerPassword not valid'
            ) {
              this.setState({
                registerPasswordError:
                  'registerPassword must have : Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              });
            }
          }
        );
      //else if there is a registerPassword error then display that
    } else if (
      finalregisterPasswordValidation(this.state.registerPassword === 'error')
    ) {
      this.setState({
        registerPasswordError:
          'registerPassword must have : Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      });
    }
    //else that means it is an registerEmail error and display that
    else {
      this.setState({
        registerEmailError: 'registerEmail must be in the form of: "* @ * . *"'
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm = () => {
    return (
      this.state.registerEmail.length > 0 &&
      this.state.registerPassword.length > 0
    );
  };

  nameValidation = () => {
    if (this.state.restaurantNameValid === false) {
      return 'error';
    }
  };

  registerEmailValidation = () => {
    const registerEmail = this.state.registerEmail;
    if (registerEmail.length === 0) {
      return null;
    }
    const regExpression = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isregisterEmailValid = regExpression.test(
      String(registerEmail).toLowerCase()
    );

    if (isregisterEmailValid === false) {
      return 'error';
    }

    // if (this.state.registerEmailValid === false) {
    //   return 'error';
    // }
  };

  registerPasswordValidation = () => {
    const registerPassword = this.state.registerPassword;
    if (registerPassword.length === 0) {
      return null;
    }
    const regExpression = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
    );
    const isregisterPasswordValid = regExpression.test(
      String(registerPassword)
    );

    if (isregisterPasswordValid === false) {
      return 'error';
    }

    // if (this.state.registerPasswordValid === false) {
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
                  controlId="registerEmail"
                  validationState={this.registerEmailValidation()}
                  bsSize="large">
                  <FormControl
                    type="registerEmail"
                    value={this.state.registerEmail}
                    onChange={this.handleChange}
                    placeholder="registerEmail"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.registerEmailError}</Col>
                  </HelpBlock>
                </FormGroup>

                <FormGroup
                  controlId="registerPassword"
                  validationState={this.registerPasswordValidation()}
                  bsSize="large">
                  <FormControl
                    type="registerPassword"
                    value={this.state.registerPassword}
                    onChange={this.handleChange}
                    placeholder="registerPassword"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.registerPasswordError}</Col>
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

export default connect(
  null,
  {
    startRegisterUser,
    addRestaurant
  }
)(Register);
