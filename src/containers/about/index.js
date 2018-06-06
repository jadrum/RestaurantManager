import React from 'react';
import { Button, Grid, Jumbotron, Row } from 'react-bootstrap';

const About = () => (
  <div>
    <Grid>
      <Row>
        <Jumbotron>
          <h1>JDB Burger Bar</h1>
          <p>
            This is a restaurant pos system app currently being developed by
            Justin Drum, Dylan Drum, and Brandon Summers. Come take a look at
            our work on
            <Button bsStyle="link" bsSize="lg" onClick={this.openGitHub}>
              GitHub
            </Button>
          </p>
        </Jumbotron>
      </Row>
    </Grid>
  </div>
);

export default About;
