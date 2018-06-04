import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addDrink } from '../../modules/drinks';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal
} from 'react-bootstrap';

class AddDrink extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      desc: '',
      price: ''
    };
  }

  submitDrink = e => {
    e.preventDefault();
    /**
     * checking whether the drink already exists...
     * we need to do more with this by actually
     * notifying the user
     */
    if (this.props.drinks[this.state.name]) {
      console.log('already there');
      return;
    }
    this.props.addDrink({
      name: this.state.name,
      price: this.state.price,
      desc: this.state.desc
    });
    this.setState({ name: '' });
    this.setState({ price: '' });
    this.setState({ desc: '' });
    this.props.closeAdd();
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onPriceChange = e => {
    this.setState({ price: e.target.value });
  };

  onDescChange = e => {
    this.setState({ desc: e.target.value });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showAddModal} onHide={this.props.closeAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Create drink</Modal.Title>
          </Modal.Header>
          <Form horizontal onSubmit={this.submitDrink}>
            <Modal.Body>
              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={this.onNameChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formPrice">
                <Col componentClass={ControlLabel} sm={2}>
                  Drink Price
                </Col>
                <Col sm={10}>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.price}
                    placeholder="$0.00"
                    onChange={this.onPriceChange}
                  />
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
  drinks: state.drinks.drinks
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addDrink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDrink);
