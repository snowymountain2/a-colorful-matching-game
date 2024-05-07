import { useState, useEffect } from "react";

export default function SingleTile({
  className,
  uniqueIDValuesOfTwoTilesCheckedForMatch,
  uniqueTileID,
  setUniqueIDValuesOfTwoTilesCheckedForMatch,
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
    (uniqueTileIDClickedHistory.at(-1) === uniqueTileID ||
      uniqueTileIDClickedHistory.at(-2) === uniqueTileID) &&
    tileMatched == false &&
    restartButtonClick !== true
  ) {
    setTileMatched(!tileMatched);
  }

  // second statement in 'if' clause below accounts for person clicking same tile multiple times (which we dont want incorprated into logic)
  function handleClick() {
    if (
      uniqueIDValuesOfTwoTilesCheckedForMatch.length <= 1 &&
      uniqueIDValuesOfTwoTilesCheckedForMatch[0] !== uniqueTileID
    ) {
      setUniqueIDValuesOfTwoTilesCheckedForMatch([
        ...uniqueIDValuesOfTwoTilesCheckedForMatch,
        uniqueTileID,
      ]);

      setColorValuesOfTwoTilesCheckedForMatch([
        ...colorValuesOfTwoTilesCheckedForMatch,
        tileColor,
      ]);
      setUniqueTileIDClickedHistory([
        ...uniqueTileIDClickedHistory,
        uniqueTileID,
      ]);
    }
  }

  // unhides tiles once restart button is clicked
  useEffect(() => {
    if (restartButtonClick && tileMatched === true) {
      setTileMatched(!tileMatched);
    }
    return;
  }, [restartButtonClick, tileMatched]);

  return (
    <div
      className={
        className +
        (uniqueIDValuesOfTwoTilesCheckedForMatch.length <= 1 &&
        uniqueIDValuesOfTwoTilesCheckedForMatch[0] === uniqueTileID
          ? " border"
          : "") +
        (tileMatched ? " hidden" : "")
      }
      onClick={handleClick}
      style={{ backgroundColor: `${tileColor}` }}
    ></div>
  );
}
