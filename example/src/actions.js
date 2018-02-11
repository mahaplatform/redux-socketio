import * as actionTypes from './action_types'

export const fetch = (channel, action, content) => ({
  type: 'SOCKET',
  channel,
  action,
  content,
  request: 'SOCKET_REQUEST',
  success: 'SOCKET_SUCCESS',
  failure: 'SOCKET_FAILURE'
})
