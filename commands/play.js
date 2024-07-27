import yts from "yt-search";
import youtubedl from "youtube-dl-exec";
import { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";

const search_youtube = async (quary) => {
  const music_list = await yts(quary);
  return music_list.videos[0].url;
};

export const play = async (interaction) => {
  const quary = interaction.options.getString("title");

  const url = await search_youtube(quary);

  const output = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    extractAudio: true,
    audioFormat: "mp3",
    //audioQuality: 0,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: "https://google.com",
  });

  const resource_url = output.formats.find((format) => format.format_id === "251").url;

  const voiceChannel = interaction.member?.voice.channel;

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  let resource = createAudioResource(resource_url);
  const player = createAudioPlayer();

  player.play(resource);
  connection.subscribe(player);
};

export default play;
