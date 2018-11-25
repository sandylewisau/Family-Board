//HoC for check authentication
import React, { Component } from 'react';
import { connect } from 'react-redux';
export default (ComposedComponent) => {
   class AuthGuard extends Component {
      componentWillMount() {
        console.log('auth', this.props.authenticated);
         if (!this.props.authenticated)
            this.props.history.replace("/");
      }
      componentWillUpdate() {
        console.log('auth2', this.props.authenticated);
         if (!this.props.authenticated)
            this.props.history.replace("/");
      }
      render() {
         return (
            <ComposedComponent { ...this.props } />
         )
      }
   }


   const mapStateToProps = (state) => {
    return {
      authenticated: state.firebase.auth.uid ? true : false
    }
  }

   return connect(mapStateToProps)(AuthGuard);
}
