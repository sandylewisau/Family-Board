import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import momentLocalizer from 'react-widgets-moment';
import Calendar from 'react-widgets/lib/Calendar';
import { compose } from 'redux';

import { createDate } from '../../store/actions/adventActions';


moment.locale('en')
momentLocalizer()

 
class CreateDate extends Component {
  state = {
    openDate: new Date(2018,11,1),
    opened: false
  };
 


  handleDateChange = (val) => {
    this.setState({
      openDate: val
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createDate(this.state);
    this.setState({...this.state})
    this.props.history.push('./dashboard')
  }
 
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white pb-4">
          <h5>Add Calendar Date</h5>

          <div className="form-group">
            <label htmlFor="firstName">Date</label>
            <Calendar 
              id="openDate"
              currentDate={new Date(2018,11,1)}
              value={this.state.value}
              onChange={this.handleDateChange}
              min={new Date(2018,11,1)}
              max={new Date(2018,11,24)}
              footer={false}
            />
          </div>
          <button className="btn btn-primary">Create</button>
        </form>

        


      </div>

      
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    familyMembers: state.firestore.ordered.familyMembers,
    advent: state.firestore.ordered.advent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDate: (obj) => dispatch(createDate(obj))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'familyMembers', orderBy: ['createdAt', 'asc']},
    { collection: 'family'},
  ])
)(CreateDate);
