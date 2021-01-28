import React, { useState } from "react";
import clsx from "clsx";

export default function DailyDouble({ customValue, setCustomValue, questionData, maxDailyDoubleValue }) {
  const [stage, setStage] = useState(1);
  const [inError, setInError] = useState(false);

  const handleSaveValue = () => {
    if (customValue > maxDailyDoubleValue) {
      setInError(true);
    } else {
      setCustomValue(customValue);
      setStage(2);
    }
  };

  return (
    <div className="dd">
      <div className={clsx("dd__intro", stage === 1 && "is-active")}>
        HÕBEVILLAK
        <span className={clsx("dd__error-message", inError && "is-visible")}>
          Sisestatud punktisumma on suurem kui maksimaalne võimalik panus. Palun sisesta uus panus.
        </span>
        <input
          className={clsx("input--insert-value", inError && "is-in-error")}
          type="number"
          onChange={(e) => setCustomValue(e.target.value)}
          onFocus={() => setInError(false)}
        />
        <button className="btn--save-value" onClick={() => handleSaveValue()}>
          Kinnita panus
        </button>
      </div>

      <div className={clsx("dd__question", stage === 2 && "is-active")}>
        {questionData.question || "Küsimust pole sisestatud"}
      </div>
    </div>
  );
}
