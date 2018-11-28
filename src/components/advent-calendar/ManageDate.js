import firebase from 'firebase';
import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { createDate, createDateFile } from '../../store/actions/adventActions';

 
class ManageDate extends Component {
  state = {
    adventImage: "",
    imageName: '',
    isUploading: false,
    progress: 0,
    adventImageURL: "",
  };
 
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log('statesub1', this.state);
  } 

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    let id = this.props.match.params.id;
    console.log('dateId', id);

    this.setState({ adventImage: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("adventImages")
      .child(filename)
      .getDownloadURL()
      .then(url => 
        {
          this.setState({ adventImageURL: url, dateId: id })

          this.props.createDateFile(this.state);
          this.setState({...this.state});
        }
      );
  };

   /**
  * Custom onChange event handler
  * Store selected files in the state
  */
 customOnChangeHandler = (event) => {
    const { target: { files } } = event;
    const filesToStore = [];

    files.forEach(file => filesToStore.push(file));

    this.setState({ files: filesToStore });
  }

  /**
  * Start download handler using the file uploader reference
  */
  startUploadManually = () => {
    this.handleUploadStart();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
 
  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageName">Image name:</label>
            <input className="form-control"
              type="text"
              value={this.state.imageName}
              name="imageName"
              id="imageName"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adventImage">File:</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.adventImageURL && <img src={this.state.adventImageURL} className="img-thumbnail" alt="Uploaded" />}
            <FileUploader
              accept="image/*"
              id="adventImage"
              name="adventImage"
              className="form-control"
              randomizeFilename
              storageRef={firebase.storage().ref("adventImages")}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </div>
          <button onClick={this.startUploadManually}>Upload all the things</button>
          {/* <button className="btn btn-primary">Upload Image</button> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    auth: state.firebase.auth,
    family: state.firestore.ordered.family,
    familyMembers: state.firestore.ordered.familyMembers,
    advent: state.firestore.ordered.advent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDate: (obj) => dispatch(createDate(obj)),
    createDateFile: (obj) => dispatch(createDateFile(obj))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'familyMembers', orderBy: ['createdAt', 'asc']},
    { collection: 'family'},
  ])
)(ManageDate);
