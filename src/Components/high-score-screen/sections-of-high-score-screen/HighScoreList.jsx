import { useState, useEffect } from "react";

export default function HighScoreList({
  listOfHighScores,
  setSubmittedNameInForm,
  submittedNameInForm,
  setWasNameinFormSubmitted,
  wasNameinFormSubmitted,
  highscoreSubmitted,
  timeUnformatted,
  newHighScoreData,
  newHighScore,
  setListOfHighScores,
  setHighScoreListRenderStatus,
  highScoreListRenderStatus,
  positionOfNewHighScore,
  setPositionOfNewHighScore,
  highscoreRanks,
}) {
  useEffect(() => {
    if (
      newHighScore &&
      highScoreListRenderStatus === "first-render-with-initial-list"
    ) {
      findPositionOfNewHighScore(listOfHighScores);
      let newArr = [...listOfHighScores];
      newArr.splice(positionOfNewHighScore, 0, newHighScoreData);
      setListOfHighScores(newArr);
      setHighScoreListRenderStatus("list-with-placeholder-rendered");
    }
  }, [listOfHighScores, highScoreListRenderStatus, newHighScore]);

  function findPositionOfNewHighScore(highscorelist) {
    if (highscorelist.length === 0) {
      setPositionOfNewHighScore(0);
    } else if (highscorelist.some((value) => timeUnformatted < value.msScore)) {
      const valueNewHighScoreWillReplace = highscorelist.find(
        (value) => timeUnformatted < value.msScore
      );
      const indexOfNewHighScore = highscorelist.findIndex(
        (object) => object.msScore == valueNewHighScoreWillReplace.msScore
      );
      setPositionOfNewHighScore(indexOfNewHighScore);
    } else {
      console.log("test2");
      setPositionOfNewHighScore(highscorelist.length - 1);
    }
  }

  return (
    <>
      <div className="highscorelist">
        <h1>High Scores:</h1>
        <div className="container-around-highscore-text">
          <p className="highscore-item-titles">
            <span>Rank</span> <span>Score</span>
            <span>Name</span>
            <span>Date</span>
          </p>
          {listOfHighScores.map((highscore, i) => {
            if (i <= 9 && i !== positionOfNewHighScore) {
              return (
                <p key={i} className="highscore-items">
                  <span>{highscoreRanks[i]}</span>{" "}
                  <span>{highscore.convertedScore}</span>{" "}
                  <span>{highscore.name}</span>
                  <span>{highscore.date}</span>
                </p>
              );
            } else if (i <= 9 && i === positionOfNewHighScore) {
              return (
                <p
                  style={{ color: "yellow" }}
                  key={i}
                  className="highscore-items"
                >
                  <span>{highscoreRanks[i]}</span>
                  <span>{highscore.convertedScore}</span>
                  <span>{highscoreSubmitted ? highscore.name : " "} </span>
                  <span>{highscore.date}</span>
                </p>
              );
            } else {
              return;
            }
          })}
        </div>
      </div>
    </>
  );
}
