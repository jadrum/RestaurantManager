import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Login from '../login';
import ManageDrinks from '../manage';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const App = () => (
  <div>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={1} title="Manage Menu" id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} href="manage-drinks">
              Drinks
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={1.2}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="about-us">
            About
          </NavItem>
          <NavItem eventKey={2} href="login">
            Login
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <main>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/manage-drinks" component={ManageDrinks} />
    </main>
  </div>
);

export default App;
