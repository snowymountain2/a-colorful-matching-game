import { useState, useEffect } from "react";

export default function SingleTile({
  className,
  onClick,
  tileID,
  keys,
  setTileID,
  tileColor,
  colorValue,
  setColorValue,
  setTileIDClickedHistory,
  tileIDClickedHistory,
  match,
  restartButtonClick,
}) {
  const [tileMatched, setTileMatched] = useState(false);

  // logic to check if these are the matched tiles that need to be hidden
  if (
    match === true &&
    (tileIDClickedHistory.at(-1) === keys ||
      tileIDClickedHistory.at(-2) === keys) &&
    tileMatched == false &&
    restartButtonClick !== true
  ) {
    setTileMatched(!tileMatched);
  }

  function example() {
    if (tileID.length <= 1 && tileID[0] !== keys) {
      setTileID([...tileID, keys]);
      setColorValue([...colorValue, tileColor]);
      setTileIDClickedHistory([...tileIDClickedHistory, keys]);
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
        (tileID.length <= 1 && tileID[0] === keys ? " border" : "") +
        (tileMatched ? " hidden" : "")
      }
      onClick={example}
      style={{ backgroundColor: `${tileColor}` }}
    ></div>
  );
}
