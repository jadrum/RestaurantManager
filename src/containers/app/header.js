import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = props => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/dashboard">Dashboard</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={1} title="Manage Menu" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1} href="manage-drinks">
            Drinks
          </MenuItem>
          <MenuItem eventKey={1.2} href="manage-appetizers">
            Appetizers
          </MenuItem>
          <MenuItem eventKey={1.2} href="manage-desserts">
            Desserts
          </MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="about-us">
          About
        </NavItem>
        <NavItem eventKey={1} onClick={props.startLogout}>
          Logout
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
