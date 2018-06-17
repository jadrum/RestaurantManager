import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { removeDessert, fetchDesserts } from '../../../actions/manage/desserts';
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  Panel,
  Row,
  Thumbnail
} from 'react-bootstrap';

class ListDesserts extends Component {
  componentWillMount() {
    this.props.fetchDesserts(); // effectively sets up state by listening to firebase
  }

  renderDesserts = (dessert, i) => {
    return (
      <Col xs={12} md={6} lg={4} className="comment" key={i}>
        <Thumbnail src={dessert.imageUrl} alt="242x200">
          <Panel bsStyle="primary">
            <div className="panel-heading">
              <div className="btn-group pull-left">
                <Button
                  bsSize="xsmall"
                  onClick={() => this.props.removeDessert(dessert)}>
                  <Glyphicon glyph="trash" />
                </Button>
              </div>
              <div className="btn-group pull-right">
                <Button
                  bsSize="xsmall"
                  onClick={() => this.props.showUpdate(dessert)}>
                  <Glyphicon glyph="pencil" />
                </Button>
              </div>
              <Panel.Title toggle className="text-center" componentClass="h4">
                {dessert.name}
              </Panel.Title>
            </div>
            <Panel.Collapse>
              <Panel.Body>
                {dessert.desc} - {dessert.price}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Thumbnail>
      </Col>
    );
  };

  render() {
    let comp;
    if (this.props.desserts) {
      comp = (
        <Grid>
          <Row>
            {Object.values(this.props.desserts).map(this.renderDesserts)}
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
  desserts: state.desserts.desserts
});

export default connect(mapStateToProps, { removeDessert, fetchDesserts })(
  ListDesserts
);
