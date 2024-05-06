const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// data  initial messages
const messages = [
    { user: 'User1', text: 'Hello!' },
    { user: 'User2', text: 'Hi there!' }
];

// Function zu display messages im chat box
function displayMessages() {
    chatBox.innerHTML = ''; // Löschen vorherriger nachricht 
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.user}: ${message.text}`;
        chatBox.appendChild(messageElement);
    });
    // back zu bottom von chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Initial display messages
displayMessages();

// Ereignislistener zum Button hinfügen zum senden von massage
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        // Add the new message to the messages array
        messages.push({ user: 'User1', text: messageText });
        // Update  chat box
        displayMessages();
        // Löschen von message input
        messageInput.value = '';
    }
});
