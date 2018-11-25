import React from 'react';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  const {auth, profile} = props;

  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-info fixed-top">
      <div className="container">
        {/* <a className="navbar-brand" href="#">Start Bootstrap</a> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {links}
        </div>
      </div>
    </nav>

  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar);
