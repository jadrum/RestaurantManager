import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
import AddMenuItem from './addMenuItem';
import ListMenuItems from './listMenuItems';
import UpdateMenuItem from './updateMenuItem';

class ManageMenuItems extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false,
      showUpdateModal: false,
      itemBeingUpdated: null
    };
  }

  /** Function used by AddMenuItem component **/
  showAdd = () => {
    this.setState({ showAddModal: true });
  };

  /** Function used by AddMenuItem component **/
  closeAdd = () => {
    this.setState({ showAddModal: false });
  };

  /** Function used by AddMenuItem component **/
  showUpdate = item => {
    this.setState({ itemBeingUpdated: item });
    this.setState({ showUpdateModal: true });
  };

  /** Function used by AddMenuItem component **/
  closeUpdate = () => {
    this.setState({ itemBeingUpdated: null });
    this.setState({ showUpdateModal: false });
  };

  render() {
    const { rid, menuItem } = this.props; // destructure props

    // turns '/drinks' --> 'drinks' for the page title
    let type = menuItem.substring(1, menuItem.length);
    let comp; // used to wait for rid to be available

    if (rid) {
      comp = (
        <div>
          <AddMenuItem
            rid={rid}
            menuItem={menuItem}
            showAddModal={this.state.showAddModal}
            closeAdd={this.closeAdd}
          />
          <UpdateMenuItem
            rid={rid}
            menuItem={menuItem}
            showUpdateModal={this.state.showUpdateModal}
            closeUpdate={this.closeUpdate}
            item={this.state.itemBeingUpdated}
          />
          <Grid>
            <Row className="manage-index_rows">
              <Panel bsStyle="primary">
                <div className="panel-heading">
                  <div className="btn-group pull-right">
                    <Button bsSize="xsmall" onClick={this.showAdd}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </div>
                  <Panel.Title className="text-center" componentClass="h4">
                    Manage {type}
                  </Panel.Title>
                </div>
              </Panel>
            </Row>
            <Row>
              <ListMenuItems
                rid={rid}
                menuItem={menuItem}
                showUpdate={this.showUpdate}
              />
            </Row>
          </Grid>
        </div>
      );
    } else {
      comp = null; // null when rid isn't loaded
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  rid: state.auth.rid
});

export default connect(mapStateToProps)(ManageMenuItems);
