import React from "react";

export default function FinalScoreAssign({ teamName, teamsCurrentScore, handleFinalPointChange }) {
  const [inputValue, setInputValue] = React.useState("");
  const [inputError, setInputError] = React.useState(false);
  const [arePointsAssigned, setArePointsAssigned] = React.useState(false);

  return (
    <div className="final-scoring-individual-element">
      <div className="name">{teamName}</div>
      <div className={`score ${arePointsAssigned ? "is-large" : ""}`}>{teamsCurrentScore}</div>
      <div className={`input-buttons ${arePointsAssigned ? "" : "is-visible"}`}>
        <input
          className={`points-input ${inputError ? "in-error" : ""}`}
          type="number"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onFocus={() => setInputError(false)}
        />
        <div className="buttons-area">
          <button
            className="points-button"
            onClick={() => {
              if (inputValue.length > 0) {
                handleFinalPointChange(teamName, Number(inputValue), false);
                setArePointsAssigned(true);
              } else setInputError(true);
            }}
          >
            -
          </button>
          <button
            className="points-button"
            onClick={() => {
              if (inputValue.length > 0) {
                handleFinalPointChange(teamName, Number(inputValue), true);
                setArePointsAssigned(true);
              } else setInputError(true);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
