import "dotenv/config";

import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

const { token, groupId, groupName } = process.env;

const bot = new TelegramBot(token, { polling: false });

const updatePrice = async () => {
  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/pairs/bsc/0x856a1c95bef293de7367b908df2b63ba30fbdd59`
  );

  const { pairs } = await res.json();

  const price = parseFloat(pairs[0].priceUsd).toFixed(6);

  const date = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Europe/Helsinki",
    })
  );

  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  await bot.setChatTitle(
    groupId,
    `${groupName} (${price}, ${date.getHours()}:${minutes})`
  );
};

updatePrice();
