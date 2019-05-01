// Connect main.js with index.js on server side
const socket = io();

// DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

// Send the msg to the server
btn.addEventListener('click', function () {
  socket.emit('chat:messageFromBrowser', {
    username: username.value,
    message: message.value
  });
});

// Receive the msg from the server and print it in the DOM
socket.on('chat:messageFromServer', function (data) {
  actions.innerHTML = '';
  output.innerHTML += `
  <p>
    <strong>${data.username}</strong>: ${data.message}
  </p>
  `
});

// Send the user who is typing to the server
message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

// Receive 
socket.on('chat:typing', function (data) {
  actions.innerHTML = `
  <p>
    <em>${data} is typing...</em>
  </p>
  `
})