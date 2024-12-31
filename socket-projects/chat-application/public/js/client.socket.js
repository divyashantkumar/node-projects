const socket = io({
    auth: {
        serverOffset: 0
    }
});


const sendMsgBtn = document.getElementById('sendButton');
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('chatMessages');

sendMsgBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (chatInput.value) {
        socket.emit('chat message', chatInput.value, [Math.random()]);
        chatInput.value = '';
    }
});

socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    socket.auth.serverOffset = serverOffset;
});

const toggleButton = document.getElementById('toggle-btn');

toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (socket.connected) {
        toggleButton.innerText = 'Connect';
        socket.disconnect();
    } else {
        toggleButton.innerText = 'Disconnect';
        socket.connect();
    }
});