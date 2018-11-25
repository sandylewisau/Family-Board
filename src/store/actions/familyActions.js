export const createFamily = (family) => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('family').add({
      ...family,
      createdByFirstName: profile.firstName,
      createdByLastName: profile.lastName,
      createdById: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_FAMILY', family})
    }).catch((err) => {
      console.log('error', err);
      dispatch({ type: 'CREATE_FAMILY_ERROR', err})
    })    
  }
}


export const createFamilyMember = (familyMember) => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('familyMembers').add({
      ...familyMember,
      createdByFirstName: profile.firstName,
      createdByLastName: profile.lastName,
      createdById: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_FAMILY_MEMBER', familyMember})
    }).catch((err) => {
      console.log('error', err);
      dispatch({ type: 'CREATE_FAMILY_MEMBER_ERROR', err})
    })    
  }
}
