import SocketClient from 'socket.io-client'
import _ from 'lodash'

const actionTypes = [
  'SOCKET_JOIN',
  'SOCKET_LEAVE',
  'SOCKET_MESSAGE'
]

const reduxSocketIo = (options = {}) => {

  const socketUrl = options.url || `${options.protocol}//${options.hostname}:${options.port}`

  const client = options.client || SocketClient(socketUrl)

  return store => next => action => {

    const [, namespace, type] = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/)

    if(!_.includes(actionTypes, type)) return next(action)
    
    if(action.type === 'SOCKET_JOIN') {
      
      request(store, action, client, namespace, 'join')

    } else if(action.type === 'SOCKET_LEAVE') {
      
      request(store, action, client, namespace, 'leave')

    } else if(action.type === 'SOCKET_MESSAGE') {
      
      request(store, action, client, namespace, 'message')

    }

  }

}

const request = (store, action, client, namespace, command) => {

  const token = 'fesbsdfjbfse68r3jhadwkhuda'
  
  const request = {
    channel: action.channel,
    data: action.data
  }

  const callback = (result) => {
    
    if(result.meta.success) {
      
      if(action.success) {

        coerceArray(action.success).map(requestAction => {
          store.dispatch({
            type: withNamespace(namespace, requestAction),
            result
          })
        })

      }
      
      if(action.onSuccess) action.onSuccess(result)
      
    } else {
      
      if(action.failure) {
        
        coerceArray(action.failure).map(failureAction => {
          store.dispatch({
            type: withNamespace(namespace, failureAction),
            result
          })
        })

      }

      if(action.onFailure) action.onFailure(result)

    }

  }

  if(action.request) {
    coerceArray(action.request).map(requestAction => {
      store.dispatch({
        type: withNamespace(namespace, requestAction),
        request
      })
    })        
  }

  client.emit(command, token, request, callback)
  
}

const coerceArray = (value) => {
  return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default reduxSocketIo