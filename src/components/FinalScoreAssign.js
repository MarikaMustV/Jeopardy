import React from "react";

export default function FinalScoreAssign({ teamName, teamCurrentScore, handleFinalPointChange }) {
  const [inputValue, setInputValue] = React.useState("");
  const [inError, setInError] = React.useState(false);
  const [arePointsAssigned, setArePointsAssigned] = React.useState(false);

  const handleSubmit = (isAssign) => {
    if (inputValue.length > 0 && Number(inputValue) <= teamCurrentScore) {
      handleFinalPointChange(teamName, Number(inputValue), isAssign);
      setArePointsAssigned(true);
    } else setInError(true);
  };

  return (
    <div className="final-scoring-individual-element">
      <div className="name">{teamName}</div>
      <div className={`score ${arePointsAssigned ? "is-large" : ""}`}>{teamCurrentScore}</div>
      <div className={`input-buttons ${arePointsAssigned ? "" : "is-visible"}`}>
        <input
          className={`points-input ${inError ? "in-error" : ""}`}
          type="number"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onFocus={() => setInError(false)}
        />
        <div className="buttons-area">
          <button
            className="points-button"
            onClick={() => {
              handleSubmit(false);
            }}
          >
            -
          </button>
          <button
            className="points-button"
            onClick={() => {
              handleSubmit(true);
            }}
          >
            +
          </button>
        </div>
      </div>
      <span className={`error-message ${inError ? "visible" : ""}`}>
        Sisestatud punktisumma on suurem kui maksimaalne võimalik panus. Palun sisesta uus panus.
      </span>
    </div>
  );
}
