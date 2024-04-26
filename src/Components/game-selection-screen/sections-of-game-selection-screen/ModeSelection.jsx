export default function ModeSelection({
  setGameSelectionValues,
  gameSelectionValues,
}) {
  let gameModeRegular = "";

  function handleOnChange(e) {
    gameModeRegular = e.target.value;
    //console.log(gameModeRegular);
  }

  function handleStartBtnClick() {
    if (gameModeRegular !== "") {
      setGameSelectionValues({
        gameMode: gameModeRegular,
        gameScreen: "gameplay",
        startBtnClicked: true,
      });
    } else {
      null;
    }
  }

  // console.log(gameModeRegular);
  return (
    <>
      <div className="mode-selection-title main-content">
        <p>
          <u>Mode Selection:</u>
        </p>
      </div>
      <div className="mode-selection main-content">
        <br></br>

        <div>
          <form>
            <input
              type="radio"
              id="easy"
              value="easy"
              onChange={handleOnChange}
              className="radio"
            ></input>
            <label className="mode-selection-btn label-1">Easy</label>
            <input
              type="radio"
              id="medium"
              value="medium"
              onChange={handleOnChange}
              className="radio"
            ></input>
            <label className="mode-selection-btn label-2">Medium</label>
            <input
              type="radio"
              id="hard"
              value="hard"
              onChange={handleOnChange}
              className="radio"
            ></input>
            <label className="mode-selection-btn label-3">Hard</label>
          </form>
        </div>
      </div>
      <div className="start-btn-class main-content">
        <button onClick={handleStartBtnClick}>Start</button>
      </div>
    </>
  );
}
