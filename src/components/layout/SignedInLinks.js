import React, {Component} from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';
import { withRouter } from 'react-router'

import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class SignedInLinks extends Component {
// const SignedInLinks = (props) => {

  logoutHandler = (e) => {
    this.props.signOut();
    this.props.history.replace('/signin')
  }

  render() {
    const { profile } = this.props;

    console.log('profile', profile );
    const isAdmin = profile.roles && profile.roles.admin ? (
      <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Admin
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <ReactNavLink to="/family/dashboard" className="text-info">Family</ReactNavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
    ) : (
      null
    )

    return (
      <>
        <NavItem>
          <NavLink onClick={e=>this.logoutHandler(e)}>Log out</NavLink>
        </NavItem>
        { isAdmin }
      </>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignedInLinks));
