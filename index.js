const TelegramBot = require("node-telegram-bot-api");
const { token, groupId, groupName } = require("./secrets.json");

const { getPrice } = require("./price");

const bot = new TelegramBot(token, { polling: false });

const updatePrice = async () => {
  const web3price = await getPrice();
  const price = parseFloat(web3price).toFixed(8);

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
