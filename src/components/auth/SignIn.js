import React, { Component } from 'react'
import {connect} from 'react-redux'
import { signIn } from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom'


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
    console.log('e', this.state);
  }

  render() {
    const {authError, authErrorMessage, auth} = this.props;

    if (auth.uid) return <Redirect to="/" />

    return (
      <div className="container">

        <form onSubmit={this.handleSubmit} className="white">
          <h5>Let's pick up where we left off!</h5>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
          <div className="red-text center">{ authError ? authError : null }</div>
          <div className="red-text center">{ authErrorMessage ? authErrorMessage : null }</div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    authErrorMessage: state.auth.authErrorMessage,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
