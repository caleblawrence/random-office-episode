import React, { useState } from "react";
import Head from "next/head";
import episodeData from "../episodeData/episodes.json";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Home = () => {
  const [episode, setEpisode] = useState();

  const pickAnEpisode = () => {
    const randomNumber = randomIntFromInterval(1, episodeData.length);
    setEpisode(episodeData[randomNumber]);
  };

  console.log(episode);

  if (episode && episode.overview.length > 300) {
    console.log('need to trim');
    episode.overview = episode.overview.substring(0, 300) + "...";
  }

  return (
    <div className="container">
      <Head>
        <title>Office Random Episode</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <main>
        {episode && (
          <>
            <h1 className="episodeName">{episode.name}</h1>
            <p className="season">Season {episode.season_number}</p>
            <p className="season">Episode {episode.episode_number}</p>
            <p className="overview">{episode.overview}</p>
            <img
              className="img"
              src={"https://image.tmdb.org/t/p/original" + episode.still_path}
            ></img>
          </>
        )}
        <div className={episode ? "" : "center-screen"}>
          <div className="buttonContainer">
            <button onClick={e => pickAnEpisode()} className="btn btn-1">
              <svg>
                <rect
                  x="0"
                  y="0"
                  fill="none"
                  width="100%"
                  height="100%"
                  style={{ color: "black", stroke: "black" }}
                />
              </svg>
              Pick an episode
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          margin: 10px;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .episodeName {
          font-size: 60px;
          font-family: Roboto;
          margin-bottom: 5px;
        }

        .season {
          font-size: 20px;
          font-family: Roboto;
          margin: 5px
        }

        .center-screen {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          min-height: 100vh;
        }
          
        .overview {
          max-width: 500px;
          height: 100px;
          font-family: Roboto;
        }

        .img {
          max-width: 500px;
          max-height: 300px;
        }

        @media only screen and (max-width: 768px) {
          .episodeName {
            font-size: 30px;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
export default Home;
