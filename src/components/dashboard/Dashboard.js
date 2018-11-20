import React, {Component} from 'react';
// import Notifications from './Notifications'
// import ProjectList from '../projects/ProjectList';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom'


class Dashboard extends Component {

  render() {
    // const {projects, auth, notifications} = this.props;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />

    return (
      <div class="container">
        <div class="row">
          <div class="col">
            One of three columns
          </div>
          <div class="col">
            One of three columns
          </div>
        </div>
        <div class="row">
          <div class="col">
            One of three columns
          </div>
          <div class="col">
            One of three columns
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('stately',state)
  return {
    // projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // { collection: 'projects', orderBy: ['createdAt', 'desc']},
    // { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
  ])
)(Dashboard);
