const urlParams = new URLSearchParams(window.location.search);
const passcode = urlParams.get('passcode');
const nickname = urlParams.get('nickname');

// Connect to the WebSocket server with passcode included in the URL
const socket = new WebSocket(`ws://${window.location.host}`); //?passcode=${passcode}&nickname=${nickname}`);

// Handle messages from the server
socket.onmessage = async (event) => {
    // Display the received message in the chatMessages div
    console.log(event.data);
    newp = document.createElement('p');
    newp.innerHTML = event.data;
    newp.textContent = event.data;
    chatMessages = document.getElementById('chatMessages');
    chatMessages.appendChild(newp);
};

// Optional: Handle WebSocket connection opened event
socket.onopen = async function(event) {
    // Update the chat status
    const chatStatus = document.getElementById('chatStatus');
    chatStatus.textContent = 'Status: Connected';
    chatStatus.style = "color:green";
};

// Optional: Handle WebSocket connection closed event
socket.onclose = async function(event) {
    // Update the chat status
    const chatStatus = document.getElementById('chatStatus');
    chatStatus.textContent = 'Status: Disconnected';
    chatStatus.style = "color:red";
};

// Function to send a message to the server
function sendMessage() {
    // Get the message input value
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    // Send the message to the server if it's not empty
    if (message !== '') {
        socket.send(message);
        // Clear the message input
        messageInput.value = '';
    }
}


// Event listener for the send message button
const sendMessageBtn = document.getElementById('sendMessageBtn');
sendMessageBtn.addEventListener('click', sendMessage);

// Optional: Event listener for pressing Enter key to send message
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
