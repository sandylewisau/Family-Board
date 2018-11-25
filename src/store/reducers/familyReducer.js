const initState = {
  family: [],
  familyMember: []
}

const familyReducer = (state = initState, action) => {

  switch (action.type) {
    case 'CREATE_FAMILY':
      console.log('Created family', action.family)      
      return state;
    case 'CREATE_FAMILY_ERROR':
      console.log('Created family error', action.err)
      return state;
    case 'CREATE_FAMILY_MEMBER':
      console.log('Created family member', action.familyMember)      
      return state;
    case 'CREATE_FAMILY_MEMBER_ERROR':
      console.log('Created family member error', action.err)
      return state;
    default:
      return state;
  }
}

export default familyReducer;
