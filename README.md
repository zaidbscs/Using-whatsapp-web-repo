# Baileys WhatsApp Bot

This repository contains code for a simple WhatsApp bot using the Baileys library. The bot automatically replies to incoming messages.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- WhatsApp account

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/baileys-bot.git
   cd baileys-bot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Generate WhatsApp Web Session**
   Run the following command and scan the QR code with your WhatsApp app:
   ```bash
   node index.js
   ```
   This will create an `auth_info.json` file which contains your session credentials.

4. **Start the Bot**
   After scanning the QR code and generating the session file, run the bot:
   ```bash
   npm start
   ```

### Files

- `index.js`: Script to generate WhatsApp Web session by scanning QR code.
- `bot.js`: Script to start the bot that auto-replies to incoming messages.
- `package.json`: Contains the project dependencies and scripts.

### Notes

- Ensure that `auth_info.json` is in the same directory as `bot.js` when starting the bot.
- The bot replies with the text `Auto-reply to: [your message]`. You can customize the reply logic in `bot.js`.

### License

This project is licensed under the MIT License.
