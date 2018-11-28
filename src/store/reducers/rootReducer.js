import authReducer from './authReducer';
// import projectReducer from './projectReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import adventReducer from './adventReducer';
import familyReducer from './familyReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  advent: adventReducer,
  family: familyReducer
})

export default rootReducer;
