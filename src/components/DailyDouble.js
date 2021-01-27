import React from "react";

export default function DailyDouble({ customValue, setCustomValue, questionData, maxDailyDoubleValue }) {
  const [stage, setStage] = React.useState(1);
  const [inError, setInError] = React.useState(false);

  return (
    <React.Fragment>
      <div className={`dd-intro ${stage === 1 ? "is-active" : ""}`}>
        HÕBEVILLAK
        <span className={`error-message ${inError ? "visible" : ""}`}>
          Sisestatud punktisumma on suurem kui maksimaalne võimalik panus. Palun sisesta uus panus.
        </span>
        <input
          className={`dd-input insert-value ${inError ? "in-error" : ""}`}
          type="number"
          onChange={(e) => setCustomValue(e.target.value)}
          onFocus={() => setInError(false)}
        />
        <button
          className="dd-button save-value"
          onClick={() => {
            if (customValue > maxDailyDoubleValue) {
              setInError(true);
            } else {
              setCustomValue(customValue);
              setStage(2);
            }
          }}
        >
          Kinnita panus
        </button>
      </div>

      <div className={`dd-question ${stage === 2 ? "is-active" : ""}`}>
        {questionData.question || "Küsimust pole sisestatud"}
      </div>
    </React.Fragment>
  );
}
