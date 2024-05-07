import { useState, useEffect } from "react";

export default function SingleTile({
  className,
  onClick,
  uniqueTileID,
  keys,
  setUniqueTileID,
  tileColor,
  colorValuesOfTwoTilesCheckedForMatch,
  setColorValuesOfTwoTilesCheckedForMatch,
  setUniqueTileIDClickedHistory,
  uniqueTileIDClickedHistory,
  ismatch,
  restartButtonClick,
}) {
  const [tileMatched, setTileMatched] = useState(false);

  // logic to check if these are the matched tiles that need to be hidden
  if (
    ismatch === true &&
    (uniqueTileIDClickedHistory.at(-1) === keys ||
      uniqueTileIDClickedHistory.at(-2) === keys) &&
    tileMatched == false &&
    restartButtonClick !== true
  ) {
    setTileMatched(!tileMatched);
  }

  function handleClick() {
    if (uniqueTileID.length <= 1 && uniqueTileID[0] !== keys) {
      setUniqueTileID([...uniqueTileID, keys]);
      console.log(colorValuesOfTwoTilesCheckedForMatch[0], tileColor);
      setColorValuesOfTwoTilesCheckedForMatch([
        ...colorValuesOfTwoTilesCheckedForMatch,
        tileColor,
      ]);
      setUniqueTileIDClickedHistory([...uniqueTileIDClickedHistory, keys]);
    }
  }

  // unhides tiles once restart button is clicked
  useEffect(() => {
    if (restartButtonClick && tileMatched === true) {
      setTileMatched(!tileMatched);
    } else {
      return;
    }
  }, [restartButtonClick, tileMatched]);

  return (
    <div
      className={
        className +
        (uniqueTileID.length <= 1 && uniqueTileID[0] === keys
          ? " border"
          : "") +
        (tileMatched ? " hidden" : "")
      }
      onClick={handleClick}
      style={{ backgroundColor: `${tileColor}` }}
    ></div>
  );
}
