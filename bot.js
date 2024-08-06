const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

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
client.on('message', async message => {
    const prefix = '+';
    if (message.body.startsWith(prefix)) {
        const lowerCaseBody = message.body.substring(1).toLowerCase(); // Remove prefix and convert to lowercase

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
        } else if (lowerCaseBody.startsWith('song ')) {
            const songName = lowerCaseBody.substring(5).trim();
            if (!songName) {
                message.reply('Please provide a song name.');
                return;
            }

            try {
                // Search for the song on YouTube
                const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`;
                const searchPage = await fetch(searchUrl);
                const searchHtml = await searchPage.text();
                const videoIdMatch = searchHtml.match(/"videoId":"(.*?)"/);

                if (videoIdMatch && videoIdMatch[1]) {
                    const videoId = videoIdMatch[1];
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                    const outputFilePath = path.join(__dirname, `${videoId}.mp3`);

                    // Download and convert the audio
                    const stream = ytdl(videoUrl, { filter: 'audioonly' });

                    ffmpeg(stream)
                        .audioBitrate(128)
                        .save(outputFilePath)
                        .on('end', async () => {
                            console.log('Song downloaded successfully!');
                            const media = MessageMedia.fromFilePath(outputFilePath);
                            await message.reply(media);
                            fs.unlinkSync(outputFilePath); // Delete the file after sending
                        })
                        .on('error', (err) => {
                            console.error(err);
                            message.reply('Failed to download the song.');
                        });
                } else {
                    message.reply('No song found with that name.');
                }
            } catch (error) {
                console.error(error);
                message.reply('An error occurred while searching for the song.');
            }
        }
    }
});

// Initialize the client
client.initialize();
