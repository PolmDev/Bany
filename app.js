import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
// import ytdl from "discord-ytdl-core";
import yts from "yt-search";
import youtubedl from "youtube-dl-exec";
import play from "./commands/play.js";

const bany = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

bany.on("ready", async () => {
  console.log("Bany start");
});

bany.on("messageCreate", async (msg) => {
  console.log(msg);
});

bany.on("interactionCreate", async (interaction) => {
  await play(interaction);
});

bany.login(process.env.TOKEN);
