import express from 'express' 
import socketio from 'socket.io'
import http from 'http'
import path from 'path'
import socket from './socket'

const server = express()

server.use(express.static(path.resolve(__dirname, '..', 'public'), { redirect: false }))

const transport = http.createServer(server)

const io = socketio(transport)

io.on('connection', (sock) => socket(io, sock))

transport.listen(8090)

server.listen(8080, () => {
  console.log('Example app listening on port 8080!')
})
