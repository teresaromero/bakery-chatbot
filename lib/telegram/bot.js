const TelegramBot = require("node-telegram-bot-api");
const store = require('../redux/store')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true
});

// Matches /love
bot.onText(/\/start/, function onStart(msg) {
  const response = "Welcome to TRBakeryBot, every day we have a special meal, you can type /hello and get the daily special!!"
  bot.sendMessage(msg.chat.id, response);
});

// Matches /hello
bot.onText(/\/hello/, function onHelloText(msg) {
  let {daily} = store.getState();
  let response = `Hello! Todays special is ${daily}!!`
  bot.sendMessage(msg.chat.id, response);
});


