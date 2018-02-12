export const subscribe = (channel, action, handler) => ({
  type: 'SOCKETIO_SUBSCRIBE',
  channel,
  action,
  handler,
  request: 'SUBSCRIBE_REQUEST',
  success: 'SUBSCRIBE_SUCCESS',
  failure: 'SUBSCRIBE_FAILURE'  
})

export const unsubscribe = (channel, action, handler) => ({
  type: 'SOCKETIO_UNSUBSCRIBE',
  channel,
  action,
  handler,
  request: 'UNSUBSCRIBE_REQUEST',
  success: 'UNSUBSCRIBE_SUCCESS',
  failure: 'UNSUBSCRIBE_FAILURE'  
})

export const message = (channel, action, message) => ({
  type: 'SOCKETIO_MESSAGE',
  channel,
  action,
  message,
  request: 'MESSAGE_REQUEST',
  success: 'MESSAGE_SUCCESS',
  failure: 'MESSAGE_FAILURE'  
})