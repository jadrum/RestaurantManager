import React from 'react';
import { Component } from 'react';
import { Button, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
//import { push } from 'react-router-redux';
import AddDrink from './addDrink';
import ListDrinks from './listDrinks';
import UpdateDrink from './updateDrink';

class ManageDrinks extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false,
      showUpdateModal: false,
      drinkBeingUpdated: null
    };
  }

  /** Function used by AddDrink component **/
  showAdd = () => {
    this.setState({ showAddModal: true });
  };

  /** Function used by AddDrink component **/
  closeAdd = () => {
    this.setState({ showAddModal: false });
  };

  /** Function used by AddDrink component **/
  showUpdate = drink => {
    this.setState({ drinkBeingUpdated: drink });
    this.setState({ showUpdateModal: true });
  };

  /** Function used by AddDrink component **/
  closeUpdate = () => {
    this.setState({ drinkBeingUpdated: null });
    this.setState({ showUpdateModal: false });
  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Panel bsStyle="primary">
              <div className="panel-heading">
                <div className="btn-group pull-right">
                  <Button bsSize="xsmall" onClick={this.showAdd}>
                    <Glyphicon glyph="plus" />
                  </Button>
                </div>
                <Panel.Title className="text-center" componentClass="h4">
                  Manage Drinks
                </Panel.Title>
              </div>
            </Panel>
            <AddDrink
              showAddModal={this.state.showAddModal}
              closeAdd={this.closeAdd}
            />
            <UpdateDrink
              showUpdateModal={this.state.showUpdateModal}
              closeUpdate={this.closeUpdate}
              drink={this.state.drinkBeingUpdated}
            />
            <ListDrinks showUpdate={this.showUpdate} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ManageDrinks;
