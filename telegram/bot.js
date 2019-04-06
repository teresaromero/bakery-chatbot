const TelegramBot = require("node-telegram-bot-api");
const store = require('../lib/redux/store')

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


// Handle callback queries
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id
  };
  let text;

  if (action === "edit") {
    text = "Edited Text";
  }

  bot.editMessageText(text, opts);
});
