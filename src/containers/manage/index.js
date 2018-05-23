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
      showUpdateModal: false
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
  showUpdate = () => {
    console.log('woohoo updating');
    this.setState({ showUpdateModal: true });
  };

  /** Function used by AddDrink component **/
  closeUpdate = () => {
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
            />
            <ListDrinks showUpdate={this.showUpdate} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ManageDrinks;
