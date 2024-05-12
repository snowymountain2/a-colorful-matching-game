import SingleTile from "./sections-of-game-play-screen/colored-tiles-screen/SingleTile";
import CurrentTime from "./sections-of-game-play-screen/game-menu-of-game-play-screen/CurrentTime";
import HighScore from "./sections-of-game-play-screen/game-menu-of-game-play-screen/HighScore";
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
  highScorePostedOnGameplay,
}) {
  const [
    uniqueIDValuesOfTwoTilesCheckedForMatch,
    setUniqueIDValuesOfTwoTilesCheckedForMatch,
  ] = useState([]);
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
  const [arrayOfHexCodesForColors, setArrayOfHexCodesForColors] = useState([]);

  //randomize tiles logic
  useEffect(() => {
    if (startBtnClicked || restartButtonClick) {
      let newCardColors = randomizeTileSequence(gameMode, colorObject);
      setArrayOfHexCodesForColors((prev) => [...newCardColors]);
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
  //logic if 2 tiles selected and DO match
  if (
    colorValuesOfTwoTilesCheckedForMatch.length === 2 &&
    colorValuesOfTwoTilesCheckedForMatch[0] ===
      colorValuesOfTwoTilesCheckedForMatch[1]
  ) {
    setIsMatch((ismatch) => !ismatch);
    changeMatchCount(matchCount + 1);
    setUniqueIDValuesOfTwoTilesCheckedForMatch((prevValue) => []);
    setColorValuesOfTwoTilesCheckedForMatch((prevValue) => []);
  }
  //logic if 2 tiles selected and DONT match
  if (
    colorValuesOfTwoTilesCheckedForMatch.length === 2 &&
    colorValuesOfTwoTilesCheckedForMatch[0] !==
      colorValuesOfTwoTilesCheckedForMatch[1]
  ) {
    setUniqueIDValuesOfTwoTilesCheckedForMatch((prevValue) => []);
    setColorValuesOfTwoTilesCheckedForMatch((prevValue) => []);
  }
  // resets ismatch state variable back to false after a match occured
  if (colorValuesOfTwoTilesCheckedForMatch.length === 1 && ismatch === true) {
    setIsMatch(!ismatch);
  }

  // sets startDate variable when game loads for very first time
  useEffect(() => {
    setStartDate((prevValue) => Date.now());
  }, []);

  //stopwatch logic
  useEffect(() => {
    startTime.current = setInterval(() => {
      if (matchCount == 8) {
        clearInterval(startTime.current);
        setUniqueIDValuesOfTwoTilesCheckedForMatch((prevState) => []);
        setColorValuesOfTwoTilesCheckedForMatch((prevState) => []);
        setIsMatch(false);
        setUniqueTileIDClickedHistory((prevState) => []);
        changeMatchCount(0);
        setRestartButtonClick(false);
        setStartDate(0);
        setArrayOfHexCodesForColors((prevState) => []);
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
      setIsMatch((prevValue) => false);
      changeMatchCount((prevValue) => 0);
      setUniqueIDValuesOfTwoTilesCheckedForMatch((prevValue) => []);
      setColorValuesOfTwoTilesCheckedForMatch((prevValue) => []);
      setRestartButtonClick((prevValue) => false);
      setStartDate((prevValue) => Date.now());
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
              uniqueTileID={i + 1}
              className={`item item-${i + 1}`}
              uniqueIDValuesOfTwoTilesCheckedForMatch={
                uniqueIDValuesOfTwoTilesCheckedForMatch
              }
              setUniqueIDValuesOfTwoTilesCheckedForMatch={
                setUniqueIDValuesOfTwoTilesCheckedForMatch
              }
              tileColor={`${arrayOfHexCodesForColors[i]}`}
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
