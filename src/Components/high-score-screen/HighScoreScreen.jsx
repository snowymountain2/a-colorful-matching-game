import HighScoreList from "./sections-of-high-score-screen/HighScoreList.jsx";
import RestartGame from "./sections-of-high-score-screen/RestartGame.jsx";
import SubmitHighScore from "./sections-of-high-score-screen/SubmitHighScore.jsx";
import { useEffect, useState } from "react";
import logo from "../../../src/assets/title.png";
import { createClient } from "@supabase/supabase-js";
import {
  formatCurrentDay,
  highscoreRanks,
  supabaseKey,
  checkIfNewHighscore,
} from "../../Helper-Functions/helpers.js";

//database initialization
const supabase = createClient(
  "https://rskiywuyjmodxhdsquxm.supabase.co",
  supabaseKey
);

export default function HighScoreScreen({
  gameSelectionValues,
  setGameSelectionValues,
  timeUnformatted,
  setTimeUnformatted,
  setTime,
  time,
  setEndOfGameRestartBtnClick,
}) {
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
      if (
        checkIfNewHighscore(
          highscoreSubmitted,
          listOfHighScores,
          timeUnformatted
        )
      ) {
        setNewHighScore(true);
      }
    }
    if (wasNameinFormSubmitted && !highscoreSubmitted) {
      addData();
      setWasNameinFormSubmitted(false);
    }
  }, [wasNameinFormSubmitted, highScoreListRenderStatus]);

  const theCurrentDay = formatCurrentDay();

  const newHighScoreData = {
    mode: gameSelectionValues.gameMode,
    msScore: timeUnformatted,
    convertedScore: time,
    name: submittedNameInForm,
    date: theCurrentDay,
  };

  async function addData() {
    const { data, error } = await supabase
      .from("highscores")
      .insert([newHighScoreData]);
    setHighScoreSubmitted(true);
    let replacePlaceHolderInitialsValue = [...listOfHighScores];
    replacePlaceHolderInitialsValue.splice(
      positionOfNewHighScore,
      1,
      newHighScoreData
    );
    setListOfHighScores(replacePlaceHolderInitialsValue);
    setHighScoreListRenderStatus("new-highscore-rendered-to-list");
  }

  async function getHighScores() {
    const { data } = await supabase.from("highscores").select();
    const formattedData = data
      .filter((highscore) => highscore.mode === gameSelectionValues.gameMode)
      .sort(({ msScore: a }, { msScore: b }) => a - b);
    setListOfHighScores((prevState) => [...formattedData]);

    if (!highscoreSubmitted) {
      setHighScoreListRenderStatus("first-render-with-initial-list");
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
      <div className="parent-high-score-container">
        <div className="container-around-high-score">
          <div className="grid-container-highscores">
            <div className="end-game-message">
              {" "}
              {newHighScore ? "new highscore!" : "Your Score:"}
              <p>{time}</p>
              <p>{highscoreRanks[positionOfNewHighScore]}</p>
              <RestartGame
                setGameSelectionValues={setGameSelectionValues}
                setTimeUnformatted={setTimeUnformatted}
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
            <div className="submit-name">
              {newHighScore ? (
                <SubmitHighScore
                  setSubmittedNameInForm={setSubmittedNameInForm}
                  setWasNameinFormSubmitted={setWasNameinFormSubmitted}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="high-score-list-container">
            <div className="high-score-list">
              <HighScoreList
                listOfHighScores={listOfHighScores}
                setSubmittedNameInForm={setSubmittedNameInForm}
                submittedNameInForm={submittedNameInForm}
                wasNameinFormSubmitted={wasNameinFormSubmitted}
                setWasNameinFormSubmitted={setWasNameinFormSubmitted}
                timeUnformatted={timeUnformatted}
                highscoreSubmitted={highscoreSubmitted}
                newHighScoreData={newHighScoreData}
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
        </div>
      </div>
    </>
  );
}
