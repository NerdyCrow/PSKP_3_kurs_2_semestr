const TelegramBot = require("node-telegram-bot-api");

const token = "6506152023:AAGlBa2cxqghqWLfub62B_Fi8xfy6sGN53k";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `echo: ${msg.text}`);
});
