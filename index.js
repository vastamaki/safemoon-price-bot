const TelegramBot = require("node-telegram-bot-api");
const { token, groupId, groupName } = require("./secrets.json");
const fetch = require("cross-fetch");

const bot = new TelegramBot(token, { polling: false });

const updatePrice = async () => {
  const res = await fetch(
    `https://api.pancakeswap.info/api/v2/tokens/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3`
  );
  const { data } = await res.json();

  const price = parseFloat(data.price).toFixed(8);

  const date = new Date(new Date().toLocaleString("en-US", {
    timeZone: "Europe/Helsinki",
  }));

  const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  await bot.setChatTitle(groupId, `${groupName} (${price}, ${date.getHours()}:${minutes})`);
};

updatePrice();
