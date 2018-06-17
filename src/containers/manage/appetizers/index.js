import React from 'react';
import { Component } from 'react';
import { Button, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
//import { push } from 'react-router-redux';
import AddAppetizer from './addAppetizer';
import ListAppetizers from './listAppetizers';
import UpdateAppetizer from './updateAppetizer';

class ManageAppetizers extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false,
      showUpdateModal: false,
      appetizerBeingUpdated: null
    };
  }

  /** Function used by AddAppetizer component **/
  showAdd = () => {
    this.setState({ showAddModal: true });
  };

  /** Function used by AddAppetizer component **/
  closeAdd = () => {
    this.setState({ showAddModal: false });
  };

  /** Function used by AddAppetizer component **/
  showUpdate = appetizer => {
    this.setState({ appetizerBeingUpdated: appetizer });
    this.setState({ showUpdateModal: true });
  };

  /** Function used by AddAppetizer component **/
  closeUpdate = () => {
    this.setState({ appetizerBeingUpdated: null });
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
                  Manage Appetizers
                </Panel.Title>
              </div>
            </Panel>
            <AddAppetizer
              showAddModal={this.state.showAddModal}
              closeAdd={this.closeAdd}
            />
            <UpdateAppetizer
              showUpdateModal={this.state.showUpdateModal}
              closeUpdate={this.closeUpdate}
              appetizer={this.state.appetizerBeingUpdated}
            />
            <ListAppetizers showUpdate={this.showUpdate} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ManageAppetizers;
