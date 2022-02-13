const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const roomNum = document.getElementById("roomNum");
const nickName = document.getElementById("nickname");
const room = document.getElementById("room");
let roomName;

room.hidden = true;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
  // nameForm.addEventListener("submit", handleNicknameSubmit);
}

// function handleNicknameSubmit(event) {
//   event.preventDefault();
//   const input = form.querySelector("#name");
//   socket.emit("nickname", input.value);
// }

// socketio can send object && socket.emit can send any function (not only message, connection ,, )
function handleRoomSubmit(event) {
  event.preventDefault();
  const inputRoom = roomNum.value;
  const inputNick = nickName.value;
  socket.emit("enter_room", inputRoom, inputNick, showRoom);
  nickname = inputNick;
  roomName = inputRoom;
}

// const roomNum = form.querySelector("#roomNum");
// const nickName = form.querySelector("#nickName");

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} left!`);
});

socket.on("new_message", addMessage);
