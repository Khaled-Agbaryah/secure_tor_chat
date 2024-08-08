var socket;

async function join_room(){
    document.getElementById("message").innerText = "";
    let passcode = '' + document.getElementById("passcode").value;
    let nickname = '' + document.getElementById("nickname").value;
    if (passcode.trim() == '' || nickname.trim() == ''){
        document.getElementById("message").innerText = "nickname or passcode are invalid";
        return;
    }

    document.getElementById("container1").hidden = true;
    document.getElementById("container2").hidden = false;

    socket = new WebSocket(`wss://${window.location.host}`, [], {
proxy:{host:'localhost', port:1508, protocol: 'socks5'}
});

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

        let passcode = '' + document.getElementById("passcode").value;
        let nickname = '' + document.getElementById("nickname").value;

        socket.send(
            'SLDKSLKIdklfwldhf10232183@!#@!$@#%@$#$fvjldo+-*-/-1!@#@!#sddsa<im><so><mad><i><wanna><punch><the><wall><bare><nuckled><asap>'
          + '{"passcode":"' + passcode.trim() + '","nickname":"' + nickname + '"}'
        );
    };
    
    // Optional: Handle WebSocket connection closed event
    socket.onclose = async function(event) {
        // Update the chat status
        const chatStatus = document.getElementById('chatStatus');
        chatStatus.textContent = 'Status: Disconnected --> exit and try again';
        chatStatus.style = "color:red";
    };
}

async function exit_room(){
    document.getElementById("container1").hidden = false;
    document.getElementById("container2").hidden = true;

    document.getElementById("chatMessages").innerHTML = '';

    socket.close();
}

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

const sendMessageBtn = document.getElementById('sendMessageBtn');
sendMessageBtn.addEventListener('click', sendMessage);

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
