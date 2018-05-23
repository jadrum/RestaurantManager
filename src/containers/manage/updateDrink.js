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
  Modal
} from 'react-bootstrap';

class UpdateDrink extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      desc: ''
    };
  }

  submitDrink = e => {
    e.preventDefault();
    this.props.updateDrink({
      name: this.state.name,
      desc: this.state.desc
    });
    this.setState({ name: '' });
    this.setState({ desc: '' });
    this.props.closeUpdate();
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onDescChange = e => {
    this.setState({ desc: e.target.value });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showUpdateModal}
          onHide={this.props.closeUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Update drink</Modal.Title>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateDrink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDrink);
