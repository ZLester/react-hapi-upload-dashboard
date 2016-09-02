import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import './NavTop.css';

const NavTop = ({ handleUserCreateClick }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={{ pathname: '/' }}>React/Hapi Dashboard</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem
          eventKey={2}
          onClick={handleUserCreateClick}
        >
          <i
            className="NavTop-control-icon fa fa-user-plus"
            aria-hidden="true"
          />
          Add User
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavTop.propTypes = {
  handleUserCreateClick: PropTypes.func.isRequired,
};

export default NavTop;
