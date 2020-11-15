//jshint esversion:6
const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static("public"));

let server = app.listen(3000, () => console.log('Server listening on 3000'));

let io = socket(server);

// Listen to Socket connection
io.on('connection', socket => {
  console.log('made socket connection', socket.id);
  socket.broadcast.emit('joined');

  socket.on('chat', data => {
    //io.sockets.emit('chat', data);
    socket.broadcast.emit('chat', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});