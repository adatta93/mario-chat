// Make connection to server
let socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback'),
  joined = document.getElementById('joined');
var timeout;

// Emit events
btn.addEventListener('click', () => {
  emitChat(message, handle);
});

const emitChat = (message, handle) => {
  output.innerHTML += '<p class="mine">' + message.value + '</p>';
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
};

// Typing broadcast
message.addEventListener('keypress', (evt) => {
  if (evt.keyCode == '13') {
    emitChat(message, handle);
  }
  socket.emit('typing', handle.value);
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.emit('typing', false);
  }, 2000);
});

// Listen for events
socket.on('chat', data => {
  feedback.innerHTML = '';
  output.innerHTML += '<p class="other"><strong>' + data.handle + ': </strong><br>' + data.message + '</p>';
});

socket.on('typing', data => {
  if (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  } else {
    feedback.innerHTML = '';
  }
});

socket.on('joined', data => {
  joined.innerHTML = 'New user joined';
});