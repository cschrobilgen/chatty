function sendMessage() {
    const alias = document.getElementById("alias").value;
    const message = document.getElementById("message").value;

    if (alias && message) {
        const messageData = { alias, message };
        console.log(JSON.stringify(messageData));

        // Send a POST request to the server to save the message using AJAX
        fetch('/chats/post', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(messageData)
        })
        .then((response) => {
            if (response.ok) {
                console.log('Message sent successfully');
                document.getElementById("message").value = ''; // Clear the message input field
            } else {
                console.error('Failed to send message');
            }
        });
    }
}

function fetchMessages() {
    // Use AJAX (fetch) to periodically fetch messages from the server
    fetch('/chats')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Failed to fetch messages');
                return [];
            }
        })
        .then((messages) => {
            const chatWindow = document.getElementById('messages');
            chatWindow.innerHTML = ''; // Clear the chat window
            messages.forEach((message) => {
                const messageElement = document.createElement('div');
                messageElement.innerHTML = `<strong>${message.alias}:</strong> ${message.message}`;
                chatWindow.appendChild(messageElement);
            });
        });
}

setInterval(fetchMessages, 1000); // Fetch messages every 1 second