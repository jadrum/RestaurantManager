import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLabels } from '../../../actions/manage/menuItems';
import {
  Button,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';

class ListMenuLabels extends Component {
  componentWillMount() {
    this.props.fetchLabels(this.props.rid); // effectively sets up state by listening to firebase
  }

  renderLabels = (label, i) => {
    const { removeLabel, rid, menuLabel, showUpdate } = this.props;

    return <ListGroupItem key={i}>{label}</ListGroupItem>;
  };

  render() {
    const { labels, rid } = this.props;

    let comp;
    if (labels && rid) {
      comp = (
        <ListGroup>{Object.values(labels).map(this.renderLabels)}</ListGroup>
      );
    } else {
      comp = null;
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  labels: state.menuItems.labels
});

export default connect(
  mapStateToProps,
  { fetchLabels }
)(ListMenuLabels);
