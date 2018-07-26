import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, Grid, Modal, Panel, Row } from 'react-bootstrap';
import ListEmployees from './listEmployees';
import AddEmployee from './AddEmployee';

class ManageEmployees extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false
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

  render() {
    const { rid } = this.props; // destructure props
    let comp;

    if (rid) {
      comp = (
        <div>
          <Grid>
            <AddEmployee
              showAdd={this.state.showAddModal}
              closeAdd={this.closeAdd}
            />
            <Row className="admin-index_rows">
              <Panel bsStyle="primary">
                <div className="panel-heading">
                  <div className="btn-group pull-right">
                    <Button bsSize="xsmall" onClick={this.showAdd}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </div>
                  <Panel.Title className="text-center" componentClass="h4">
                    Manage employees
                  </Panel.Title>
                </div>
              </Panel>
            </Row>
            <Row>
              <ListEmployees rid={rid} />
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

export default connect(mapStateToProps)(ManageEmployees);
