import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ListEmployees from './listEmployees';

class ManageEmployees extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { rid } = this.props; // destructure props
    let comp;

    if (rid) {
      comp = (
        <div>
          hi
          <ListEmployees rid={rid} />
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
