import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import Today from './Today';
import { NavLink as ReactNavLink } from 'react-router-dom';

class Navigation extends Component {
// const Navigation = (props) => {
  

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  } 

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const {auth, profile} = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    return (

      <Navbar color="info" dark expand="md">
        <NavbarBrand>
          <ReactNavLink to="/" className="text-white">
            <Today />
          </ReactNavLink>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {links}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navigation);
