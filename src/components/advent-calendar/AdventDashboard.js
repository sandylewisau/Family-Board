import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import AdventCalendar from './AdventCalendar';

class AdventDashboard extends Component {

  render() {
    const { advent } = this.props;
    // const {projects, auth, notifications} = this.props;
    const { profile, auth, family, familyMembers } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />

    const isAdmin = profile.roles && profile.roles.admin ? true : false;

    if (family && family.length === 0) return <Redirect to="/family/create-family" />
    if (familyMembers && familyMembers.length === 0) return <Redirect to="/family/create-family-member" />

    const adventy = advent && advent.length ? (
      <AdventCalendar events={advent} isAdmin={isAdmin} />
    ) : (
        <div className="container">
          <h4>Check back soon!</h4>
          <button onClick={this.props.history.goBack} className="btn btn-info">Back</button>
        </div>
      )

    return (
      <div className="container">
        {/* <Link to='./create-date'>Create</Link> */}
        {
          adventy
        }


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('dashState', state)
  const recy = state.firestore.ordered.advent && state.firestore.ordered.advent.filter(x => {
    console.log('filt adv dash')
    if (x.openDate.seconds * 1000 > moment('11/11/2019').format('x') && x.openDate.seconds * 1000 < moment().format('x')) {
      return x;
    }
    // if (x.openDate.seconds * 1000 > moment('11/11/2019').format('x')) {
    //   return x;
    // }
    return null;
  })
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    advent: recy
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'family' },
    {
      collection: 'advent',
      orderBy: ['openDate', 'desc'],
    }
  ])
)(AdventDashboard);
