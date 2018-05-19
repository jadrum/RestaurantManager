import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeDrink } from '../../modules/drinks';
import { Button } from 'react-bootstrap';

class ListDrinks extends Component {
  renderDrinks = (drink, i) => {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{drink.name}</strong>
          {drink.desc}
          <Button onClick={() => this.props.removeDrink(drink.name)}>
            Remove
          </Button>
        </p>
      </div>
    );
  };

  render() {
    let comp;
    if (this.props.drinks) {
      comp = (
        <div>{Object.values(this.props.drinks).map(this.renderDrinks)}</div>
      );
    } else {
      comp = null;
    }
    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks.drinks
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeDrink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListDrinks);
