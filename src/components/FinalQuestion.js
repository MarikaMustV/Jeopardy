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
    if (finalPointAssignCount === teamsData.filter((team) => team.score > 0).length) {
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
        scoreboardRef.current.classList.add("is-in-dom");
      }, 300);
      setTimeout(() => {
        scoreboardRef.current.classList.add("is-visible");
      }, 600);
    } else if (stage !== 3) {
      scoreboardRef.current.classList.remove("is-in-dom");
      scoreboardRef.current.classList.remove("is-visible");
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
    <div className="final flex-center">
      <button
        className={clsx("btn--side left", stage === 1 && "is-disabled")}
        onClick={() => {
          if (stage > 1) setStage(stage - 1);
        }}
      />

      <button
        className={clsx("btn--side right", stage === 4 && "is-disabled")}
        onClick={() => {
          if (stage < 3) setStage(stage + 1);
        }}
      />

      <div className={clsx("final-stage final-stage--intro", stage === 1 && "is-visible")}>KULDVILLAK</div>
      <div
        className={clsx("final-stage final-stage--question moved-up-animation", {
          "is-visible": stage !== 1 && stage !== 4,
          "moved-up": stage === 3,
        })}
      >
        {finalQuestion.question}
      </div>
      <div className="final-stage final flex-center" ref={scoreboardRef}>
        <div className="final-stage__scoring">
          {teamsData.map((team) => {
            if (team.score > 0) {
              return (
                <FinalScoreAssign
                  teamName={team.name}
                  teamCurrentScore={window.localStorage.getItem(team.name)}
                  handleFinalPointChange={handleFinalPointChange}
                  key={`${team.name}-final-score`}
                />
              );
            }
            return null;
          })}
        </div>
        <div className="answer-wrapper">
          <button
            className={clsx(
              "answer-element btn--reveal-answer btn--main scale-on-hover",
              !isAnswerVisible && "is-visible"
            )}
            onClick={() => setIsAnswerVisible(true)}
          >
            Näita vastust
          </button>
          <div className={clsx("answer-element answer", isAnswerVisible && "is-visible")}>{finalQuestion.answer}</div>
        </div>
      </div>
      <button
        className={clsx("btn--finish-game", finalWinner.name && isAnswerVisible && stage !== 4 && "is-visible")}
        onClick={() => setStage(4)}
      >
        Kuuluta võitja
      </button>

      {stage === 4 && (
        <div className="winner flex-center">
          <div>{finalWinner.name}</div>
          <div>{finalWinner.score}</div>
        </div>
      )}
    </div>
  );
}
