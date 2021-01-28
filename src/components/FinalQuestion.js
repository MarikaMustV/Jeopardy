import React, { useState, useEffect, useRef } from "react";
import FinalScoreAssign from "./FinalScoreAssign";
import clsx from "clsx";

export default function FinalQuestion({ finalQuestion, teamsData }) {
  const [stage, setStage] = useState(1);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [finalWinner, setFinalWinner] = useState({});
  const [finalPointAssignCount, setFinalPointAssignCount] = useState(0);
  const scoreboardRef = useRef();

  useEffect(() => {
    if (finalPointAssignCount === teamsData.length) {
      const finalResults = teamsData.map((team) => {
        return {
          name: team.name,
          score: +window.localStorage.getItem(team.name),
        };
      });

      setFinalWinner(getFinalWinner(finalResults));
    }
  }, [finalPointAssignCount, teamsData]);

  useEffect(() => {
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

  const handleFinalPointChange = ({ teamName, pointValue, isAssign }) => {
    const prevScore = +window.localStorage.getItem(teamName);
    window.localStorage.setItem(teamName, isAssign ? prevScore + (pointValue || 0) : prevScore - (pointValue || 0));

    setFinalPointAssignCount(finalPointAssignCount + 1);
  };

  const getFinalWinner = (finalResults) => {
    return finalResults.reduce(
      (acc, team) => {
        if (team.score > acc.score) {
          acc = team;
        }

        return acc;
      },
      { name: "", score: 0 }
    );
  };

  return (
    <div className="final">
      <button
        className={clsx("side-button left", stage === 1 && "disabled")}
        onClick={() => {
          if (stage > 1) setStage(stage - 1);
        }}
      />

      <button
        className={clsx("side-button right", stage === 4 && "disabled")}
        onClick={() => {
          if (stage < 3) setStage(stage + 1);
        }}
      />

      <div className={clsx("final-stage intro", stage === 1 && "visible")}>KULDVILLAK</div>
      <div className={clsx("final-stage question", stage !== 1 && stage !== 4 && "visible", stage === 3 && "moved-up")}>
        {finalQuestion.question}
      </div>
      <div className="final-stage final" ref={scoreboardRef}>
        <div className="scoring-wrapper">
          {teamsData.map((team) => {
            return (
              <FinalScoreAssign
                teamName={team.name}
                teamCurrentScore={window.localStorage.getItem(team.name)}
                handleFinalPointChange={handleFinalPointChange}
                key={`${team.name}-final-score`}
              />
            );
          })}
        </div>
        <div className="answer-wrapper">
          <button
            className={clsx("answer-element reveal-answer", !isAnswerVisible && "visible")}
            onClick={() => setIsAnswerVisible(true)}
          >
            Näita vastust
          </button>
          <div className={clsx("answer-element answer", isAnswerVisible && "visible")}>{finalQuestion.answer}</div>
        </div>
      </div>
      <button
        className={clsx("finish-game", finalWinner.name && isAnswerVisible && stage !== 4 && "visible")}
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
