import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateDrink } from '../../actions/drinks';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  Modal
} from 'react-bootstrap';

class UpdateDrink extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      nameValid: true,
      nameMsg: '',
      price: '',
      priceValid: true,
      priceMsg: '',
      desc: ''
    };
  }

  submitDrink = e => {
    e.preventDefault();
    /* Check for errors before submitting */
    if (
      this.nameValidation() === 'error' ||
      this.priceValidation() === 'error'
    ) {
      return;
    }
    this.props.updateDrink({
      oldName: this.props.drink.name,
      newDrink: {
        name: this.state.name,
        price: this.state.price,
        desc: this.state.desc
      }
    });
    this.setState({ name: '' });
    this.setState({ price: '' });
    this.setState({ desc: '' });
    this.props.closeUpdate();
  };

  onNameChange = e => {
    let old = this.props.drink.name; // the old drink name
    let n = e.target.value; // the new drink name
    if (old !== n && this.props.drinks[n]) {
      this.setState({ nameMsg: 'Name already in use.' });
      this.setState({ nameValid: false });
    } else if (n === '') {
      this.setState({ nameMsg: 'Name field is required.' });
      this.setState({ nameValid: false });
    } else {
      this.setState({ nameMsg: '' }); // Everythings all good
      this.setState({ nameValid: true });
    }
    this.setState({ name: n }); // allow the name change
  };

  onPriceChange = e => {
    let p = e.target.value;
    if (p === '') {
      this.setState({ priceMsg: 'Price field is required.' });
      this.setState({ priceValid: false });
    } else {
      this.setState({ priceMsg: '' });
      this.setState({ priceValid: true });
    }
    this.setState({ price: p });
  };

  onDescChange = e => {
    this.setState({ desc: e.target.value });
  };

  handleEnter = () => {
    this.setState({ name: this.props.drink.name });
    this.setState({ price: this.props.drink.price });
    this.setState({ desc: this.props.drink.desc });
  };

  nameValidation = () => {
    if (this.state.nameValid === false) {
      return 'error'; // this shows an error in form
    }
  };

  priceValidation = () => {
    if (this.state.priceValid === false) {
      return 'error'; // this shows an error in form
    }
  };

  handleClose = () => {
    console.log('handling close');
    this.setState({ nameValid: '' }); // reset validation
    this.setState({ nameMsg: true });
    this.setState({ priceValid: '' }); // reset validation
    this.setState({ priceMsg: true });
    this.props.closeUpdate();
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showUpdateModal}
          onHide={this.handleClose}
          onEnter={this.handleEnter}>
          <Modal.Header closeButton>
            <Modal.Title>Update drink</Modal.Title>
          </Modal.Header>
          <Form horizontal onSubmit={this.submitDrink}>
            <Modal.Body>
              <FormGroup
                controlId="formName"
                validationState={this.nameValidation()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl
                    componentClass="input"
                    name="name"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={this.onNameChange}
                    required
                  />
                </Col>
                <HelpBlock>
                  <Col sm={2} />
                  <Col sm={10}>{this.state.nameMsg}</Col>
                </HelpBlock>
              </FormGroup>

              <FormGroup
                controlId="formPrice"
                validationState={this.priceValidation()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Price
                </Col>
                <Col sm={10}>
                  <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl
                      componentClass="input"
                      type="number"
                      min="0.00"
                      step=".01"
                      value={this.state.price}
                      placeholder="0.00"
                      onChange={this.onPriceChange}
                      required
                    />
                  </InputGroup>
                </Col>
                <HelpBlock>
                  <Col sm={2} />
                  <Col sm={10}>{this.state.priceMsg}</Col>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="formDesc">
                <Col componentClass={ControlLabel} sm={2}>
                  Description
                </Col>
                <Col sm={10}>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.desc}
                    placeholder="Description"
                    onChange={this.onDescChange}
                  />
                </Col>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" type="submit">
                Save
              </Button>
              <Button bsStyle="primary" onClick={this.handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks.drinks
});

export default connect(mapStateToProps, { updateDrink })(UpdateDrink);
