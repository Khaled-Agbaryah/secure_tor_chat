const path = require('path');
const WebSocket = require('ws');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const wss = new WebSocket.Server({ noServer: true });
const frontendDir = path.join(__dirname, '../frontend/');
let chats_by_passcode = {};
let chats_by_ws = {}; // Changed to object


function hashObject(obj) {
    // Convert the object to a string
    const objString = JSON.stringify(obj);
    
    // Create a hash object using the SHA-256 algorithm
    const hash = crypto.createHash('sha256');
    
    // Update the hash with the object string
    hash.update(objString);
    
    // Get the hashed value as a hexadecimal string
    const hashedValue = hash.digest('hex');
    
    return hashedValue;
}

function generateUniqueId() {
    a = Math.random().toString(36).substring(2) + Date.now().toString(36);
    b = Math.random().toString(36).substring(2) + Date.now().toString(36);
    c = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return hashObject(a + b + c);
}


function broadcastToChat(chatId, message) {
    if (chatId in chats_by_passcode) {
        chats_by_passcode[chatId].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const msgToSend = message instanceof Buffer ? message.toString() : message;
                client.send(msgToSend);
            }
        });
    }
}

// Handle WebSocket connections
wss.on('connection', async (ws, req) => {
    ws.send('You are now connected to the chat.');

    ws.on('message', (message) => {
        message = String(message);
        message2send = String(message);
        let keyp = 'SLDKSLKIdklfwldhf10232183@!#@!$@#%@$#$fvjldo+-*-/-1!@#@!#sddsa<im><so><mad><i><wanna><punch><the><wall><bare><nuckled><asap>';

        if (message.startsWith(keyp)){
            message = message.substring(keyp.length);
            message = JSON.parse(message);

            passcode = message["passcode"];
            nickname = message["nickname"];

            if (!(passcode in chats_by_passcode)){
                chats_by_passcode[passcode] = [ws];
            }
            else{
                chats_by_passcode[passcode].push(ws);
            }
            id = generateUniqueId();
            ws.id = id;
            chats_by_ws[id] = [passcode, nickname];
        }
        else{
            if (ws.id in chats_by_ws){
                passcode = chats_by_ws[ws.id][0];
                nickname = chats_by_ws[ws.id][1];

                if (!message2send.startsWith(nickname + ": ")) {
                    // Prepend the nickname to the message
                    message2send = `${nickname}: ${message2send}`;
                }
        
                broadcastToChat(passcode, message2send);
            }
            else{
                // console.log(ws);
                console.log("err");
                console.log(ws);
            }
        }
    });

    ws.on('close', () => {
        if (ws.passcode && ws.passcode in chats_by_passcode) {
            chats_by_passcode[ws.passcode] = chats_by_passcode[ws.passcode].filter((client) => client !== ws);
            delete chats_by_ws[hashObject(ws)]; // Changed to delete by WebSocket instance
        }
    });

    ws.onerror = () => {
        console.log('websocket error')
    }
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
});

// app.get('/chat', async (req, res) => {
//     res.redirect('/');
// });

app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/chat', (req, res) => {
//     const passcode = req.body.passcode;
//     const nickname = req.body.nickname;

//     if (!passcode || !nickname) {
//         return res.status(400).send('Passcode or nickname is missing.');
//     }

//     res.sendFile(path.join(frontendDir, 'chat.html'));
// });

app.use(express.static(frontendDir));

const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
