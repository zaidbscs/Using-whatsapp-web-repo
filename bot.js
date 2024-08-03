const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth() // This should handle session storage
});

// Generate and display QR code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Confirm authentication
client.on('ready', () => {
    console.log('Client is ready!');
});

// Handle incoming messages
client.on('message', message => {
    const prefix = '+';
    if (message.body.startsWith(prefix)) {
        const lowerCaseBody = message.body.substring(1).toLowerCase(); // Remove prefix and convert to lowercase
        const startTime = Date.now(); // Record the start time

        if (lowerCaseBody === 'hi') {
            message.reply('How may I help you?');
        } else if (lowerCaseBody === 'hello') {
            message.reply('Hello! How can I assist you today?');
        } else if (lowerCaseBody === 'bye') {
            message.reply('Goodbye! Have a great day!');
        } else if (lowerCaseBody === 'info') {
            message.reply('I am a bot created to help you with basic queries.');
        } else if (lowerCaseBody === 'ping') {
            const responseTime = Date.now() - startTime; // Calculate the response time
            message.reply(`pong ${responseTime}ms`);
        }
        // If the message doesn't match any condition, do nothing (no reply)
    }
});

// Initialize the client
client.initialize();
