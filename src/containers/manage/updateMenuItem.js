import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../../actions/manage/menuItems';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Image,
  InputGroup,
  Modal
} from 'react-bootstrap';

class UpdateMenuItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      nameValid: true,
      nameMsg: '',
      price: '',
      priceValid: true,
      priceMsg: '',
      desc: '',
      image: null,
      imageUrl: null,
      imageRef: null,
      newImage: false
    };
  }

  submitItem = e => {
    e.preventDefault();
    /* Check for errors before submitting */
    if (
      this.nameValidation() === 'error' ||
      this.priceValidation() === 'error'
    ) {
      return;
    }
    this.props.updateItem({
      rid: this.props.rid,
      item: this.props.menuItem,
      oldName: this.props.item.name,
      newItem: {
        name: this.state.name.trim(),
        price: this.state.price,
        desc: this.state.desc,
        image: this.state.image,
        imageUrl: this.state.imageUrl,
        imageRef: this.state.imageRef
      },
      newImage: this.state.newImage
    });
    this.setState({ name: '' });
    this.setState({ price: '' });
    this.setState({ desc: '' });
    this.props.closeUpdate();
  };

  onNameChange = e => {
    let old = this.props.item.name; // the old item name
    let n = e.target.value; // the new item name
    if (old !== n && this.props.items[n]) {
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
    this.setState({ name: this.props.item.name });
    this.setState({ price: this.props.item.price });
    this.setState({ desc: this.props.item.desc });
    this.setState({ imageUrl: this.props.item.imageUrl });
    if (this.props.item.imageRef !== undefined) {
      this.setState({ imageRef: this.props.item.imageRef });
    }
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
    this.setState({ nameValid: '' }); // reset validation
    this.setState({ nameMsg: true });
    this.setState({ priceValid: '' }); // reset validation
    this.setState({ priceMsg: true });
    this.setState({ image: null }); // reset image state
    this.setState({ newImage: false });
    this.props.closeUpdate();
  };

  /* Firebase file storage system functions */
  handleFileSelect = e => {
    this.setState({ newImage: true });
    this.setState({ image: e.target.files[0] });
  };

  render() {
    // turns '/drinks' --> 'drinks' for the page title
    let type = this.props.menuItem.substring(1, this.props.menuItem.length - 1);
    return (
      <div>
        <Modal
          show={this.props.showUpdateModal}
          onHide={this.handleClose}
          onEnter={this.handleEnter}>
          <Modal.Header closeButton>
            <Modal.Title>Update {type}</Modal.Title>
          </Modal.Header>
          <Form horizontal onSubmit={this.submitItem}>
            <Modal.Body>
              <FormGroup
                controlId="formName"
                validationState={this.nameValidation()}>
                <Col xs={12}>
                  <FormControl
                    name="name"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={this.onNameChange}
                    required
                  />
                  <HelpBlock>{this.state.nameError}</HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="formPrice"
                validationState={this.priceValidation()}>
                <Col xs={12}>
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
                  <HelpBlock>{this.state.priceMsg}</HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup controlId="formDesc">
                <Col xs={12}>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.desc}
                    placeholder="Description"
                    onChange={this.onDescChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formImg">
                <Col xsHidden sm={12}>
                  {!this.state.newImage && (
                    <Image
                      className="image"
                      src={this.state.imageUrl}
                      responsive
                    />
                  )}
                  {this.state.newImage && (
                    <Image
                      className="image"
                      src={URL.createObjectURL(this.state.image)}
                      responsive
                    />
                  )}
                </Col>

                <Col smHidden mdHidden lgHidden sm={12}>
                  {!this.state.newImage && (
                    <Image
                      className="image-small"
                      src={this.state.imageUrl}
                      responsive
                    />
                  )}
                  {this.state.newImage && (
                    <Image
                      className="image-small"
                      src={URL.createObjectURL(this.state.image)}
                      responsive
                    />
                  )}
                </Col>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <input
                className="pull-left"
                type="file"
                onChange={this.handleFileSelect}
              />
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
  items: state.menuItems.items
});

export default connect(
  mapStateToProps,
  { updateItem }
)(UpdateMenuItem);
