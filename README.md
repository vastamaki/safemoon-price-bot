# Safemoon price bot
Get Safemoon price and update the Telegram group title

## Details
This is a simple tool that checks the current price of Safemoon and updates the Telegram group title accordingly

## Local development
Create a stack.env file and copy the required fields from "env.example" file and fill it accordingly.
After that, you should be able to run the index.js file, which will fetch the price from DEX Screener API and update the Telegram group's title.

You can also use `docker compose up -d` command to start the program in background

### Requirements
- NodeJS >=18
- Docker (optional)
