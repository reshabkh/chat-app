const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//const _ = require('lodash');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user join'));

  socket.on('createMessage',(message) => {
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
  });

  socket.on('disconnect',() => {
    console.log('user was Disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server is up on ${port}`);
});
