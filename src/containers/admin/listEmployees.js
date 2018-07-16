import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../actions/admin/employees';
import { Col, Row } from 'react-bootstrap';

class ListEmployees extends Component {
  componentWillMount() {
    this.props.fetchEmployees(this.props.rid, '/users'); // effectively sets up state by listening to firebase
  }

  renderItems = (employee, i) => {
    return (
      <Col xs={12} sm={6} lg={4} key={i}>
        {employee}
      </Col>
    );
  };

  render() {
    const { employees, rid } = this.props;

    let comp;
    if (employees && rid) {
      comp = (
        <Col xs={12}>
          <Row>{Object.values(employees).map(this.renderItems)}</Row>
        </Col>
      );
    } else {
      comp = null;
    }

    return <div>{comp}</div>;
  }
}

const mapStateToProps = state => ({
  employees: state.admin.employees
});

export default connect(
  mapStateToProps,
  { fetchEmployees }
)(ListEmployees);
