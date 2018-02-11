export const join = (channel) => ({
  type: 'SOCKET_JOIN',
  channel,
  request: 'JOIN_REQUEST',
  success: 'JOIN_SUCCESS',
  failure: 'JOIN_FAILURE'
})

export const leave = (channel) => ({
  type: 'SOCKET_LEAVE',
  channel,
  request: 'LEAVE_REQUEST',
  success: 'LEAVE_SUCCESS',
  failure: 'LEAVE_FAILURE'
})

export const message = (channel, data) => ({
  type: 'SOCKET_MESSAGE',
  channel,
  data,
  request: 'MESSAGE_REQUEST',
  success: 'MESSAGE_SUCCESS',
  failure: 'MESSAGE_FAILURE'
})
