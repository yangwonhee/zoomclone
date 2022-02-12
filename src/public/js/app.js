const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
// socketio can send object && socket.emit can send any function (not only message, connection ,, )
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
