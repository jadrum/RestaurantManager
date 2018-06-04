import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const Home = props => (
  <div>
    <h1>Home</h1>
    <input type="text" />
    <form>
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Textarea</ControlLabel>
        <FormControl componentClass="textarea" placeholder="textarea" />
      </FormGroup>
      <Button bsStyle="primary" type="submit">
        Submit
      </Button>
    </form>
    <p>
      <button onClick={() => props.changePage()}>
        Go to about page via redux
      </button>
    </p>
  </div>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage: () => push('/about-us') }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
