const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth()
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
    if (message.body.toLowerCase() === 'hi') {
        message.reply('How may I help you?');
    }
});

// Initialize the client
client.initialize();
