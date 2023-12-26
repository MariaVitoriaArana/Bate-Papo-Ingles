const chatroomList = document.getElementById('chatroom-list');
const nicknameInput = document.getElementById('nickname');
const chatroomInput = document.getElementById('chatroom');
const info = document.getElementById('info');

updateRoomList();
setInterval(updateRoomList, 2000);

function updateRoomList() {
  const chatrooms = getChatrooms();

  chatroomList.innerHTML = '';

  for (const chatroom of chatrooms) {
    chatroomList.insertAdjacentHTML(
      'beforeend',
      `
    <li>
      <span>${chatroom.name}</span>
      <button type="button" onclick="enterChatroom('${chatroom.name}')">Entrar</button>
    </li>
    `
    );
  }
}

function enterChatroom(chatroomName) {
  const userName = nicknameInput.value;

  if (userName) {
    if (addUserToRoom(chatroomName, userName)) {
      location.href = `sala.html?room=${chatroomName}&user=${userName}`;
    } else {
      info.innerText = 'Este nome de usuário já está em uso.';
    }
  }
}

function createAndEnterChatroom() {
  const userName = nicknameInput.value;
  const chatroomName = chatroomInput.value;

  if (userName && chatroomName) {
    if (createRoom(chatroomName) && addUserToRoom(chatroomName, userName)) {
      location.href = `sala.html?room=${chatroomName}&user=${userName}`;
    } else {
      info.innerText = 'Já existe uma sala com este nome.';
    }
  }
}
