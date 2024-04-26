import AnimatedBackground from "./sections-of-game-selection-screen/AnimatedBackground.jsx";
import GameInstructions from "./sections-of-game-selection-screen/GameInstructions.jsx";
import ModeSelection from "./sections-of-game-selection-screen/ModeSelection.jsx";
import DecorativeSingleTile from "./sections-of-game-selection-screen/DecorativeSingleTile.jsx";
import Title from "./sections-of-game-selection-screen/Title.jsx";
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
            tiles with a narrower color spectrum
          </p>
        </div>
      </div>
      <ModeSelection
        setGameSelectionValues={setGameSelectionValues}
        gameSelectionValues={gameSelectionValues}
      />
      <div className="start-screen-container-around-tiles">
        <div className="container decorative-tiles">
          <DecorativeSingleTile
            keys={1}
            className={"item item-1"}
            tileColor={`${colorObject.easy[0][0]}`}
          />
          <DecorativeSingleTile
            keys={2}
            className={"item item-2"}
            tileColor={`${colorObject.easy[0][1]}`}
          />
          <DecorativeSingleTile
            keys={3}
            className={"item item-3"}
            tileColor={`${colorObject.easy[0][2]}`}
          />
          <DecorativeSingleTile
            keys={4}
            className={"item item-4"}
            tileColor={`${colorObject.easy[0][3]}`}
          />
          <DecorativeSingleTile
            keys={5}
            className={"item item-5"}
            tileColor={`${colorObject.easy[0][4]}`}
          />
          <DecorativeSingleTile
            keys={6}
            className={"item item-6"}
            tileColor={`${colorObject.easy[0][5]}`}
          />
          <DecorativeSingleTile
            keys={7}
            className={"item item-7"}
            tileColor={`${colorObject.easy[0][6]}`}
          />
          <DecorativeSingleTile
            keys={8}
            className={"item item-8"}
            tileColor={`${colorObject.easy[0][7]}`}
          />
          <DecorativeSingleTile
            keys={9}
            className={"item item-9"}
            tileColor={`${colorObject.easy[0][8]}`}
          />
          <DecorativeSingleTile
            keys={10}
            className={"item item-10"}
            tileColor={`${colorObject.easy[0][9]}`}
          />
          <DecorativeSingleTile
            keys={11}
            className={"item item-11"}
            tileColor={`${colorObject.easy[0][10]}`}
          />
          <DecorativeSingleTile
            keys={12}
            className={"item item-12"}
            tileColor={`${colorObject.easy[0][11]}`}
          />
          <DecorativeSingleTile
            keys={13}
            className={"item item-13"}
            tileColor={`${colorObject.easy[0][12]}`}
          />
          <DecorativeSingleTile
            keys={14}
            className={"item item-14"}
            tileColor={`${colorObject.easy[0][13]}`}
          />
          <DecorativeSingleTile
            keys={15}
            className={"item item-15"}
            tileColor={`${colorObject.easy[0][14]}`}
          />
          <DecorativeSingleTile
            keys={16}
            className={"item item-16"}
            tileColor={`${colorObject.easy[0][15]}`}
          />
        </div>
      </div>
    </>
  );
}
