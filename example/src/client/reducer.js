const INITIAL_STATE = {
  log: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    
  case 'JOIN_REQUEST':
  case 'LEAVE_REQUEST':
  case 'MESSAGE_REQUEST':
    return {
      ...state,
      log: [
        ...state.log,
        {
          type: 'REQUEST',
          ...action.request
        }
      ]
    }
    
  case 'JOIN_SUCCESS':
  case 'LEAVE_SUCCESS':
  case 'MESSAGE_SUCCESS':
    return {
      ...state,
      log: [
        ...state.log,
        {
          type: 'RESULT',
          ...action.result
        }
      ]
    }
    
  default:
    return state
  }

}
