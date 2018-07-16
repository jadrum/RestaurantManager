import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../actions/manage/menuItems';
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

class AddMenuItem extends Component {
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
      image: null // image for item and firebase
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
    this.props.addItem(this.props.rid, this.props.menuItem, {
      name: this.state.name.trim(),
      price: this.state.price,
      desc: this.state.desc,
      image: this.state.image,
      imageUrl: '/img' + this.props.menuItem + '/default.jpg',
      imageRef: null
    });
    this.setState({ name: '' });
    this.setState({ price: '' });
    this.setState({ desc: '' });
    this.setState({ image: null });
    this.props.closeAdd();
  };

  onNameChange = e => {
    let n = e.target.value; // the new item name
    if (this.props.items) {
      if (this.props.items[n]) {
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
    const { menuItem, showAddModal, closeAdd } = this.props; // destructure props

    // turns '/drinks' --> 'drink' for the page title
    let type = menuItem.substring(1, menuItem.length - 1);
    return (
      <Modal show={showAddModal} onHide={closeAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Create {type}</Modal.Title>
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
                <HelpBlock>{this.state.priceError}</HelpBlock>
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
                {this.state.image && (
                  <Image
                    className="image"
                    src={URL.createObjectURL(this.state.image)}
                    responsive
                  />
                )}
              </Col>
              <Col smHidden mdHidden lgHidden xs={12}>
                {this.state.image && (
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
              Add
            </Button>
            <Button bsStyle="primary" onClick={closeAdd}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  items: state.menuItems.items,
  rid: state.auth.rid
});

export default connect(
  mapStateToProps,
  { addItem }
)(AddMenuItem);
