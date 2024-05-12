export function randomizeTileSequence(gameMode, colorObject) {
  let createRandomIndexInNewColorObject = Math.floor(Math.random() * 4);
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

export function formatCurrentDay() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  return today;
}

export const highscoreRanks = [
  "1ST",
  "2ND",
  "3RD",
  "4TH",
  "5TH",
  "6TH",
  "7TH",
  "8TH",
  "9TH",
  "10TH",
];

export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza2l5d3V5am1vZHhoZHNxdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyOTkzODAsImV4cCI6MjAyODg3NTM4MH0.cVz84Fj3zUrpTs7qVA09owFCVZgK8SeLwAfOpjTKngQ";
