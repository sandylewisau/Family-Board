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
    const { auth, family, familyMembers } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />

    // Redirect if a family hasn't been configured
    if (family && family.length === 0) return <Redirect to="/family/create-family" />
    if (familyMembers && familyMembers.length === 0) return <Redirect to="/family/create-family-member" />

    return (
      <div className="container">
        {/* <div className="row">
          <div className="col">
            Main Dashboard
          </div>
        </div> */}
        <div className="row">
          <div className="col-sm-6 portfolio-item">
            <div className="card h-100">
              <div><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></div>
              <div className="card-body">
                <h4 className="card-title">
                  <div>Project One</div>
                </h4>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 portfolio-item">
            <div className="card h-100">
              <div><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></div>
              <div className="card-body">
                <h4 className="card-title">
                  <div>Project One</div>
                </h4>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('stately',state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    familyMembers: state.firestore.ordered.familyMembers,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'familyMembers', orderBy: ['createdAt', 'asc']},
    { collection: 'family'},
  ])
)(Dashboard);
