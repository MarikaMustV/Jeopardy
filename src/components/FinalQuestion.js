import React from "react";
import FinalScoreAssign from "./FinalScoreAssign";

export default function FinalQuestion({ finalQuestion, teamsData }) {
  const [stage, setStage] = React.useState(1);
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [finalWinner, setFinalWinner] = React.useState({});
  const [finalPointAssignCount, setFinalPointAssignCount] = React.useState(0);
  const scoreboardRef = React.useRef();

  React.useEffect(() => {
    if (finalPointAssignCount === teamsData.length) {
      const finalResults = teamsData.map((team) => {
        return {
          name: team.name,
          score: Number(window.localStorage.getItem(team.name)),
        };
      });
      setFinalWinner(getFinalWinner(finalResults));
    }
  }, [finalPointAssignCount, teamsData]);

  React.useEffect(() => {
    if (stage === 3) {
      setTimeout(() => {
        scoreboardRef.current.classList.add("in-dom");
      }, 300);
      setTimeout(() => {
        scoreboardRef.current.classList.add("visible");
      }, 600);
    } else if (stage !== 3) {
      scoreboardRef.current.classList.remove("in-dom");
      scoreboardRef.current.classList.remove("visible");
    }
  }, [stage]);

  const handleFinalPointChange = (teamName, pointValue, isAssign, count) => {
    const prevScore = Number(window.localStorage.getItem(teamName));
    window.localStorage.setItem(teamName, isAssign ? prevScore + (pointValue || 0) : prevScore - (pointValue || 0));
    setFinalPointAssignCount(finalPointAssignCount + 1);
  };

  const getFinalWinner = (finalResults) => {
    let highestScore = 0;
    let winnerTeam = "";
    finalResults.map((team) => {
      if (team.score > highestScore) {
        highestScore = team.score;
        winnerTeam = team.name;
      }
      return null;
    });
    return { name: winnerTeam, score: highestScore };
  };

  return (
    <div className="final">
      <button
        className={`side-button left ${stage === 1 ? "disabled" : ""}`}
        onClick={() => {
          if (stage > 1) setStage(stage - 1);
        }}
      />

      <button
        className={`side-button right ${stage === 4 ? "disabled" : ""}`}
        onClick={() => {
          if (stage < 3) setStage(stage + 1);
        }}
      />

      <div className={`final-stage intro ${stage === 1 ? "visible" : ""}`}>KULDVILLAK</div>
      <div
        className={`final-stage question ${stage !== 1 && stage !== 4 ? "visible" : ""} ${
          stage === 3 ? "moved-up" : ""
        }`}
      >
        {finalQuestion.question}
      </div>
      <div className={`final-stage final ${stage === 3 ? "" : ""}`} ref={scoreboardRef}>
        <div className="scoring-wrapper">
          {teamsData.map((team) => {
            return (
              <FinalScoreAssign
                teamName={team.name}
                teamsCurrentScore={window.localStorage.getItem(team.name)}
                handleFinalPointChange={handleFinalPointChange}
                key={`${team.name}-final-score`}
              />
            );
          })}
        </div>
        <div className="answer-wrapper">
          <button
            className={`answer-element reveal-answer ${isAnswerVisible ? "" : "visible"}`}
            onClick={() => setIsAnswerVisible(true)}
          >
            Näita vastust
          </button>
          <div className={`answer-element answer ${isAnswerVisible ? "visible" : ""}`}>{finalQuestion.answer}</div>
        </div>
      </div>
      <button
        className={`finish-game ${finalWinner.name && isAnswerVisible && stage !== 4 ? "visible" : ""}`}
        onClick={() => setStage(4)}
      >
        Kuuluta võitja
      </button>

      {stage === 4 && (
        <div className="winner">
          <div className="name">{finalWinner.name}</div>
          <div className="score">{finalWinner.score}</div>
        </div>
      )}
    </div>
  );
}
