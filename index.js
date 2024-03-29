import "dotenv/config";

import TelegramBot from "node-telegram-bot-api";
import schedule from "node-schedule";

const { TG_TOKEN, TG_GROUP_ID, TG_GROUP_NAME } = process.env;

const bot = new TelegramBot(TG_TOKEN, { polling: true });

const deleteMessage = async (chatId, messageId) => {
  try {
    await bot.deleteMessage(chatId, messageId);
  } catch (err) {
    console.error(err);
  }
};

bot.addListener("message", async (msg) => {
  if (msg.from.username === "sfm_title_price_bot") {
    await deleteMessage(msg.chat.id, msg.message_id);
  }

  if (msg.text?.toLocaleLowerCase() === "price") {
    await updatePrice();
    await deleteMessage(msg.chat.id, msg.message_id);
  }
});

const updatePrice = async () => {
  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/pairs/bsc/0x8e0301e3bde2397449fef72703e71284d0d149f1`
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
    TG_GROUP_ID,
    `${TG_GROUP_NAME} (${price}, ${date.getHours()}:${minutes})`
  );
};

schedule.scheduleJob("0 * * * *", updatePrice);
