import SingleTile from "./sections-of-game-play-screen/colored-tiles-screen/SingleTile";
import TileGrid from "./sections-of-game-play-screen/colored-tiles-screen/TileGrid";
import CurrentTime from "./sections-of-game-play-screen/game-menu-of-game-play-screen/CurrentTime";
import HighScore from "./sections-of-game-play-screen/game-menu-of-game-play-screen/HighScore";
import RestartGame from "../high-score-screen/sections-of-high-score-screen/RestartGame";
import "../../../gameplay.css";
import logo from "../../../src/assets/title.png";
import { useState, useEffect, useRef } from "react";
import { colorObject } from "./sections-of-game-play-screen/colored-tiles-screen/ColorObject.js";
import {
  randomizeTileSequence,
  formatStopwatchTime,
} from "../../Helper-Functions/helpers.js";

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
      let newCardColors = randomizeTileSequence(gameMode, colorObject);
      setIndividualTileColorCode((prev) => [...newCardColors]);
      if (restartButtonClick) {
        setRestartButtonClick((prevValue) => false);
      }
      setGameSelectionValues({
        gameMode: gameMode,
        startBtnClicked: false,
        gameScreen: "gameplay",
      });
    }
    return;
  }, [setGameSelectionValues, startBtnClicked, gameMode, restartButtonClick]);
  //logic if 2 cards selected and DO match
  if (
    colorValuesOfTwoTilesCheckedForMatch.length === 2 &&
    colorValuesOfTwoTilesCheckedForMatch[0] ===
      colorValuesOfTwoTilesCheckedForMatch[1]
  ) {
    setIsMatch((ismatch) => !ismatch);
    changeMatchCount(matchCount + 1);
    setUniqueTileID((prevValue) => []);
    setColorValuesOfTwoTilesCheckedForMatch((prevValue) => []);
  }
  //logic if 2 cards selected and DONT match
  if (
    colorValuesOfTwoTilesCheckedForMatch.length === 2 &&
    colorValuesOfTwoTilesCheckedForMatch[0] !==
      colorValuesOfTwoTilesCheckedForMatch[1]
  ) {
    setUniqueTileID((prevValue) => []);
    setColorValuesOfTwoTilesCheckedForMatch((prevValue) => []);
  }
  // resets ismatch state variable back to false after a match occured
  if (colorValuesOfTwoTilesCheckedForMatch.length === 1 && ismatch === true) {
    setIsMatch(!ismatch);
  }

  // resets start time variable upon restart button being clicked
  useEffect(() => {
    if (gameRestartedCount === 0) {
      setStartDate((startDate) => Date.now());
    }
    return;
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
        return;
      }
      let [formattedTimeString, msElapsedSinceStartOfStopwatch] =
        formatStopwatchTime(startDate);

      setTimeUnformatted(msElapsedSinceStartOfStopwatch);
      setTime(formattedTimeString);
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
        <HighScore highScorePostedOnGameplay={highScorePostedOnGameplay} />
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
