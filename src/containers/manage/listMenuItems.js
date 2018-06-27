import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, fetchItems } from '../../actions/manage/menuItems';
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  Panel,
  Row,
  Thumbnail
} from 'react-bootstrap';

class ListMenuItems extends Component {
  componentWillMount() {
    this.props.fetchItems(this.props.rid, this.props.menuItem); // effectively sets up state by listening to firebase
  }

  renderItems = (item, i) => {
    return (
      <Col xs={12} md={6} lg={4} className="comment" key={i}>
        <Thumbnail className="hi" src={item.imageUrl} alt="242x200">
          <Panel bsStyle="primary">
            <div className="panel-heading">
              <div className="btn-group pull-left">
                <Button
                  bsSize="xsmall"
                  onClick={() =>
                    this.props.removeItem(
                      this.props.rid,
                      this.props.menuItem,
                      item
                    )
                  }>
                  <Glyphicon glyph="trash" />
                </Button>
              </div>
              <div className="btn-group pull-right">
                <Button
                  bsSize="xsmall"
                  onClick={() => this.props.showUpdate(item)}>
                  <Glyphicon glyph="pencil" />
                </Button>
              </div>
              <Panel.Title toggle className="text-center" componentClass="h4">
                {item.name}
              </Panel.Title>
            </div>
            <Panel.Collapse>
              <Panel.Body>
                {item.desc} - {item.price}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Thumbnail>
      </Col>
    );
  };

  render() {
    let comp;
    if (this.props.items && this.props.rid) {
      comp = (
        <Grid>
          <Row>{Object.values(this.props.items).map(this.renderItems)}</Row>
        </Grid>
      );
    } else {
      comp = null;
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  items: state.menuItems.items
});

export default connect(
  mapStateToProps,
  { removeItem, fetchItems }
)(ListMenuItems);
