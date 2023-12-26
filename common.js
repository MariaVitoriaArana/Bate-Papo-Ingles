/**
 * @returns {Array<{name: string, users: Array<string>, messages: Array<{content: string, author: string, createdAt: number}>}>}
 */
function getChatrooms() {
  const json = localStorage.getItem('chatrooms');

  if (json) {
    return JSON.parse(json);
  }

  return [];
}

function updateChatrooms(chatrooms) {
  localStorage.setItem('chatrooms', JSON.stringify(chatrooms));
}

function getChatroom(chatroomName) {
  const chatrooms = getChatrooms();

  const chatroom = chatrooms.find((room) => room.name === chatroomName);

  if (chatroom) {
    return { ...chatroom, parent: chatrooms };
  }

  return null;
}

function hasUserInRoom(chatroomName, userName) {
  const chatroom = getChatroom(chatroomName);

  if (chatroom === null) {
    return false;
  }

  const user = chatroom.users.find((user) => user === userName);

  return user ? true : false;
}

function createRoom(chatroomName) {
  const chatroom = getChatroom(chatroomName);

  if (chatroom === null) {
    const chatrooms = getChatrooms();

    chatrooms.push({ name: chatroomName, users: [], messages: [] });

    updateChatrooms(chatrooms);

    return true;
  }

  return false;
}

function deleteRoom(chatroomName) {
  const chatrooms = getChatrooms();

  const index = chatrooms.findIndex((room) => room.name === chatroomName);

  chatrooms.splice(index, 1);

  updateChatrooms(chatrooms);
}

function sendMessageToRoom(chatroomName, author, content) {
  const chatroom = getChatroom(chatroomName);

  if (chatroom) {
    chatroom.messages.push({ author, content, createdAt: Date.now() });

    updateChatrooms(chatroom.parent);
  }
}

function removeUserFromRoom(chatroomName, userName) {
  const chatroom = getChatroom(chatroomName);

  if (chatroom) {
    const index = chatroom.users.findIndex((user) => user === userName);

    if (index >= 0) {
      chatroom.users.splice(index, 1);

      updateChatrooms(chatroom.parent);
    }
  }
}

function addUserToRoom(chatroomName, userName) {
  if (hasUserInRoom(chatroomName, userName)) {
    return false;
  }

  const chatroom = getChatroom(chatroomName);

  if (chatroom) {
    chatroom.users.push(userName);

    updateChatrooms(chatroom.parent);

    return true;
  }

  return false;
}
