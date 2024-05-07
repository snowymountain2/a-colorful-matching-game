import SingleTile from "./sections-of-game-play-screen/colored-tiles-screen/SingleTile";
import TileGrid from "./sections-of-game-play-screen/colored-tiles-screen/TileGrid";
import CurrentTime from "./sections-of-game-play-screen/game-menu-of-game-play-screen/CurrentTime";
import HighScore from "./sections-of-game-play-screen/game-menu-of-game-play-screen/HighScore";
import RestartGame from "../high-score-screen/sections-of-high-score-screen/RestartGame";
import "../../../gameplay.css";
import logo from "../../../src/assets/title.png";
import { useState, useEffect, useRef } from "react";
import { colorObject } from "./sections-of-game-play-screen/colored-tiles-screen/ColorObject.js";
import { randomizeTileSequence } from "../../Helper-Functions/helpers.js";

export default function GamePlayScreen({
  gameSelectionValues: { startBtnClicked, gameMode, gameScreen },
  setGameSelectionValues,
  setTime,
  time,
  setTimeUnformatted,
  timeUnformatted,
  highScorePostedOnGameplay,
}) {
  const [uniqueTileID, setUniqueTileID] = useState([]);
  const [
    colorValuesOfTwoTilesCheckedForMatch,
    setColorValuesOfTwoTilesCheckedForMatch,
  ] = useState([]);
  const [ismatch, setIsMatch] = useState(false);
  const [uniqueTileIDClickedHistory, setUniqueTileIDClickedHistory] = useState(
    []
  );
  const [matchCount, changeMatchCount] = useState(0);
  const startTime = useRef(null);
  const [restartButtonClick, setRestartButtonClick] = useState(false);
  const [startDate, setStartDate] = useState(0);
  const [gameRestartedCount, setGameRestartedCount] = useState(0);
  const [individualTileColorCode, setIndividualTileColorCode] = useState([]);

  //randomize tiles logic
  useEffect(() => {
    if (startBtnClicked || restartButtonClick) {
      const newCardColors = randomizeTileSequence(gameMode, colorObject);

      setIndividualTileColorCode((prev) => [...newCardColors]);

      if (restartButtonClick) {
        setRestartButtonClick((prevValue) => false);
      }

      setGameSelectionValues({
        gameMode: gameMode,
        startBtnClicked: false,
        gameScreen: "gameplay",
      });
    } else {
      null;
    }
  }, [setGameSelectionValues, startBtnClicked, gameMode, restartButtonClick]);
  //logic if 2 cards selected and DO match
  if (
    uniqueTileID.length === 2 &&
    uniqueTileID[0] !== uniqueTileID[1] &&
    colorValuesOfTwoTilesCheckedForMatch[0] ===
      colorValuesOfTwoTilesCheckedForMatch[1]
  ) {
    setIsMatch((ismatch) => !ismatch);
    changeMatchCount(matchCount + 1);
    setUniqueTileID((uniqueTileID) => []);
    setColorValuesOfTwoTilesCheckedForMatch(
      (colorValuesOfTwoTilesCheckedForMatch) => []
    );
  }
  //logic if 2 cards selected and DONT match
  if (
    uniqueTileID.length === 2 &&
    colorValuesOfTwoTilesCheckedForMatch[0] !==
      colorValuesOfTwoTilesCheckedForMatch[1]
  ) {
    setUniqueTileID((uniqueTileID) => []);
    setColorValuesOfTwoTilesCheckedForMatch(
      (colorValuesOfTwoTilesCheckedForMatch) => []
    );
  }
  // resets ismatch state variable back to false after a match occured
  if (uniqueTileID.length === 1 && ismatch === true) {
    setIsMatch(!ismatch);
  }

  // stopwatch section
  // resets start time variable upon restart button being clicked
  useEffect(() => {
    if (gameRestartedCount === 0) {
      setStartDate((startDate) => Date.now());
    } else {
      null;
    }
  }, [gameRestartedCount]);

  //stopwatch logic
  useEffect(() => {
    startTime.current = setInterval(() => {
      if (matchCount == 8) {
        clearInterval(startTime.current);
        setUniqueTileID((prevState) => []);
        setColorValuesOfTwoTilesCheckedForMatch((prevState) => []);
        setIsMatch(false);
        setUniqueTileIDClickedHistory((prevState) => []);
        changeMatchCount(0);
        setRestartButtonClick(false);
        setStartDate(0);
        setGameRestartedCount(0);
        setIndividualTileColorCode((prevState) => []);
        startTime.current = null;
        setGameSelectionValues({
          gameMode: gameMode,
          startBtnClicked: false,
          gameScreen: "highscores",
        });
        console.log("value of time on gameplay", timeUnformatted);
      } else {
        let newTime = Date.now();
        let millisecondsThatElapsedSinceStartofStopwatch = newTime - startDate;

        let ms = "";
        let seconds = 0;
        let minutes = 0;
        let formattedTimeString = "";
        //logic that handles time under 1 second
        if (millisecondsThatElapsedSinceStartofStopwatch / 1000 < 1) {
          ms = millisecondsThatElapsedSinceStartofStopwatch
            .toString()
            .padStart(3, "0");
          formattedTimeString = `00:00:${ms}`;
        }
        //logic that handles time between 1 sec and 60 seconds
        if (
          millisecondsThatElapsedSinceStartofStopwatch / 1000 >= 1 &&
          millisecondsThatElapsedSinceStartofStopwatch / 1000 < 60
        ) {
          ms = (millisecondsThatElapsedSinceStartofStopwatch % 1000)
            .toString()
            .padStart(3, "0");
          seconds = Math.floor(
            millisecondsThatElapsedSinceStartofStopwatch / 1000
          )
            .toString()
            .padStart(2, "0");
          formattedTimeString = `00:${seconds}:${ms}`;
        }
        //logic that handles time between 1min to 60 minutes
        if (
          millisecondsThatElapsedSinceStartofStopwatch / 1000 >= 60 &&
          millisecondsThatElapsedSinceStartofStopwatch / 1000 < 3600
        ) {
          ms = Math.floor(
            (millisecondsThatElapsedSinceStartofStopwatch % 60000) % 1000
          )
            .toString()
            .padStart(3, "0");
          seconds = Math.floor(
            (millisecondsThatElapsedSinceStartofStopwatch % 60000) / 1000
          )
            .toString()
            .padStart(3, "0");
          minutes = Math.floor(
            millisecondsThatElapsedSinceStartofStopwatch / 60000
          )
            .toString()
            .padStart(2, "0");
          formattedTimeString = `${minutes}:${seconds}:${ms}`;
        }
        setTimeUnformatted(millisecondsThatElapsedSinceStartofStopwatch);
        setTime(formattedTimeString);
      }
    }, 100);
    return () => {
      clearInterval(startTime.current);
    };
  }, [time, matchCount, startDate]);

  // changes that occur when restart button pressed
  useEffect(() => {
    if (restartButtonClick) {
      setIsMatch((ismatch) => false);
      changeMatchCount((matchCount) => 0);
      setUniqueTileID((uniqueTileID) => []);
      setColorValuesOfTwoTilesCheckedForMatch(
        (colorValuesOfTwoTilesCheckedForMatch) => []
      );
      setRestartButtonClick((restartButtonClick) => false);
      setStartDate((startDate) => Date.now());
      setGameSelectionValues({
        gameMode: gameMode,
        gameScreen: "gameplay",
        startBtnClicked: true,
      });
    }
    return;
  }, [restartButtonClick]);

  function handleRestartButtonClicked() {
    setRestartButtonClick(!restartButtonClick);
  }

  return (
    <>
      <div className="title">
        {" "}
        <img src={logo} className="title-img"></img>{" "}
      </div>
      <div className="menu">
        <span>
          <button onClick={handleRestartButtonClicked}>RESTART</button>
        </span>
        <span> </span>
        <HighScore highScorePostedOnGameplay={highScorePostedOnGameplay} />
        <span> </span>
        <CurrentTime time={time} />
      </div>
      <div className="container-around-tiles">
        <div className="container">
          {[...Array(16)].map((e, i) => (
            <SingleTile
              key={i}
              keys={i + 1}
              className={`item item-${i + 1}`}
              uniqueTileID={uniqueTileID}
              setUniqueTileID={setUniqueTileID}
              tileColor={`${individualTileColorCode[i]}`}
              colorValuesOfTwoTilesCheckedForMatch={
                colorValuesOfTwoTilesCheckedForMatch
              }
              setColorValuesOfTwoTilesCheckedForMatch={
                setColorValuesOfTwoTilesCheckedForMatch
              }
              uniqueTileIDClickedHistory={uniqueTileIDClickedHistory}
              setUniqueTileIDClickedHistory={setUniqueTileIDClickedHistory}
              ismatch={ismatch}
              restartButtonClick={restartButtonClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
