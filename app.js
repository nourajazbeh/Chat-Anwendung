const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

// upload HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// group zum speichern von messages
let messages = [];

// Create HTTP server
const server = http.createServer((req, res) => {
    // Serve HTML file
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', ws => {
    console.log('WebSocket connection established');

    // Send initial messages to user
    ws.send(JSON.stringify(messages));

    // WebSocket message user
    ws.on('message', message => {
        //  erhaltende message von user
        console.log('Received message from client:', message);
        // hinfügen  message zum message group
        messages.push(JSON.parse(message));
        // Broadcast the new message zum alle connected user
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Start HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Function zum stimmen von neu messages
function pollForMessages() {
    setInterval(() => {
        // Simulate bringen von neu messages von database oder external API
        //  nur hinfügen a message jede 5 sekonden
        const newMessage = { user: 'User2', text: 'New message from poll' };
        messages.push(newMessage);
        // geben von neu message zum allen connected WebSocket users
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(newMessage));
            }
        });
    }, 5000); // Poll every 5 seconds
}

// Start polling for messages
pollForMessages();
