const initState = {
  authError: null,
  authErrorMessage: null  
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('Login Error', action.err)
      return {
        ...state,
        authError: 'Login Failed',
        authErrorMessage: action.err.message
      }
    case 'LOGIN_SUCCESS':
      console.log('Login Success')
      return {
        ...state,
        authError: null,
        authErrorMessage: null
      };
    case 'SIGNOUT_SUCCESS':
      console.log('Signout Success')
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('Signup Success');
      return {
        ...state,
        authError: null,
        authErrorMessage: null
      };
    case 'SIGNUP_ERROR':
      console.log('Signup Error', action.err)
      return {
        ...state,
        authError: 'Signup Failed',
        authErrorMessage: action.err.message
      }
    default:
      return state;
  }
}

export default authReducer;
