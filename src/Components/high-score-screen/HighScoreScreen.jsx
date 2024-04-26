import AddHighScore from "./sections-of-high-score-screen/AddHighScore.jsx";
import EndGameMessage from "./sections-of-high-score-screen/EndGameMessage.jsx";
import HighScoreList from "./sections-of-high-score-screen/HighScoreList.jsx";
import RestartGame from "./sections-of-high-score-screen/RestartGame.jsx";
import SubmitHighScore from "./sections-of-high-score-screen/SubmitHighScore.jsx";
import { useEffect, useState } from "react";
import logo from "../../../src/assets/title.png";
import { createClient } from "@supabase/supabase-js";

//database initialization
const supabase = createClient(
  "https://rskiywuyjmodxhdsquxm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza2l5d3V5am1vZHhoZHNxdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyOTkzODAsImV4cCI6MjAyODg3NTM4MH0.cVz84Fj3zUrpTs7qVA09owFCVZgK8SeLwAfOpjTKngQ"
);

export default function HighScoreScreen({
  setGameSelectionValues,
  gameSelectionValues,
  timeUnformatted,
  setTimeUnformatted,
  setTime,
  time,
  setEndOfGameRestartBtnClick,
}) {
  // const [highscores, setHighScores] = useState([]);
  const [listOfHighScores, setListOfHighScores] = useState([]);
  const [newHighScore, setNewHighScore] = useState(false);
  const [submittedNameInForm, setSubmittedNameInForm] = useState("");
  const [highscoreSubmitted, setHighScoreSubmitted] = useState(false);
  const [wasNameinFormSubmitted, setWasNameinFormSubmitted] = useState(false);
  const [highScoreListRenderStatus, setHighScoreListRenderStatus] =
    useState("unrendered");
  const [positionOfNewHighScore, setPositionOfNewHighScore] = useState(-1);

  // trigger to (1) initially render highscores and (2) upload new highscore initials
  useEffect(() => {
    if (highScoreListRenderStatus === "unrendered") {
      getHighScores();
    }
    if (wasNameinFormSubmitted && !highscoreSubmitted) {
      addData();
      getHighScores();
      setWasNameinFormSubmitted(false);
    }
  }, [wasNameinFormSubmitted, highScoreListRenderStatus]);

  const formatCurrentDay = function () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const theCurrentDay = formatCurrentDay();

  const highscoreRanks = [
    "1ST",
    "2ND",
    "3RD",
    "4TH",
    "5TH",
    "6TH",
    "7TH",
    "8TH",
    "9TH",
    "10TH",
  ];

  const dataset = {
    mode: setGameSelectionValues.gameMode,
    msScore: timeUnformatted,
    convertedScore: time,
    name: submittedNameInForm,
    date: theCurrentDay,
  };

  async function addData() {
    const { data, error } = await supabase.from("highscores").insert([dataset]);
    setHighScoreSubmitted(true);
    console.log("data was added to db");
  }

  async function getHighScores() {
    const { data } = await supabase.from("highscores").select();
    console.log(data);
    data.sort(({ msScore: a }, { msScore: b }) => a - b);
    setListOfHighScores((prevState) => [...data]);
    if (!highscoreSubmitted && (data.length == 0 || data.length <= 9)) {
      setNewHighScore(true);
    }
    //checks if most recent score is higher than 10th item in lowest to highest sorted highscores
    if (
      !highscoreSubmitted &&
      data.length >= 10 &&
      timeUnformatted < data[9].msScore
    ) {
      setNewHighScore(true);
    }
    if (!highscoreSubmitted) {
      setHighScoreListRenderStatus("first-render-with-initial-list");
    }
    if (highscoreSubmitted) {
      setHighScoreListRenderStatus("new-highscore-rendered-to-list");
    }
  }

  return (
    <>
      <div className="main-content">
        <div className="title">
          {" "}
          <img src={logo} className="title-img main-content"></img>{" "}
        </div>
      </div>
      <div className="container-around-high-score">
        <div className="grid-container-highscores">
          <div className="end-game-message">
            {" "}
            {newHighScore ? "new high score!" : "Your Score:"}
            <p>{time}</p>
            <p>{highscoreRanks[positionOfNewHighScore]}</p>
            <RestartGame
              setGameSelectionValues={setGameSelectionValues}
              gameSelectionValues={gameSelectionValues}
              timeUnformatted={timeUnformatted}
              setTimeUnformatted={setTimeUnformatted}
              time={time}
              setTime={setTime}
              setListOfHighScores={setListOfHighScores}
              setNewHighScore={setNewHighScore}
              setSubmittedNameInForm={setSubmittedNameInForm}
              setHighScoreSubmitted={setHighScoreSubmitted}
              setWasNameinFormSubmitted={setWasNameinFormSubmitted}
              setHighScoreListRenderStatus={setHighScoreListRenderStatus}
              setPositionOfNewHighScore={setPositionOfNewHighScore}
              setEndOfGameRestartBtnClick={setEndOfGameRestartBtnClick}
            />
          </div>
          {newHighScore ? (
            <SubmitHighScore
              className={"submithighscore"}
              setSubmittedNameInForm={setSubmittedNameInForm}
              submittedNameInForm={submittedNameInForm}
              wasNameinFormSubmitted={wasNameinFormSubmitted}
              setWasNameinFormSubmitted={setWasNameinFormSubmitted}
            />
          ) : (
            ""
          )}
          <HighScoreList
            className={"highscorelist"}
            listOfHighScores={listOfHighScores}
            setSubmittedNameInForm={setSubmittedNameInForm}
            submittedNameInForm={submittedNameInForm}
            wasNameinFormSubmitted={wasNameinFormSubmitted}
            setWasNameinFormSubmitted={setWasNameinFormSubmitted}
            timeUnformatted={timeUnformatted}
            highscoreSubmitted={highscoreSubmitted}
            dataset={dataset}
            newHighScore={newHighScore}
            setListOfHighScores={setListOfHighScores}
            highScoreListRenderStatus={highScoreListRenderStatus}
            setHighScoreListRenderStatus={setHighScoreListRenderStatus}
            positionOfNewHighScore={positionOfNewHighScore}
            setPositionOfNewHighScore={setPositionOfNewHighScore}
            highscoreRanks={highscoreRanks}
          />
        </div>
      </div>
    </>
  );
}
