// Connect main.js with index.js on server side
const socket = io();

// DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener('click', function () {
  socket.emit('chat:messageFromBrowser', {
    username: username.value,
    message: message.value
  });
});

socket.on('chat:messageFromServer', function (data) {
  console.log(data);
  output.innerHTML += `
  <p>
    <strong>${data.username}</strong>: ${data.message}
  </p>
  `
})