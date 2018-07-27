import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { removeEmployee, fetchEmployees } from '../../actions/admin/employees';
import { Button, Col, Glyphicon, Grid, Row, Table } from 'react-bootstrap';

class ListEmployees extends Component {
  componentWillMount() {
    this.props.fetchEmployees(this.props.rid, '/users'); // effectively sets up state by listening to firebase
  }

  renderItems = (employee, i) => {
    const { removeEmployee, rid, showUpdate } = this.props;
    const uid = employee.uid;
    console.log(uid);
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.email}</td>
        <td>{employee.clearance}</td>
        <td>
          <div className="btn-group pull-left">
            <Button
              bsSize="xsmall"
              onClick={() => removeEmployee(rid, uid, employee)}>
              <Glyphicon glyph="trash" />
            </Button>
          </div>
        </td>
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
            <Col xs={12}>
              <Table bordered striped responsive hover condensed>
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

export default connect(mapStateToProps, { fetchEmployees, removeEmployee })(
  ListEmployees
);
