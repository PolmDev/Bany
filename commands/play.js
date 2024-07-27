import yts from "yt-search";

export const search_youtube = async (quary) => {
  const music_list = await yts(quary);

  return music_list.videos[0].url;
};

export default search_youtube;
