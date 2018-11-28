const initState = {
  advent: [],
  adventFiles: []
}

const adventReducer = (state = initState, action) => {

  switch (action.type) {
    case 'CREATE_DATE':
      console.log('Created date', action.dateObj)      
      return state;
    case 'CREATE_DATE_ERROR':
      console.log('Created date error', action.err)
      return state;
    case 'CREATE_DATE_FILE':
      console.log('Created date file', action.fileObj)      
      return state;
    case 'CREATE_DATE_FILE_ERROR':
      console.log('Created date file error', action.err)
      return state;
    default:
      return state;
  }
}

export default adventReducer;
