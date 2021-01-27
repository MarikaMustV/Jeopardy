import React from "react";

export default function DailyDouble({ customValue, setCustomValue, questionData }) {
  const [stage, setStage] = React.useState(1);

  return (
    <React.Fragment>
      <div className={`dd-intro ${stage === 1 ? "is-active" : ""}`}>
        HÕBEVILLAK
        <input className="dd-input insert-value" type="number" onChange={(e) => setCustomValue(e.target.value)} />
        <button
          className="dd-button save-value"
          onClick={() => {
            setCustomValue(customValue);
            setStage(2);
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
