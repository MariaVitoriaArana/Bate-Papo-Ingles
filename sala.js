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

    let lastDate = null;

    for (const message of chatroom.messages) {
      const messageDate = new Date(message.createdAt);

      const formattedDate = messageDate.toLocaleDateString('pt-BR');
      const formattedTime = messageDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Se a data mudou, mostra um separador
      if (formattedDate !== lastDate) {
        messageList.insertAdjacentHTML(
          'beforeend',
          `<div class="date-separator">${formattedDate}</div>`
        );
        lastDate = formattedDate;
      }

      messageList.insertAdjacentHTML(
        'beforeend',
        `
        <div class="message ${message.author === userName ? 'me' : ''}">
          <div class="author-name">${message.author}</div>
          <div class="content">${message.content}</div>
          <div class="time">${formattedTime}</div>
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
