import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavTop.css';

const NavTop = ({ handleUserCreateClick }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a>React/Hapi Dashboard</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem
          eventKey={1}
          onClick={handleUserCreateClick}
        >
          <i
            className="NavTop-control-icon fa fa-plus-square-o"
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
