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
      name: '',
      nameError: '',
      nameValid: true,
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
      .startRegisterUser({
        email: this.state.email,
        password: this.state.password
      })
      .then(
        user => {
          this.props.addRestaurant({
            user: user.user.uid,
            restaurant: this.state.name
          });
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

  nameValidation = () => {
    if (this.state.nameValid === false) {
      return 'error';
    }
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
    const { showRegisterModal } = this.props;

    return (
      <div>
        <Modal show={showRegisterModal} onHide={this.props.closeRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Register your restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Login">
              <form onSubmit={this.handleSubmit}>
                <FormGroup
                  controlId="name"
                  validationState={this.nameValidation()}
                  bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="restaurant name"
                    required
                  />
                  <HelpBlock>
                    <Col sm={2} />
                    <Col sm={10}>{this.state.nameError}</Col>
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
