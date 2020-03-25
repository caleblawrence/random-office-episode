// run this using `node utils/getTvShowData.js` and it will output data to `/episodeData/episodes.json`.

const axios = require("axios");
const fs = require("fs");

const API_KEY = "217dbab80b64fda157c7b784f3f5d8f0";
const TV_SHOW_ID = "2316";

async function getTvShowEpisodes() {
  try {
    let episodes = [];

    const tvShowData = await axios.get(
      `https://api.themoviedb.org/3/tv/${TV_SHOW_ID}?api_key=${API_KEY}&language=en-US`
    );
    let seasons = tvShowData.data.seasons;

    for (let season of seasons) {
      // skip "specials" season
      if (season.season_number === 0) {
        continue;
      }
      const seasonData = await axios.get(
        `https://api.themoviedb.org/3/tv/${TV_SHOW_ID}/season/${season.season_number}?api_key=${API_KEY}&language=en-US`
      );
      let episodesInSeason = seasonData.data.episodes;

      episodesInSeason.forEach(episode => {
        episodes.push(episode);
      });
    }
    return episodes;
  } catch (error) {
    console.error(error);
  }
}

// top level async
async function main() {
  const episodes = await getTvShowEpisodes();
  console.log("length", episodes.length);
  let episodesJson = JSON.stringify(episodes);
  fs.writeFileSync("episodeData/episodes.json", episodesJson);
}

main();
