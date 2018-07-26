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
import {
  startEmployeeRegisterUser,
  addNewEmployee
} from '../../actions/auth/auth';
import { secondInstance } from '../../firebase/firebase';

class AddEmployee extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: '',
      firstnameError: '',
      firstNameValid: true,
      lastName: '',
      lastnameError: '',
      lastNameValid: true,
      email: '',
      emailError: '',
      emailValid: true,
      clearance: '',
      clearanceError: '',
      clearanceValid: true,
      password: '123456',
      passwordError: '',
      passwordValid: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    //if the email is valid then add it to the db
    if (this.emailValidation() !== 'error') {
      this.props
        .secondInstance({
          email: this.state.email,
          password: this.state.password
        })
        .then(
          user => {
            this.props.addNewEmployee({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              user: user.user.uid,
              clearance: this.state.clearance,
              //not sure how to exactly access this
              rid: this.props.rid
            });
          },
          error => {
            //TODO need to handle specific errors and display accordingly
            //https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createUserWithemailAndpassword
            //changevalidation methods
            console.log('error code: ', error.code);
            console.log('error message: ', error.message);
            if (error.code === 'auth/invalid-email') {
              this.setState({
                emailError: 'email must be in the form of: "* @ * . *"'
              });
            } else {
            }
          }
        );
      //else if there is a email error then display that
    } else {
      this.setState({
        emailError: 'email must be in the form of: "* @ * . *"'
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
    const isemailValid = regExpression.test(String(email).toLowerCase());

    if (isemailValid === false) {
      return 'error';
    }
  };

  passwordValidation = () => {
    const password = this.state.password;
    if (password.length === 0) {
      return null;
    }
    const regExpression = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
    );
    const ispasswordValid = regExpression.test(String(password));

    if (ispasswordValid === false) {
      return 'error';
    }
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

  clearanceValidation = () => {
    if (this.state.clearanceValid === false) {
      return 'error';
    }
  };

  render() {
    const { showAdd, closeAdd } = this.props;

    return (
      <div>
        <Modal show={showAdd} onHide={closeAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
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
                  controlId="clearance"
                  validationState={this.clearanceValidation()}
                  bsSize="large">
                  <FormControl
                    type="text"
                    value={this.state.clearance}
                    onChange={this.handleChange}
                    placeholder="clearance"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.clearanceError}</Col>
                  </HelpBlock>
                </FormGroup>

                <Button
                  block
                  bsSize="large"
                  bsStyle="primary"
                  disabled={!this.validateForm()}
                  type="submit">
                  Add Employee!
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({ rid: state.auth.rid });

export default connect(mapStateToProps, {
  secondInstance,
  startEmployeeRegisterUser,
  addNewEmployee
})(AddEmployee);
