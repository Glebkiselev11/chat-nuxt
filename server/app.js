const app = require('express')()
const server = require('http').createServer(app)

const io = require('socket.io')(server)

// socket это объект который служит для текущего соединения
io.on('connection', socket => {
  console.log('connection')
})

module.exports = {
  app, server
}