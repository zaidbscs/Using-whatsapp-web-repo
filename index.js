const { WAConnection } = require('@adiwajshing/baileys');
const fs = require('fs');

async function connectToWhatsApp() {
    const conn = new WAConnection();
    conn.on('qr', qr => {
        console.log('Scan this QR code with WhatsApp:', qr);
    });
    conn.on('open', () => {
        const authInfo = conn.base64EncodedAuthInfo();
        fs.writeFileSync('auth_info.json', JSON.stringify(authInfo, null, '\t'));
        console.log('Connection established!');
    });
    await conn.connect();
}

connectToWhatsApp();
