var socket = io();

socket.on('connect',function () {
  console.log('connected to server');
});
socket.on('disconnect',function () {
  console.log('Disconnected from server');
});

socket.on('newMessage',function (message){
  console.log('New Message',message);
  var ol = jQuery('<ol></ol>');
  ol.text(`${message.from}:${message.text}`);

  jQuery('#messages').append(ol);
});

socket.on('newLocationMessage',function(message){
  var ol = jQuery('<ol></ol>');
  var a = jQuery('<a target ="_blank">My current location</a>');

  ol.text(`${message.from}: `);
  a.attr('href',message.url);
  ol.append(a);
  jQuery('#messages').append(ol);
});
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTexBox = jQuery('[name=message]')
  socket.emit('createMessage',{
    from:'User',
    text:messageTexBox.val()
  },function(){
    messageTexBox.val('')
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('sending location.....');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude :position.coords.longitude
    });

  },function(){
      locationButton.removeAttr('disabled').text('send location');
    alert('unable to fetch location');
  });
});
