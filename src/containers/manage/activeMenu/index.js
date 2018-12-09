import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
import { fetchMenu } from '../../../actions/manage/menuItems';
import AddMenuLabel from './addMenuLabel';
import ListMenuLabels from './listMenuLabels';

class ManageActiveMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false,
      menuLabels: []
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

  getMenu = rid => {
    this.props.fetchMenu(rid);
  };

  render() {
    const { rid } = this.props; // destructure props

    let comp; // used to wait for rid to be available

    if (rid) {
      //this.getMenu(rid);
      comp = (
        <Grid>
          <Row>
            <AddMenuLabel
              rid={rid}
              showAddModal={this.state.showAddModal}
              closeAdd={this.closeAdd}
            />

            <Col xs={4} id="menuLabels-panel">
              <Row className="manage-index_rows">
                <Panel bsStyle="primary">
                  <Panel.Heading>
                    <div className="btn-group pull-right">
                      <Button bsSize="xsmall" onClick={this.showAdd}>
                        <Glyphicon glyph="plus" />
                      </Button>
                    </div>
                    <Panel.Title className="text-center" componentClass="h4">
                      Manage Menu Labels
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <ListMenuLabels rid={rid} />
                  </Panel.Body>
                </Panel>
              </Row>
            </Col>

            <Col xs={8} id="menuItems-panel">
              <Row className="manage-index_rows">
                <Panel bsStyle="primary">
                  <div className="panel-heading">
                    <div className="btn-group pull-right">
                      <Button bsSize="xsmall" onClick={this.showAdd}>
                        <Glyphicon glyph="plus" />
                      </Button>
                    </div>
                    <Panel.Title className="text-center" componentClass="h4">
                      Manage Menu Items
                    </Panel.Title>
                  </div>
                </Panel>
              </Row>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      comp = null; // null when rid isn't loaded
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  rid: state.auth.rid,
  items: state.menuItems.menu
});

export default connect(
  mapStateToProps,
  { fetchMenu }
)(ManageActiveMenu);
