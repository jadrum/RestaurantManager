import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeDrink } from '../../modules/drinks';
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  Panel,
  Row,
  Thumbnail
} from 'react-bootstrap';

class ListDrinks extends Component {
  renderDrinks = (drink, i) => {
    return (
      <Col xs={3} md={3} lg={3} className="comment" key={i}>
        <Thumbnail src="/img/drinks/miami-vice.jpg" alt="242x200">
          <Panel bsStyle="primary">
            <div className="panel-heading">
              <div className="btn-group pull-left">
                <Button
                  bsSize="xsmall"
                  onClick={() => this.props.removeDrink(drink.name)}>
                  <Glyphicon glyph="trash" />
                </Button>
              </div>
              <div className="btn-group pull-right">
                <Button bsSize="xsmall" onClick={() => this.props.showUpdate()}>
                  <Glyphicon glyph="pencil" />
                </Button>
              </div>
              <Panel.Title className="text-center" componentClass="h4">
                {drink.name}
              </Panel.Title>
            </div>
            <Panel.Body>
              {drink.desc} - {drink.price}
            </Panel.Body>
          </Panel>
        </Thumbnail>
      </Col>
    );
  };

  render() {
    let comp;
    if (this.props.drinks) {
      comp = (
        <Grid>
          <Row>{Object.values(this.props.drinks).map(this.renderDrinks)}</Row>
        </Grid>
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
