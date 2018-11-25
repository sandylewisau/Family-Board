import React, { Component } from 'react'
import {createFamily} from '../../store/actions/familyActions';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom'

class CreateFamily extends Component {
  state = {
    name: '',
    ready: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createFamily(this.state);
    this.props.history.push('/')
  }

  render() {
    const {auth, family } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />
    if (family && family.length > 0) return <Redirect to="/family/create-family-member" />

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5>Let's get started! First we'll need to create your family.</h5>

          <div className="form-group">
            <label htmlFor="name">Family Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter family name" onChange={this.handleChange} />
          </div>
          <button className="btn btn-primary">Create Family</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    familyMembers: state.firestore.ordered.familyMembers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createFamily: (project) => dispatch(createFamily(project))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'familyMembers', orderBy: ['createdAt', 'asc']},
    { collection: 'family'},
  ])
)(CreateFamily);
