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
