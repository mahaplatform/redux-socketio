import SocketClient from 'socket.io-client'
import _ from 'lodash'

let handlers = {}

const ACTION_TYPES = [
  'SOCKETIO_SUBSCRIBE',
  'SOCKETIO_UNSUBSCRIRBE',
  'SOCKETIO_MESSAGE'
]

const reduxSocketIo = (options = {}) => {
  
  const client = createClient(options)

  client.on('message', handleMessage)
  
  return store => next => action => {

    const [, namespace, type] = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/)
    
    const token = action.token || null
    
    const channel = action.channel || null

    if(type === 'SOCKETIO_SUBSCRIBE') {

      const callback = createCallback(store, action, client, namespace, 'join')

      if(!handlers[action.channel]) client.emit('join', token, channel, callback)
      
      addHandler(action.channel, action.action, action.handler)

    }
    
    if(type === 'SOCKETIO_UNSUBSCRIBE') {
      
      if(!_.includes(handlers[action.channel][action.action], action.handler)) return

      removeHandler(action.channel, action.action, action.handler)

      const callback = createCallback(store, action, client, namespace, 'leave')

      if(!handlers[action.channel]) client.emit('leave', token, channel, callback)

    }
    
    if(type === 'SOCKETIO_MESSAGE') {
      
      const data = {
        channel: action.channel,
        action: action.action,
        data: action.data
      }
      
      const callback = createCallback(store, action, client, namespace, 'message', data)
      
      return client.emit('message', channel, data, callback)
      
    }
    
    return next(action)

  }

}

const createClient = (options) => {
  
  const socketUrl = options.url || `${options.protocol}//${options.hostname}:${options.port}`

  return options.client || SocketClient(socketUrl)

}

const addHandler = (channel, action, handler) => {

  if(!handlers[channel]) handlers[channel] = {}
  
  if(!handlers[channel][action]) handlers[channel][action] = []

  if(_.includes(handlers[channel][action], handler)) return
  
  handlers[channel][action].push(handler)

}

const removeHandler = (channel, action, handler) => {

  if(!handlers[channel]) return
  
  if(!handlers[channel][action]) return
  
  handlers[channel][action] = handlers[channel][action].filter(h => h !== handler)
  
  if(handlers[channel][action].length === 0) delete handlers[channel][action]
  
  if(Object.keys(handlers[channel]).length === 0) delete handlers[channel]

}

const handleMessage = (data) => {

  if(!handlers[data.channel]) return
  
  if(!handlers[data.channel][data.action]) return
  
  handlers[data.channel][data.action].map(handler => handler(data.data))

}

const createCallback = (store, action, client, namespace, command, data = null, onSuccess = null) => {

  return (success) => {
    
    if(success) {
      
      if(action.success) {

        coerceArray(action.success).map(requestAction => {
          store.dispatch({
            type: withNamespace(namespace, requestAction)
          })
        })

      }
      
      if(onSuccess) onSuccess()
      
    } else {
      
      if(action.failure) {
        
        coerceArray(action.failure).map(failureAction => {
          store.dispatch({
            type: withNamespace(namespace, failureAction)
          })
        })

      }

    }

  }

  if(action.request) {

    coerceArray(action.request).map(requestAction => {
      store.dispatch({
        type: withNamespace(namespace, requestAction),
        command, 
        data
      })
    })        

  }

}

const coerceArray = (value) => {
  return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default reduxSocketIo