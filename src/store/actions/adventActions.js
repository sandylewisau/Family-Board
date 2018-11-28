export const createDate = (dateObj) => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('advent').add({
      ...dateObj,
      createdByFirstName: profile.firstName,
      createdByLastName: profile.lastName,
      createdById: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_DATE', dateObj})
    }).catch((err) => {
      console.log('error', err);
      dispatch({ type: 'CREATE_DATE_ERROR', err})
    })    
  }
}


export const createDateFile = (fileObj) => {
  console.log('action', fileObj);

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('advent').doc(fileObj.dateId).collection('adventFiles').add({
      imageName: fileObj.imageName,
      imageUrl: fileObj.adventImageURL,
      createdByFirstName: profile.firstName,
      createdByLastName: profile.lastName,
      createdById: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_DATE_FILE', fileObj})
    }).catch((err) => {
      console.log('error', err);
      dispatch({ type: 'CREATE_DATE_FILE_ERROR', err})
    })

  }
}
