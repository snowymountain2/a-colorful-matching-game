export default function RestartGame({
  setGameSelectionValues,
  gameSelectionValues,
  timeUnformatted,
  setTimeUnformatted,
  time,
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
  // const [listOfHighScores, setListOfHighScores] = useState([]);
  // const [newHighScore, setNewHighScore] = useState(false);
  // const [submittedNameInForm, setSubmittedNameInForm] = useState("");
  // const [highscoreSubmitted, setHighScoreSubmitted] = useState(false);
  // const [wasNameinFormSubmitted, setWasNameinFormSubmitted] = useState(false);
  // const [highScoreListRenderStatus, setHighScoreListRenderStatus] =
  //   useState("unrendered");
  // const [positionOfNewHighScore, setPositionOfNewHighScore] = useState(-1);
  // setGameSelectionValues,
  // gameSelectionValues,
  // timeUnformatted,
  // setTimeUnformatted,
  // time,
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
