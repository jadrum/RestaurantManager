import React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Jumbotron, Row } from 'react-bootstrap';

class Home extends Component {
  openGitHub = () => {
    const url = 'https://github.com/jadrum/RestaurantManager';
    window.open(url, '_blank');
  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Jumbotron>
              <h1>JDB Burger Bar</h1>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage: () => push('/about-us') }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
