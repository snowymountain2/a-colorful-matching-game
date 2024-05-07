export function randomizeTileSequence(gameMode, colorObject) {
  let createRandomIndexInNewColorObject = Math.floor(Math.random() * 2);
  let newColorArrayNotRandomized = [];
  newColorArrayNotRandomized =
    colorObject[`${gameMode}`][createRandomIndexInNewColorObject];
  let randomArray = new Set([]);
  randomArray = Array.from(randomArray);

  while (randomArray.length < 16) {
    let randomNumber = Math.floor(Math.random() * 16);
    randomArray.push(randomNumber);
    let placeHolderSet = new Set(randomArray);
    randomArray = Array.from(placeHolderSet);
  }

  let newCardColors = [...Array(16)].map((currentelement, index) => {
    return newColorArrayNotRandomized[randomArray[index]];
  });
  return newCardColors;
}

export function formatStopwatchTime(startDate) {
  let newTime = Date.now();
  let msElapsedSinceStartOfStopwatch = newTime - startDate;

  let ms = "";
  let seconds = 0;
  let minutes = 0;
  let formattedTimeString = "";
  //logic that handles time under 1 second
  if (msElapsedSinceStartOfStopwatch / 1000 < 1) {
    ms = msElapsedSinceStartOfStopwatch.toString().padStart(3, "0");
    formattedTimeString = `00:00:${ms}`;
    return [formattedTimeString, msElapsedSinceStartOfStopwatch];
  }
  //logic that handles time between 1 sec and 60 seconds
  if (
    msElapsedSinceStartOfStopwatch / 1000 >= 1 &&
    msElapsedSinceStartOfStopwatch / 1000 < 60
  ) {
    ms = (msElapsedSinceStartOfStopwatch % 1000).toString().padStart(3, "0");
    seconds = Math.floor(msElapsedSinceStartOfStopwatch / 1000)
      .toString()
      .padStart(2, "0");
    formattedTimeString = `00:${seconds}:${ms}`;
    return [formattedTimeString, msElapsedSinceStartOfStopwatch];
  }
  //logic that handles time between 1min to 60 minutes
  if (
    msElapsedSinceStartOfStopwatch / 1000 >= 60 &&
    msElapsedSinceStartOfStopwatch / 1000 < 3600
  ) {
    ms = Math.floor((msElapsedSinceStartOfStopwatch % 60000) % 1000)
      .toString()
      .padStart(3, "0");
    seconds = Math.floor((msElapsedSinceStartOfStopwatch % 60000) / 1000)
      .toString()
      .padStart(3, "0");
    minutes = Math.floor(msElapsedSinceStartOfStopwatch / 60000)
      .toString()
      .padStart(2, "0");
    formattedTimeString = `${minutes}:${seconds}:${ms}`;
    return [formattedTimeString, msElapsedSinceStartOfStopwatch];
  }
}
