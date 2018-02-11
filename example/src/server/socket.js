const result = (data = null) => {

  const result = {
    meta: {
      message: 'Success',
      status: 'OK',
      success: true
    }
  }

  if(!data) return result

  return {
    ...result,
    data
  }

}

export default (socket) => {
  
  socket.on('join', (token, req, callback) => {
    
    socket.join(req.channel)
  
    if(callback) callback(result())
    
  })
  
  socket.on('leave', (token, req, callback) => {
    
    socket.leave(req.channel)
    
    if(callback) callback(result())
    
  })  
  
  socket.on('message', (token, req, callback) => {
    
    if(callback) callback(result())
    
    socket.in(req.channel).emit(req.data)
    
  })  
  
}