import TelegramBot from "node-telegram-bot-api"
import fetch from "node-fetch"

import secrets from "./secrets.json";

const { token, groupId, groupName, moralisApiKey } = secrets;

const bot = new TelegramBot(token, { polling: false });

const updatePrice = async () => {
  const res = await fetch(`https://deep-index.moralis.io/api/v2/erc20/0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5/price?chain=bsc`, {
    method: "GET",
    headers: {
      "X-API-KEY": moralisApiKey
    }
  })

  const data = await res.json();

  const price = data.usdPrice.toFixed(5);

  const date = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Europe/Helsinki",
    })
  );

  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  await bot.setChatTitle(
    groupId,
    `${groupName} (${price.replace(
      "0.00000",
      ""
    )}, ${date.getHours()}:${minutes})`
  );
};

updatePrice();
