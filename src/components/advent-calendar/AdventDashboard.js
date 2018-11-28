import React, {Component} from 'react';
// import Notifications from './Notifications'
// import ProjectList from '../projects/ProjectList';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom';
import AdventCalendar from './AdventCalendar';


class AdventDashboard extends Component {
  
  render() {
    const { advent } = this.props;
    // const {projects, auth, notifications} = this.props;
    const { auth, family, familyMembers } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />

    if (family && family.length === 0) return <Redirect to="/family/create-family" />
    if (familyMembers && familyMembers.length === 0) return <Redirect to="/family/create-family-member" />
    


    return (
      <div className="container">
        <Link to='./create-date'>Create</Link>
        <AdventCalendar events={advent} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('stately',state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    advent: state.firestore.ordered.advent
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'family'},
    { collection: 'advent', orderBy: ['openDate', 'asc']}
  ])
)(AdventDashboard);
