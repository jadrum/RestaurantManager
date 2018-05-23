import React from 'react';
import { Component } from 'react';
import { Button, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
//import { push } from 'react-router-redux';
import AddDrink from './addDrink';
import ListDrinks from './listDrinks';

class ManageDrinks extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAdd: false
    };
  }

  /** Function used by AddDrink component **/
  handleShow = () => {
    this.setState({ showAdd: true });
  };

  /** Function used by AddDrink component **/
  handleClose = () => {
    this.setState({ showAdd: false });
  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Panel bsStyle="primary">
              <div className="panel-heading">
                <div className="btn-group pull-right">
                  <Button bsSize="xsmall" onClick={this.handleShow}>
                    <Glyphicon glyph="plus" />
                  </Button>
                </div>
                <Panel.Title className="text-center" componentClass="h4">
                  Manage Drinks
                </Panel.Title>
              </div>
            </Panel>
            <AddDrink
              showAdd={this.state.showAdd}
              handleClose={this.handleClose}
            />
            <ListDrinks />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ManageDrinks;
