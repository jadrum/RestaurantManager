import React from 'react';
import { Component } from 'react';
//import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addDrink,
  removeDrink,
  increment,
  incrementAsync
} from '../../modules/drinks';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

class ManageDrinks extends Component {
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

  renderDrinks = (drink, i) => {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{drink.name}</strong>
          {drink.desc}
          <button onClick={() => this.props.removeDrink(drink.name)}>
            Remove
          </button>
        </p>
      </div>
    );
  };

  render() {
    let comp;
    if (this.props.drinks) {
      comp = (
        <div>
          <h1>Drinks</h1>

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
          {Object.values(this.props.drinks).map(this.renderDrinks)}
        </div>
      );
    } else {
      comp = null;
    }
    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks.drinks,
  count: state.drinks.count,
  isIncrementing: state.drinks.isIncrementing,
  isDecrementing: state.drinks.isDecrementing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDrink,
      removeDrink,
      increment,
      incrementAsync
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ManageDrinks);
