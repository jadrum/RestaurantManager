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
      desc: ''
    };
  }

  submitDrink = e => {
    e.preventDefault();
    this.props.addDrink({
      name: this.state.name,
      desc: this.state.desc
    });
    this.setState({ name: '' });
    this.setState({ desc: '' });
    this.props.handleClose();
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
    this.setState({ showAdd: true });
  };

  onDescChange = e => {
    this.setState({ desc: e.target.value });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showAdd} onHide={this.props.handleClose}>
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
              <Button bsStyle="primary" onClick={this.props.handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addDrink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDrink);
