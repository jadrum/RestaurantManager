import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Jumbotron, Row } from 'react-bootstrap';

class Dashboard extends Component {
  render() {
    console.log('auth = ', this.props.restaurantName);
    const name = 'rest name';
    return (
      <div>
        <Grid>
          <Row>
            <Jumbotron>
              <h1>{this.props.restaurantName}</h1>
              <p>
                This is a restaurant POS system app for the fictional restaurant
                JDB Burger Bar (named after the developers Justin, Dylan, and
                Brandon). This app will allow restaurant employees to manage
                their menu, wait on customers, take orders, close tabs, and
                hopefully much more. Feel free to browse around as we are still
                in production.
              </p>
            </Jumbotron>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurantName: state.auth.restaurantName
});

//const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps)(Dashboard);
