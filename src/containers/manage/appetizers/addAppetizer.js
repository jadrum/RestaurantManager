import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addAppetizer } from '../../../actions/manage/appetizers';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Image,
  InputGroup,
  Modal
} from 'react-bootstrap';

class AddAppetizer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      nameValid: true,
      nameError: '',
      price: '',
      priceValid: true,
      priceError: '',
      desc: '',
      image: null // image for appetizer and firebase
    };
  }

  submitAppetizer = e => {
    e.preventDefault();
    /* Check for errors before submitting */
    if (
      this.nameValidation() === 'error' ||
      this.priceValidation() === 'error'
    ) {
      return;
    }
    this.props.addAppetizer({
      name: this.state.name,
      price: this.state.price,
      desc: this.state.desc,
      image: this.state.image,
      imageUrl: '/img/appetizers/default.jpg',
      imageRef: null
    });
    this.setState({ name: '' });
    this.setState({ price: '' });
    this.setState({ desc: '' });
    this.setState({ image: null });
    this.props.closeAdd();
  };

  onNameChange = e => {
    let n = e.target.value; // the new appetizer name
    if (this.props.appetizers) {
      if (this.props.appetizers[n]) {
        this.setState({ nameError: 'Name already in use.' });
        this.setState({ nameValid: false });
      } else {
        this.setState({ nameError: '' }); // Everythings all good
        this.setState({ nameValid: true });
      }
    } else if (n === '') {
      this.setState({ nameError: 'Name field is required.' });
      this.setState({ nameValid: false });
    } else {
      this.setState({ nameError: '' }); // Everythings all good
      this.setState({ nameValid: true });
    }
    this.setState({ name: n }); // allow the name change
  };

  onPriceChange = e => {
    let p = e.target.value;
    if (p === '') {
      this.setState({ priceError: 'Price field is required.' });
      this.setState({ priceValid: false });
    } else {
      this.setState({ priceError: '' });
      this.setState({ priceValid: true });
    }
    this.setState({ price: p });
  };

  onDescChange = e => this.setState({ desc: e.target.value });

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

  /* Firebase file storage system functions */
  handleFileSelect = e => this.setState({ image: e.target.files[0] });

  render() {
    return (
      <div>
        <Modal show={this.props.showAddModal} onHide={this.props.closeAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Create appetizer</Modal.Title>
          </Modal.Header>
          <Form horizontal onSubmit={this.submitAppetizer}>
            <Modal.Body>
              <FormGroup
                controlId="formName"
                validationState={this.nameValidation()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl
                    componentClass="textarea"
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
                  <Col sm={10}>{this.state.priceError}</Col>
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

              <FormGroup controlId="formImg">
                <Col componentClass={ControlLabel} sm={2}>
                  Avatar
                </Col>
                <Col sm={10}>
                  {this.state.image && (
                    <Image
                      src={URL.createObjectURL(this.state.image)}
                      responsive
                    />
                  )}
                  <FormControl type="file" onChange={this.handleFileSelect} />
                </Col>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" type="submit">
                Add
              </Button>
              <Button bsStyle="primary" onClick={this.props.closeAdd}>
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
  appetizers: state.appetizers.appetizers
});

export default connect(mapStateToProps, { addAppetizer })(AddAppetizer);
