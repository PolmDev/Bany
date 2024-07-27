import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
// import ytdl from "discord-ytdl-core";
import yts from "yt-search";
import youtubedl from "youtube-dl-exec";

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
  console.log(msg.content);

  // Search for videos on YouTube
  // const r = await yts(msg.content);
  // const videos = r.videos.slice(0, 3);
  // console.log(videos);

  if (msg.content === "join") {
    const channel = msg.member?.voice.channel;

    if (channel) {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const url = "https://www.youtube.com/watch?v=jeqdYqsrsA0";
      youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        audioFormat: "mp3",
        //audioQuality: 0,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        referer: "https://google.com",
      }).then(async (output) => {
        console.log(output.requested_formats);

        let resource = createAudioResource(
          "https://rr6---sn-n3cgv5qc5oq-bh2z7.googlevideo.com/videoplayback?expire=1722079778&ei=woWkZo6vLJCZ1d8PyP2ByAo&ip=219.248.28.88&id=o-ABcX4Qd9A-XXaBEzgBu4N8TACpZoUBoJ-mlC8MfqQJot&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=rh&mm=31%2C26&mn=sn-n3cgv5qc5oq-bh2z7%2Csn-oguesndz&ms=au%2Conr&mv=m&mvi=6&pl=22&initcwndbps=1770000&bui=AXc671LiXVRY-qS_tkKs1F1DcRuHZqWcwtwkZI43slAjOAdnlrMqD-RsiwiYG2-fDr7GHhftb_HHweDU&spc=NO7bAXu1HYpNw5hfsgJqFrhVQ0xD7SKUMGiyhO2achmeI78zH9oJ4YRNbldf&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=t4TDSFfIUGd09AgKMSVtGccQ&rqh=1&gir=yes&clen=4885252&dur=357.401&lmt=1714789390071280&mt=1722057655&fvip=3&keepalive=yes&c=WEB&sefc=1&txp=4532434&n=6HvolhckeByrwQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AGtxev0wRAIgTyG34_ur3_qbHlzV2OSVCZRkej_Pcv72eLTwT_P2diUCIEJopG3LiGVC7YWe6jM_X-688-59xUGXkG4ZJUOZ31g0&sig=AJfQdSswRQIhAI9rkR9AxJo10uOBwa6FITX7erkhyF1mrrO23ok9yvMAAiANPfOdpsgfa7hnhTG-XvAfcsU09BdL8qvwF7dO9D03jQ%3D%3D"
        ); // output = YtResponse (JSON)
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);
      });

      return;

      const stream = ytdl(url, {
        filter: "audioonly",
        opusEncoded: true,
        fmt: "mp3",
        encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
      });

      const resource = createAudioResource(stream);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);
    } else {
      console.log("음성채널에 들어가주세요");
    }
  } else if (msg.content === "leave") {
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

bany.login(process.env.TOKEN);
