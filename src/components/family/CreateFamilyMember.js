import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { createFamilyMember } from '../../store/actions/familyActions';
import FamilyMemberList from './FamilyMemberList.js';

class CreateFamilyMember extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log('statesub1', this.state);
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('statesub', this.state);
    this.props.createFamilyMember(this.state);
    this.setState({...this.state})
    // this.props.history.push('/')
  }

  render() {
    const {familyMembers} = this.props;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white pb-4">
          <h5>Add family members</h5>

          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter family member first name" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter family member last name" onChange={this.handleChange} />
          </div>
          <button className="btn btn-primary">Create Family Member</button>
        </form>

        <FamilyMemberList familyMembers={familyMembers} />


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    familyMembers: state.firestore.ordered.familyMembers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createFamilyMember: (familyMember) => dispatch(createFamilyMember(familyMember))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'familyMembers', orderBy: ['createdAt', 'asc']},
    { collection: 'family'},
  ])
)(CreateFamilyMember);
