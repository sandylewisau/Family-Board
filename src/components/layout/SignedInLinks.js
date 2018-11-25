import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';
import { withRouter } from 'react-router'

class SignedInLinks extends Component {
// const SignedInLinks = (props) => {

  logoutHandler = (e) => {
    this.props.signOut();
    this.props.history.replace('/signin')
  }

  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"><NavLink to='/' className="nav-link"><span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">🏠</span></NavLink></li>
        <li className="nav-item"><NavLink to='/family/dashboard' className="nav-link">Family</NavLink></li>
        <li className="nav-item"><span className="nav-link" onClick={e=>this.logoutHandler(e)}>Log Out</span></li>
      </ul>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignedInLinks));
