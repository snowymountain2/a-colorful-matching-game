export default function RestartGame({
  setGameSelectionValues,
  setTimeUnformatted,
  setListOfHighScores,
  setNewHighScore,
  setSubmittedNameInForm,
  setHighScoreSubmitted,
  setWasNameinFormSubmitted,
  setHighScoreListRenderStatus,
  setPositionOfNewHighScore,
  setTime,
  setEndOfGameRestartBtnClick,
}) {
  function handleClick(e) {
    setListOfHighScores((prevState) => []);
    setNewHighScore(false);
    setSubmittedNameInForm("");
    setHighScoreSubmitted(false);
    setWasNameinFormSubmitted(false);
    setHighScoreListRenderStatus("unrendered");
    setPositionOfNewHighScore(-1);
    setTimeUnformatted(0);
    setTime("00:00:000");
    setEndOfGameRestartBtnClick(true);
    setGameSelectionValues({
      startBtnClicked: false,
      gameMode: "easy",
      gameScreen: "start",
    });
    e.preventDefault();
  }
  return <button onClick={handleClick}>Restart Game</button>;
}
