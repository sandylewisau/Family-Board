import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import Today from './Today';

class Navigation extends Component { 

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
        <NavbarBrand tag={Link} to="/"><Today /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { links }
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
