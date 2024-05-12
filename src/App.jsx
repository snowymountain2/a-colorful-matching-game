import { useEffect, useState } from "react";
import "./App.css";
import HighScoreScreen from "./Components/high-score-screen/HighScoreScreen.jsx";
import GameSelectionScreen from "./Components/game-selection-screen/GameSelectionScreen.jsx";
import GamePlayScreen from "./Components/game-play-screen/GamePlayScreen.jsx";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rskiywuyjmodxhdsquxm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza2l5d3V5am1vZHhoZHNxdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyOTkzODAsImV4cCI6MjAyODg3NTM4MH0.cVz84Fj3zUrpTs7qVA09owFCVZgK8SeLwAfOpjTKngQ"
);

function App() {
  const [gameSelectionValues, setGameSelectionValues] = useState({
    startBtnClicked: false,
    gameMode: "easy",
    gameScreen: "start",
  });
  const [time, setTime] = useState("00:00:000");
  const [timeUnformatted, setTimeUnformatted] = useState(0);
  const [highScorePostedOnGameplay, setHighScorePostedOnGameplay] =
    useState("");
  const [endOfGameRestartBtnClick, setEndOfGameRestartBtnClick] =
    useState(false);

  useEffect(() => {
    if (
      endOfGameRestartBtnClick ||
      gameSelectionValues.startBtnClicked === true
    ) {
      getHighScore();
      setEndOfGameRestartBtnClick(false);
    }
  }, [endOfGameRestartBtnClick, gameSelectionValues]);

  async function getHighScore() {
    const { data } = await supabase.from("highscores").select();

    const formattedData = data
      .filter((highscore) => highscore.mode === gameSelectionValues.gameMode)
      .sort(({ msScore: a }, { msScore: b }) => a - b);

    setHighScorePostedOnGameplay(formattedData[0].convertedScore);
  }

  return (
    <>
      {gameSelectionValues.gameScreen === "start" ? (
        <GameSelectionScreen
          gameSelectionValues={gameSelectionValues}
          setGameSelectionValues={setGameSelectionValues}
        />
      ) : (
        ""
      )}

      {gameSelectionValues.gameScreen === "gameplay" ? (
        <GamePlayScreen
          gameSelectionValues={gameSelectionValues}
          setGameSelectionValues={setGameSelectionValues}
          setTime={setTime}
          time={time}
          setTimeUnformatted={setTimeUnformatted}
          highScorePostedOnGameplay={highScorePostedOnGameplay}
        />
      ) : (
        ""
      )}
      {gameSelectionValues.gameScreen === "highscores" ? (
        <HighScoreScreen
          gameSelectionValues={gameSelectionValues}
          setGameSelectionValues={setGameSelectionValues}
          setTime={setTime}
          time={time}
          setTimeUnformatted={setTimeUnformatted}
          timeUnformatted={timeUnformatted}
          setEndOfGameRestartBtnClick={setEndOfGameRestartBtnClick}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
