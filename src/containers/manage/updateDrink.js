import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDrink } from '../../modules/drinks';
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
      price: '',
      desc: '',
      nameError: 'there is a problem...'
    };
  }

  submitDrink = e => {
    e.preventDefault();
    /* Check for errors before submitting */
    if (this.nameValidation() === 'error') {
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
      this.setState({ nameError: 'Name already in use.' });
      this.setState({ nameValid: false });
    } else if (n === '') {
      this.setState({ nameError: 'Name field is required.' });
      this.setState({ nameValid: false });
    } else {
      // Everythings all good
      this.setState({ nameError: '' });
      this.setState({ nameValid: true });
    }
    this.setState({ name: n }); // allow the name change
  };

  onPriceChange = e => {
    this.setState({ price: e.target.value });
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

  render() {
    return (
      <div>
        <Modal
          show={this.props.showUpdateModal}
          onHide={this.props.closeUpdate}
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
                  <Col sm={10}>{this.state.nameError}</Col>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="formPrice">
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
                    />
                  </InputGroup>
                </Col>
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
              <Button bsStyle="primary" onClick={this.props.closeUpdate}>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateDrink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDrink);
