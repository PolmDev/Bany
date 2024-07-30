import yts from "yt-search";
import youtubedl from "youtube-dl-exec";
import {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
  AudioPlayerStatus,
} from "@discordjs/voice";

const music_queue = {};

let isPlaying = false;

const search_youtube = async (quary) => {
  const music_list = await yts(quary);
  return music_list.videos[0].url;
};

const play_next = async (connection, player, guildId) => {
  console.log(music_queue);
  console.log(guildId);
  if (music_queue[guildId].length == 0) {
    isPlaying = false;
    return;
  }

  console.log(1);

  const music = music_queue[guildId][0];
  music_queue[guildId].shift();

  const output = await youtubedl(music, {
    dumpSingleJson: true,
    noWarnings: true,
    extractAudio: true,
    audioFormat: "mp3",
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: "https://google.com",
  });

  const resource_url = output.formats.find((format) => format.format_id === "251").url;

  let resource = createAudioResource(resource_url);

  player.play(resource);
  connection.subscribe(player);
};

export const play = async (interaction) => {
  const voiceChannel = interaction.member?.voice.channel;
  if (voiceChannel) {
    const quary = interaction.options.getString("title");

    const url = await search_youtube(quary);

    if (!(interaction.guildId in music_queue)) {
      music_queue[interaction.guildId] = [];
    }

    music_queue[interaction.guildId].push(url);

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Idle, () => {
      play_next(connection, player, interaction.guildId);
    });

    if (!isPlaying) {
      isPlaying = true;
      play_next(connection, player, interaction.guildId);
    }

    console.log(music_queue);
  } else {
    //voice channel none
  }
};

export default play;
