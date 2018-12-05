import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom'
import moment from 'moment';

const AdventDateDetail = (props) => {
  const {adventDoc, adventFiles, auth} = props;

  if (!auth.uid) return <Redirect to="/signin" />

  console.log('recDate', adventDoc);
  if (adventDoc) {
    // console.log('adventFiles', adventFiles);
    return (
      <div>
        <div className="jumbotron advent-detail">
          <h1 className="display-4">Day {moment(adventDoc.openDate.toDate()).format('D')}</h1>
          
          {
            adventDoc.quote && adventDoc.quote.length > 0 &&
              <blockquote className="blockquote">
              <p className="mb-0">&ldquo;{adventDoc.quote}&rdquo;</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">{adventDoc.quoteBy}</cite>
              </footer>
            </blockquote>
          }          
        </div>
        {
          adventFiles && adventFiles.map(file => {
            return (
              <div className="pb-5" key={file.id}>
                <h3>{file.imageName}</h3>
                <img src={file.imageUrl} className="img-fluid" alt="" />
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <div className="container">Loading...</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const advents = state.firestore.ordered.adventDoc;
  const rec = advents ? advents[0] : null;

  return {
    recDate: null,
    advent: state.firestore.ordered.advent,
    adventDoc: rec,
    adventFiles: state.firestore.ordered.adventFiles,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    { 
      collection: 'advent',
      doc: props.match.params.id,
      storeAs: 'adventDoc'
    },
    { 
      collection: 'advent', 
      doc: props.match.params.id, 
      subcollections: [{ collection: 'adventFiles' }],
      orderBy: ['imageName', 'asc'],
      storeAs: 'adventFiles'
    },
  ])
)(AdventDateDetail)
