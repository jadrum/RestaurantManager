import React from 'react';
import { Component } from 'react';
import { Button, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
//import { push } from 'react-router-redux';
import AddDessert from './addDessert';
import ListDesserts from './listDesserts';
import UpdateDessert from './updateDessert';

class ManageDesserts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false,
      showUpdateModal: false,
      dessertBeingUpdated: null
    };
  }

  /** Function used by AddDessert component **/
  showAdd = () => {
    this.setState({ showAddModal: true });
  };

  /** Function used by AddDessert component **/
  closeAdd = () => {
    this.setState({ showAddModal: false });
  };

  /** Function used by AddDessert component **/
  showUpdate = dessert => {
    this.setState({ dessertBeingUpdated: dessert });
    this.setState({ showUpdateModal: true });
  };

  /** Function used by AddDessert component **/
  closeUpdate = () => {
    this.setState({ dessertBeingUpdated: null });
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
                  Manage Desserts
                </Panel.Title>
              </div>
            </Panel>
            <AddDessert
              showAddModal={this.state.showAddModal}
              closeAdd={this.closeAdd}
            />
            <UpdateDessert
              showUpdateModal={this.state.showUpdateModal}
              closeUpdate={this.closeUpdate}
              dessert={this.state.dessertBeingUpdated}
            />
            <ListDesserts showUpdate={this.showUpdate} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ManageDesserts;
