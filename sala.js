const chatroomHeader = document.getElementById('chatroom-name');
const messageList = document.getElementById('message-list');

const params = new URLSearchParams(location.search);
const chatroomName = params.get('room');
const userName = params.get('user');
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

chatroomHeader.innerHTML = `Usuário: ${userName}<br>Sala: ${chatroomName}`;
document.title = `${userName} — ${chatroomName}`;

updateMessageList();
setInterval(updateMessageList, 2000);

function updateMessageList() {
  const chatroom = getChatroom(chatroomName);

  if (chatroom) {
    messageList.innerHTML = '';

    for (const message of chatroom.messages) {
      messageList.insertAdjacentHTML(
        'beforeend',
        `
        <div class="message">
          <div class="content">${message.content}</div>
          <span class="author">${message.author}</span>
          •
          <span class="date">${dateFormatter.format(message.createdAt)}</span>
        </div>
        `
      );
    }
  }
}

function exitRoom() {
  removeUserFromRoom(chatroomName, userName);

  const chatroom = getChatroom(chatroomName);

  if (chatroom && chatroom.users.length === 0) {
    deleteRoom(chatroomName);
  }

  location.href = 'entrada.html';
}

function send(event) {
  event.preventDefault();

  const form = event.target;

  if (form.message.value) {
    sendMessageToRoom(chatroomName, userName, form.message.value);

    form.message.value = '';

    updateMessageList();
  }
}
