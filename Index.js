const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

async function connectToWhatsApp() {
    const { state, saveState } = useSingleFileAuthState('auth_info.json');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('Connected');
        }
    });

    sock.ev.on('creds.update', saveState);

    // Listen for messages
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.key.fromMe && msg.message) {
            const messageContent = msg.message.conversation;
            console.log('Received message:', messageContent);
            await sock.sendMessage(msg.key.remoteJid, { text: 'Hello, this is an auto-reply!' });
        }
    });
}

connectToWhatsApp();
