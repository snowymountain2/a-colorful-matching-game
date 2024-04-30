export default function HighScore({ highScorePostedOnGameplay }) {
  return (
    <>
      <div className="highscore">
        <p>HIGH SCORE</p> <p>{highScorePostedOnGameplay}</p>
      </div>
    </>
  );
}
