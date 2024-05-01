import ModeSelection from "./sections-of-game-selection-screen/ModeSelection.jsx";
import DecorativeSingleTile from "./sections-of-game-selection-screen/DecorativeSingleTile.jsx";
import logo from "../../../src/assets/title.png";
import "../../../gameplay.css";
import { colorObject } from "../game-play-screen/sections-of-game-play-screen/colored-tiles-screen/ColorObject.js";

export default function GameSelectionScreen({
  setGameSelectionValues,
  gameSelectionValues,
}) {
  return (
    <>
      <div className="main-content">
        <div className="title">
          {" "}
          <img src={logo} className="title-img main-content"></img>{" "}
        </div>
        <div className="instructions">
          <p>
            <u>How to Play:</u> Tap each pair of matching colored tiles as
            quickly as possible. The quicker you match all 16 tiles the higher
            your score. The game’s difficulty increases in each mode by showing
            tiles with fewer colors
          </p>
        </div>
      </div>
      <ModeSelection
        setGameSelectionValues={setGameSelectionValues}
        gameSelectionValues={gameSelectionValues}
      />
      <div className="start-screen-container-around-tiles">
        <div className="container decorative-tiles">
          {[...Array(16)].map((e, i) => (
            <DecorativeSingleTile
              key={i}
              uniqueTileID={Number(i + 1)}
              className={`item item-${i + 1}`}
              tileColor={`${colorObject.easy[0][i]}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
