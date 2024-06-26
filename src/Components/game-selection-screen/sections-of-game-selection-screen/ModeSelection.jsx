export default function ModeSelection({
  setGameSelectionValues,
  gameSelectionValues,
}) {
  let gameModeValue = "";

  function handleOnChange(e) {
    gameModeValue = e.target.value;
  }

  function handleStartBtnClick() {
    if (gameModeValue !== "") {
      setGameSelectionValues({
        gameMode: gameModeValue,
        gameScreen: "gameplay",
        startBtnClicked: true,
      });
    }
  }
  return (
    <>
      <div className="mode-selection-title main-content">
        <p>
          <u>Mode Selection:</u>
        </p>
      </div>
      <div className="mode-selection main-content">
        <br></br>

        <input
          type="radio"
          id="easy"
          name="mode"
          value="easy"
          onChange={handleOnChange}
          className="radio-input"
        ></input>
        <label className="mode-selection-btn label-1" htmlFor="easy">
          EASY
        </label>
        <input
          type="radio"
          id="medium"
          name="mode"
          value="medium"
          onChange={handleOnChange}
          className="radio-input"
        ></input>
        <label className="mode-selection-btn label-2" htmlFor="medium">
          MEDIUM
        </label>
        <input
          type="radio"
          id="hard"
          name="mode"
          value="hard"
          onChange={handleOnChange}
          className="radio-input"
        ></input>
        <label className="mode-selection-btn label-3" htmlFor="hard">
          HARD
        </label>
      </div>
      <div className="start-btn-class main-content">
        <button onClick={handleStartBtnClick}>START</button>
      </div>
    </>
  );
}
