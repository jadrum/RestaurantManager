import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';

class ManageActiveMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuItems: ['drinks', 'appetizers', 'desserts', 'entrees', 'sides']
    };
  }

  renderItems = (item, i) => {
    console.log(item);
  };

  render() {
    const { rid } = this.props; // destructure props
    const { menuItems } = this.state;

    let comp; // used to wait for rid to be available

    if (rid) {
      comp = (
        <div>
          <Grid>
            <Row>
              <Col xs={3}>{Object.values(menuItems).map(this.renderItems)}</Col>
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

export default connect(mapStateToProps)(ManageActiveMenu);
