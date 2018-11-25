const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.userJoined = functions.auth.user().onCreate(user => {

  return admin.firestore().collection('users').doc(user.uid).update({
    roles: {
      admin: false
    },
  });

  
  // return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
  //   const newUser = doc.data();
  //   const notification = {
  //     content: 'User Joined',
  //     user: `${newUser.firstName} ${newUser.lastName}`,
  //     time: admin.firestore.FieldValue.serverTimestamp()
  //   }
  //   return createNotification(notification);
  // })



})
