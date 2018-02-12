import _ from 'lodash'

const authenticate = (token) => {

  return true

}

export default (io, socket) => {
  
  let channels = []

  const authorize = (channel) => _.includes(channels, channel)

  socket.on('join', (token, channel, message, callback) => {
    
    const authenticated = authenticate(token)
    
    const authorized = authorize(channel)

    if(authenticated && !authorized) {

      socket.join(channel)  

      channels.push(channel)

    }

    if(callback) callback(authenticated)
    
  })
  
  socket.on('leave', (token, channel, message, callback) => {
    
    const authorized = authorize(channel)
    
    if(authorized) {

      socket.leave(channel)

      channels = channels.filter(ch => ch !== channel)

    }

    if(callback) callback(authorized)
    
  })
  
  socket.on('message', (token, channel, data, callback) => {
    
    const authorized = authorize(channel)
    
    if(authorized) io.in(channel).send(data)

    if(callback) callback(authorized)
    
  })
  
}
