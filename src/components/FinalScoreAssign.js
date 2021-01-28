import React, { useState } from "react";
import clsx from "clsx";

export default function FinalScoreAssign({ teamName, teamCurrentScore, handleFinalPointChange }) {
  const [inputValue, setInputValue] = useState("");
  const [inError, setInError] = useState(false);
  const [arePointsAssigned, setArePointsAssigned] = useState(false);

  const handleSubmit = (isAssign) => {
    if (inputValue.length > 0 && +inputValue <= teamCurrentScore) {
      handleFinalPointChange({ teamName, pointValue: +inputValue, isAssign });
      setArePointsAssigned(true);
    } else {
      setInError(true);
    }
  };

  return (
    <div className="final-scoring-individual-element">
      <div className="name">{teamName}</div>
      <div className={clsx("score", arePointsAssigned && "is-large")}>{teamCurrentScore}</div>
      <div className={clsx("input-buttons", !arePointsAssigned && "is-visible")}>
        <input
          className={clsx("points-input", inError && "in-error")}
          type="number"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onFocus={() => setInError(false)}
        />
        <div className="buttons-area">
          <button className="points-button" onClick={() => handleSubmit(false)}>
            -
          </button>
          <button className="points-button" onClick={() => handleSubmit(true)}>
            +
          </button>
        </div>
      </div>
      <span className={clsx("error-message", inError && "visible")}>
        Sisestatud punktisumma on suurem kui maksimaalne võimalik panus. Palun sisesta uus panus.
      </span>
    </div>
  );
}
