import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../actions/admin/employees';
import { Col, Grid, Row, Table } from 'react-bootstrap';

class ListEmployees extends Component {
  componentWillMount() {
    this.props.fetchEmployees(this.props.rid, '/users'); // effectively sets up state by listening to firebase
  }

  renderItems = (employee, i) => {
    console.log(employee);
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.email}</td>
        <td>{employee.clearance}</td>
      </tr>
    );
  };

  render() {
    const { employees, rid } = this.props;

    let comp;
    if (employees && rid) {
      comp = (
        <Grid fluid>
          <Row>
            <Col xs={1} />
            <Col xs={10}>
              <Table striped responsive hover condensed>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>{Object.values(employees).map(this.renderItems)}</tbody>
              </Table>
            </Col>
            <Col xs={1} />
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
  employees: state.admin.employees
});

export default connect(
  mapStateToProps,
  { fetchEmployees }
)(ListEmployees);
