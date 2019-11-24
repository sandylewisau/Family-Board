import React, { Component } from 'react';
// import Notifications from './Notifications'
// import ProjectList from '../projects/ProjectList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import AdventFeatureCard from '../advent-calendar/AdventFeatureCard';
import WeatherWidget from '../weather/WeatherWidget';

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
          <div className="col-sm-6 portfolio-item pb-3">
            <AdventFeatureCard />
          </div>

          <div className="col-sm-6 portfolio-item pb-3">
            <div className="card h-100">
              <div className="emoji-card-top display-2 text-center card-img-top">
                <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">💰</span>
              </div>
              <div className="card-body">
                <h4 className="card-title">
                  <div>Pocket Money</div>
                </h4>
                <p className="card-text">Coming soon!</p>
                <p className="card-text">See how your pocket money is tracking. Build those bonuses!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-sm-6 portfolio-item pb-3">
            <WeatherWidget />
          </div> */}
          <div className="col-sm-6 portfolio-item pb-3">
            <div className="card h-100">
              <div className="emoji-card-top display-2 text-center card-img-top">
                <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗓️</span>
              </div>
              <div className="card-body">
                <h4 className="card-title">
                  <div>Weather</div>
                </h4>
                <p className="card-text">Coming soon!</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 portfolio-item pb-3">
            <div className="card h-100">
              <div className="emoji-card-top display-2 text-center card-img-top">
                <span className="pl-3 pr-3" role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗓️</span>
              </div>
              <div className="card-body">
                <h4 className="card-title">
                  <div>Calendar</div>
                </h4>
                <p className="card-text">Coming soon!</p>
                <p className="card-text">See upcoming events</p>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-6 portfolio-item pb-3">
            
          </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('stately', state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    familyMembers: state.firestore.ordered.familyMembers
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'familyMembers', orderBy: ['createdAt', 'asc'] },
    { collection: 'family' },
  ])
)(Dashboard);
