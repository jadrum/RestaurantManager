import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addDrink } from '../../modules/drinks';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
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
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onDescChange = e => {
    this.setState({ desc: e.target.value });
  };

  render() {
    return (
      <Form horizontal onSubmit={this.submitDrink}>
        <FormGroup controlId="formName">
          <Col componentClass={ControlLabel} sm={2}>
            Drink Name
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
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Add</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addDrink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDrink);
