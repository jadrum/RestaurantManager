import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  removeAppetizer,
  fetchAppetizers
} from '../../../actions/manage/appetizers';
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  Panel,
  Row,
  Thumbnail
} from 'react-bootstrap';

class ListAppetizers extends Component {
  componentWillMount() {
    this.props.fetchAppetizers(); // effectively sets up state by listening to firebase
  }

  renderAppetizers = (appetizer, i) => {
    return (
      <Col xs={12} md={6} lg={4} className="comment" key={i}>
        <Thumbnail src={appetizer.imageUrl} alt="242x200">
          <Panel bsStyle="primary">
            <div className="panel-heading">
              <div className="btn-group pull-left">
                <Button
                  bsSize="xsmall"
                  onClick={() => this.props.removeAppetizer(appetizer)}>
                  <Glyphicon glyph="trash" />
                </Button>
              </div>
              <div className="btn-group pull-right">
                <Button
                  bsSize="xsmall"
                  onClick={() => this.props.showUpdate(appetizer)}>
                  <Glyphicon glyph="pencil" />
                </Button>
              </div>
              <Panel.Title toggle className="text-center" componentClass="h4">
                {appetizer.name}
              </Panel.Title>
            </div>
            <Panel.Collapse>
              <Panel.Body>
                {appetizer.desc} - {appetizer.price}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Thumbnail>
      </Col>
    );
  };

  render() {
    let comp;
    if (this.props.appetizers) {
      comp = (
        <Grid>
          <Row>
            {Object.values(this.props.appetizers).map(this.renderAppetizers)}
          </Row>
        </Grid>
      );
    } else {
      comp = null;
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  appetizers: state.appetizers.appetizers
});

export default connect(mapStateToProps, { removeAppetizer, fetchAppetizers })(
  ListAppetizers
);
