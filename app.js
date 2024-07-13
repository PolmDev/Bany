import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";
import ytdl from "ytdl-core";

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

bany.on("messageCreate", (msg) => {
  console.log(msg.content);

  if (msg.content == "join") {
    const channel = msg.member?.voice.channel;

    if (channel) {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const stream = ytdl("https://www.youtube.com/watch?v=sSsI7ktL4Ok", {
        filter: "audioonly",
      });
      const resource = createAudioResource(stream);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);
    } else {
      console.log("음성채널에 들어가주세요");
    }
  } else if (msg.content == "leave") {
    const guildId = msg.guild?.id;
    if (guildId) {
      const connection = getVoiceConnection(guildId);

      if (connection) {
        connection.destroy();
      }
    }
  }
});

bany.on("interactionCreate", async (interaction) => {});

bany.login(process.env.DISCORD_TOKEN);
