var socket = io();

socket.on('connect',function () {
  console.log('connected to server');

  socket.emit('createMessage',{
    from:'vivek@pepwash.in',
    text:'Nothing yaar'
  });
});
socket.on('disconnect',function () {
  console.log('Discoonected from server');
});

socket.on('newMessage',function (message){
  console.log('New Message',message);
});
