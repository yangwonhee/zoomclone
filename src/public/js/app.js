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
// socket.on("bye", (left, newCount) => {
//   const h4 = room.querySelector("h4");
//   h4.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`📢 ${left} left🥲`);
// });
function handleChangeNick(event) {
  event.preventDefault();
  const input = room.querySelector("#nickChange input");
  const value = input.value;
  socket.emit("change_nickname", value, roomName, () => {
    addMessage(`✔️ Success to change nickname`);
  });
  input.value = "";
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

function showRoom(newCount) {
  welcome.hidden = true;
  room.hidden = false;
  const h4 = room.querySelector("h4");
  h4.innerText = `Room ${roomName} (${newCount})`;
  const msgForm = room.querySelector("#msg");
  const nickForm = room.querySelector("#nickChange");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nickForm.addEventListener("submit", handleChangeNick);
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

socket.on("welcome", (user, newCount) => {
  const h4 = room.querySelector("h4");
  h4.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`📢 ${user} arrived👋`);
});

socket.on("bye", (left, newCount) => {
  const h4 = room.querySelector("h4");
  h4.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`📢 ${left} left🥲`);
});

socket.on("new_message", addMessage);

socket.on("change_nick", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
