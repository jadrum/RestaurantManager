import React from 'react';
import { Component } from 'react';
import { Panel, Grid, Row, Button, Glyphicon } from 'react-bootstrap';
//import { push } from 'react-router-redux';
import AddDrink from './addDrink';
import ListDrinks from './listDrinks';

class ManageDrinks extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Panel bsStyle="primary">
              <div className="panel-heading">
                <div className="btn-group pull-right">
                  <Button bsSize="xsmall">
                    <Glyphicon glyph="plus" />
                  </Button>
                </div>
                <Panel.Title className="text-center" componentClass="h4">
                  Manage Drinks
                </Panel.Title>
              </div>
            </Panel>
            <AddDrink />
            <ListDrinks />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ManageDrinks;
