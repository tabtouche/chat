
window.onload = () => {
    const socket = io();
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');

    const username = prompt("Type your user");
    appendMessage("You joined", true);
    socket.emit('new-user', username);

    socket.on('chat message', function (msg) {
        appendMessage(`${msg.username}: ${msg.msg}`);
    });

    socket.on('user-connected', username => {
        appendMessage(`${username} connected`, true);
    });

    socket.on('user-disconnected', username => {
        appendMessage(`${username} disconnected`, true);
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && input.value.trim()) {
            appendMessage(`You : ${input.value}`);
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });

function appendMessage(msg, isSystem = false) {
    const li = document.createElement('li');
    li.textContent = msg;
    if (isSystem) {
        li.style.fontStyle = "italic";
        li.style.color = "gray";
    }
    messages.appendChild(li);
}
}