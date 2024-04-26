export default function DecorativeSingleTile({ keys, className, tileColor }) {
  const randomNumber = Math.floor(Math.random() * 6);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.random() * (max - min) + min;
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: `${tileColor}`,
        opacity: 0.25,
        animation: `${
          keys % 2 === 0
            ? `rotation ${randomIntFromInterval(4, 25)}s infinite linear`
            : `rotation-reverse ${randomIntFromInterval(
                4,
                15
              )}s infinite linear`
        }`,
      }}
    ></div>
  );
}
