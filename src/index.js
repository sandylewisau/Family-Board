import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import rootReduccer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import {reduxFirestore, getFirestore } from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';

import fbConfig from './config/fbConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReduccer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      attachAuthIsReady: true, 
      useFirestoreForProfile: true,
      userProfile: 'users'
    })
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
})




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
