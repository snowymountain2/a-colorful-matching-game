import SingleTile from "./sections-of-game-play-screen/colored-tiles-screen/SingleTile";
import TileGrid from "./sections-of-game-play-screen/colored-tiles-screen/TileGrid";
import CurrentTime from "./sections-of-game-play-screen/game-menu-of-game-play-screen/CurrentTime";
import HighScore from "./sections-of-game-play-screen/game-menu-of-game-play-screen/HighScore";
import RestartGame from "../high-score-screen/sections-of-high-score-screen/RestartGame";
import "../../../gameplay.css";
import logo from "../../../src/assets/title.png";
import { useState, useEffect, useRef } from "react";
import { colorObject } from "./sections-of-game-play-screen/colored-tiles-screen/ColorObject.js";

export default function GamePlayScreen({
  gameSelectionValues: { startBtnClicked, gameMode, gameScreen },
  setGameSelectionValues,
  setTime,
  time,
  setTimeUnformatted,
  timeUnformatted,
  highScorePostedOnGameplay,
}) {
  const [tileID, setTileID] = useState([]);
  const [colorValue, setColorValue] = useState([]);
  const [match, setMatch] = useState(false);
  const [tileIDClickedHistory, setTileIDClickedHistory] = useState([]);
  const [matchCount, changeMatchCount] = useState(0);
  const startTime = useRef(null);
  const [restartButtonClick, setRestartButtonClick] = useState(false);
  const [startDate, setStartDate] = useState(0);
  const [gameRestartedCount, setGameRestartedCount] = useState(0);
  const [newTileColors, setNewTilesColors] = useState([]);

  //randomize tiles logic
  useEffect(() => {
    if (startBtnClicked || restartButtonClick) {
      let createRandomIndexInNewColorObject = Math.floor(Math.random() * 2);
      let newColorArrayNotRandomized = [];
      newColorArrayNotRandomized =
        colorObject[`${gameMode}`][createRandomIndexInNewColorObject];
      let randomArray = new Set([]);
      randomArray = Array.from(randomArray);

      while (randomArray.length < 16) {
        let randomNumber = Math.floor(Math.random() * 16);
        randomArray.push(randomNumber);
        let placeHolderSet = new Set(randomArray);
        randomArray = Array.from(placeHolderSet);
      }

      let cardColors = new Array(16).fill("");
      let newCardColors = cardColors.map((currentelement, index) => {
        return newColorArrayNotRandomized[randomArray[index]];
      });

      setNewTilesColors((prev) => [...newCardColors]);

      if (restartButtonClick) {
        setRestartButtonClick((prevValue) => false);
      }

      setGameSelectionValues({
        gameMode: gameMode,
        startBtnClicked: false,
        gameScreen: "gameplay",
      });
      //console.log(randomArray.length, "set");
      //setStartBtnClicked((prevValue) => false);
    } else {
      null;
    }
  }, [setGameSelectionValues, startBtnClicked, gameMode, restartButtonClick]);
  //logic if 2 cards selected and DO match
  if (
    tileID.length === 2 &&
    tileID[0] !== tileID[1] &&
    colorValue[0] === colorValue[1]
  ) {
    setMatch((match) => !match);
    changeMatchCount(matchCount + 1);
    setTileID((tileID) => []);
    setColorValue((colorValue) => []);
  }
  //logic if 2 cards selected and DONT match
  if (tileID.length === 2 && colorValue[0] !== colorValue[1]) {
    setTileID((tileID) => []);
    setColorValue((colorValue) => []);
  }
  // resets match state variable back to false after a match occured
  if (tileID.length === 1 && match === true) {
    setMatch(!match);
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

  // const [tileID, setTileID] = useState([]);
  // const [colorValue, setColorValue] = useState([]);
  // const [match, setMatch] = useState(false);
  // const [tileIDClickedHistory, setTileIDClickedHistory] = useState([]);
  // const [matchCount, changeMatchCount] = useState(0);
  // const startTime = useRef(null);
  // const [restartButtonClick, setRestartButtonClick] = useState(false);
  // const [startDate, setStartDate] = useState(0);
  // const [gameRestartedCount, setGameRestartedCount] = useState(0);
  // const [newTileColors, setNewTilesColors] = useState([]);
  //stopwatch logic
  useEffect(() => {
    startTime.current = setInterval(() => {
      if (matchCount == 8) {
        clearInterval(startTime.current);
        setTileID((prevState) => []);
        setColorValue((prevState) => []);
        setMatch(false);
        setTileIDClickedHistory((prevState) => []);
        changeMatchCount(0);
        setRestartButtonClick(false);
        setStartDate(0);
        setGameRestartedCount(0);
        setNewTilesColors((prevState) => []);
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
      setMatch((match) => false);
      changeMatchCount((matchCount) => 0);
      setTileID((tileID) => []);
      setColorValue((colorValue) => []);
      setRestartButtonClick((restartButtonClick) => false);
      setStartDate((startDate) => Date.now());
      setGameSelectionValues({
        gameMode: gameMode,
        gameScreen: "gameplay",
        startBtnClicked: true,
      });
    } else {
      null;
    }
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
          <SingleTile
            keys={1}
            className={"item item-1"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[0]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={2}
            className={"item item-2"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[1]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={3}
            className={"item item-3"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[2]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={4}
            className={"item item-4"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[3]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={5}
            className={"item item-5"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[4]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={6}
            className={"item item-6"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[5]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={7}
            className={"item item-7"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[6]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={8}
            className={"item item-8"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[7]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={9}
            className={"item item-9"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[8]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={10}
            className={"item item-10"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[9]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={11}
            className={"item item-11"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[10]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={12}
            className={"item item-12"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[11]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={13}
            className={"item item-13"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[12]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={14}
            className={"item item-14"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[13]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={15}
            className={"item item-15"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[14]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
          <SingleTile
            keys={16}
            className={"item item-16"}
            tileID={tileID}
            setTileID={setTileID}
            tileColor={`${newTileColors[15]}`}
            colorValue={colorValue}
            setColorValue={setColorValue}
            tileIDClickedHistory={tileIDClickedHistory}
            setTileIDClickedHistory={setTileIDClickedHistory}
            match={match}
            restartButtonClick={restartButtonClick}
          />
        </div>
      </div>
    </>
  );
}
