export default function DecorativeSingleTile({
  key,
  uniqueTileID,
  className,
  tileColor,
}) {
  function randomIntFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: `${tileColor}`,
        opacity: 0.25,
        // rotation direction inverses every other tile
        animation: `${
          uniqueTileID % 2 === 0
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
