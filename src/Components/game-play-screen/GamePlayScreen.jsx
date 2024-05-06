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

      setIndividualTileColorCode((prev) => [...newCardColors]);

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
  //logic if 2 cards selected and DO ismatch
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
  //logic if 2 cards selected and DONT ismatch
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
  // resets ismatch state variable back to false after a ismatch occured
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
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[0]}`}
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
          <SingleTile
            keys={2}
            className={"item item-2"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[1]}`}
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
          <SingleTile
            keys={3}
            className={"item item-3"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[2]}`}
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
          <SingleTile
            keys={4}
            className={"item item-4"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[3]}`}
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
          <SingleTile
            keys={5}
            className={"item item-5"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[4]}`}
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
          <SingleTile
            keys={6}
            className={"item item-6"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[5]}`}
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
          <SingleTile
            keys={7}
            className={"item item-7"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[6]}`}
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
          <SingleTile
            keys={8}
            className={"item item-8"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[7]}`}
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
          <SingleTile
            keys={9}
            className={"item item-9"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[8]}`}
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
          <SingleTile
            keys={10}
            className={"item item-10"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[9]}`}
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
          <SingleTile
            keys={11}
            className={"item item-11"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[10]}`}
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
          <SingleTile
            keys={12}
            className={"item item-12"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[11]}`}
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
          <SingleTile
            keys={13}
            className={"item item-13"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[12]}`}
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
          <SingleTile
            keys={14}
            className={"item item-14"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[13]}`}
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
          <SingleTile
            keys={15}
            className={"item item-15"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[14]}`}
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
          <SingleTile
            keys={16}
            className={"item item-16"}
            uniqueTileID={uniqueTileID}
            setUniqueTileID={setUniqueTileID}
            tileColor={`${individualTileColorCode[15]}`}
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
        </div>
      </div>
    </>
  );
}
