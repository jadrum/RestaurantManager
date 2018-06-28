import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, fetchItems } from '../../actions/manage/menuItems';
import { Button, Col, Glyphicon, Panel, Row, Thumbnail } from 'react-bootstrap';

class ListMenuItems extends Component {
  componentWillMount() {
    this.props.fetchItems(this.props.rid, this.props.menuItem); // effectively sets up state by listening to firebase
  }

  renderItems = (item, i) => {
    const { removeItem, rid, menuItem, showUpdate } = this.props;

    return (
      <Col xs={12} sm={6} lg={4} key={i}>
        <Thumbnail src={item.imageUrl} alt="242x200">
          <Panel bsStyle="primary">
            <div className="panel-heading">
              <div className="btn-group pull-left">
                <Button
                  bsSize="xsmall"
                  onClick={() => removeItem(rid, menuItem, item)}>
                  <Glyphicon glyph="trash" />
                </Button>
              </div>
              <div className="btn-group pull-right">
                <Button bsSize="xsmall" onClick={() => showUpdate(item)}>
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
    const { items, rid } = this.props;

    let comp;
    if (items && rid) {
      comp = (
        <Col xs={12}>
          <Row>{Object.values(items).map(this.renderItems)}</Row>
        </Col>
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
