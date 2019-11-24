import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

class AdventFeatureCard extends Component {

  render() {
    // const {projects, auth, notifications} = this.props;
    const { auth, family, familyMembers } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />

    const curDate = new Date();
    const decDate = new Date(2019, 11, 1);

    if (family && family.length === 0) return <Redirect to="/family/create-family" />
    if (familyMembers && familyMembers.length === 0) return <Redirect to="/family/create-family-member" />

    const heading = curDate < decDate ? "Christmas is around the corner!" : "Count down to Christmas";

    return (
      <Link to='/advent/dashboard'>
        <div className="card h-100">
          <div className="emoji-card-top display-2 text-center card-img-top">
            <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">🎁</span>
            <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">🎄</span>
          </div>
          <div className="card-body text-body">
            <h4 className="card-title">
              <div>{heading}</div>
            </h4>
            <p className="card-text">Make those beds, brush your teeth and put your bags away. Santa is on his way!</p>
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('stately', state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'family' }
  ])
)(AdventFeatureCard);
