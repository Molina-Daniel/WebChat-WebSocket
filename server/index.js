// Initialize Path module
const path = require('path');
// Initialize Express
const express = require('express');
// Object containing all the server configuration
const app = express();


// Server Configuration
// Settings - set the port by default or 3000
app.set('port', process.env.PORT || 3000);

// Static files - show where the statics files are
app.use(express.static(path.join(__dirname, '../public')));

// Start the server - listen when the server starts and console the port where started
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});


// Socket.io makes the bidirectional communication but it needs a server running already
// Initialize Socket.io
const SocketIO = require('socket.io');

// Storage the running server in a constant to work with
const io = SocketIO.listen(server);

// WebSockets
// Listen new client connections
io.on('connection', (socket) => {
  console.log('new connection', socket.id);
  // Receive the data (msg) and resend 'em to all clients/browsers
  socket.on('chat:messageFromBrowser', (data) => {
    io.sockets.emit('chat:messageFromServer', data)
  })
});