const INITIAL_STATE = {
  log: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    
  case 'MESSAGE':
    return {
      ...state,
      log: [
        ...state.log,
        action.message
      ]
    }
    
  default:
    return state
  }

}
