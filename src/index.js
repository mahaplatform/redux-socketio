import SocketClient from 'socket.io-client'
import _ from 'lodash'

const ACTION_TYPES = [
  'SOCKETIO_INIT',
  'SOCKETIO_JOIN',
  'SOCKETIO_LEAVE',
  'SOCKETIO_MESSAGE'
]

const reduxSocketIo = (options = {}) => {

  const client = createClient(options)

  return store => next => action => {

    const [, namespace, type] = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/)

    if(!_.includes(ACTION_TYPES, type)) return next(action)

    if(type === 'SOCKETIO_INIT') {

      client.on('connect', action.connect)

      client.on('disconnect', action.disconnect)

      client.on('message', action.message)

    } else if(type === 'SOCKETIO_JOIN') {

      emit(client, store, namespace, action, 'join')

    } else if(type === 'SOCKETIO_LEAVE') {

      emit(client, store, namespace, action, 'leave')

    } else if(type === 'SOCKETIO_MESSAGE') {

      emit(client, store, namespace, action, 'message')

    }

    return next(action)

  }

}

const createClient = (options) => {

  const socketUrl = options.url || `${options.protocol}//${options.hostname}:${options.port}`

  return options.client || SocketClient(socketUrl)

}

const emit = (client, store, namespace, action, verb) => {

  const token = action.token || null

  const channel = action.channel || null

  store.dispatch({
    type: withNamespace(namespace, action.request),
    channel: action.channel,
    data: action.data
  })

  client.emit(verb, token, action.channel, action.data, (success) => {

    const type = success ? action.success : action.failure

    store.dispatch({
      type: withNamespace(namespace, type),
      channel: action.channel,
      data: action.data
    })

  })

}

const coerceArray = (value) => {
  return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default reduxSocketIo
