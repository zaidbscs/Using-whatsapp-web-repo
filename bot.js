const { WAConnection } = require('@adiwajshing/baileys');
const fs = require('fs');

async function startBot() {
    const conn = new WAConnection();
    conn.loadAuthInfo('./auth_info.json');

    conn.on('chat-update', async (chatUpdate) => {
        if (chatUpdate.messages && chatUpdate.count) {
            const message = chatUpdate.messages.all()[0];
            const messageType = Object.keys(message.message)[0];
            if (messageType === 'conversation') {
                const text = message.message.conversation;
                const reply = `Auto-reply to: ${text}`;
                await conn.sendMessage(message.key.remoteJid, reply, 'conversation');
            }
        }
    });

    await conn.connect();
    console.log('Bot is running...');
}

startBot();
