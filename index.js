

const { makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { state, saveState } = useSingleFileAuthState('auth_info.json');

async function connectToWhatsApp() {
    const conn = makeWASocket({ auth: state });
    
    conn.ev.on('creds.update', saveState);
    
    conn.ev.on('connection.update', update => {
        const { connection, qr } = update;
        if (qr) {
            console.log('Scan this QR code with WhatsApp:', qr);
        } else if (connection === 'open') {
            console.log('Connection established!');
        }
    });

    await conn.connect();
}

connectToWhatsApp();
