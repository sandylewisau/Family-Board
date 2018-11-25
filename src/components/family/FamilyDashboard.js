import React, {Component} from 'react';
// import Notifications from './Notifications'
// import ProjectList from '../projects/ProjectList';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom';


class FamilyDashboard extends Component {

  render() {
    // const {projects, auth, notifications} = this.props;
    const { auth, family, familyMembers } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />

    if (family && family.length === 0) return <Redirect to="/family/create-family" />
    if (familyMembers && familyMembers.length === 0) return <Redirect to="/family/create-family-member" />
    


    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Family</h5>
                <p className="card-text">View the family settings</p>
                <Link to='/family/create-family' className="btn btn-info">View</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Family Members</h5>
                <p className="card-text">See who's part of the family</p>
                <Link to='/family/create-family' className="btn btn-info">View</Link>
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
    family: state.firestore.ordered.family
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'family'}
  ])
)(FamilyDashboard);
