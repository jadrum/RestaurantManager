import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal
} from 'react-bootstrap';
import { addLabel } from '../../../actions/manage/menuItems';

class AddMenuItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      label: '',
      labelValid: true,
      labelError: ''
    };
  }

  submitItem = e => {
    e.preventDefault();
    /* Check for errors before submitting */
    if (this.labelValidation() === 'error') {
      return;
    }
    console.log('hi : ', this.state.label);
    this.props.addLabel(this.props.rid, this.state.label);
    this.reset();
    this.props.closeAdd();
  };

  reset = () => {
    this.setState({
      label: ''
    });
  };

  onLabelChange = e => {
    this.setState({ label: e.target.value }); // allow the label change
  };

  labelValidation = () => {
    if (this.state.labelValid === false) {
      return 'error'; // this shows an error in form
    }
  };

  render() {
    const { showAddModal, closeAdd } = this.props; // destructure props

    return (
      <Modal show={showAddModal} onHide={closeAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Create Menu Label</Modal.Title>
        </Modal.Header>
        <Form horizontal onSubmit={this.submitItem}>
          <Modal.Body>
            <FormGroup
              controlId="formLabel"
              validationState={this.labelValidation()}>
              <Col xs={12}>
                <FormControl
                  name="label"
                  value={this.state.label}
                  placeholder="Label"
                  onChange={this.onLabelChange}
                  required
                />
                <HelpBlock>{this.state.labelError}</HelpBlock>
              </Col>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
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
  rid: state.auth.rid
});

export default connect(
  mapStateToProps,
  { addLabel }
)(AddMenuItem);
