import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const bany = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bany.on("ready", async () => {
  console.log("Bany start");
});

bany.on("messageCreate", (msg) => {
  console.log(msg.content);
});

bany.on("interactionCreate", async (interaction) => {});

bany.login(process.env.DISCORD_TOKEN);
