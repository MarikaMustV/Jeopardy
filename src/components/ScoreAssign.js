import React, { useState } from "react";
import clsx from "clsx";

export default function ScoreAssign({
  isVisible,
  teamsData,
  pointValue,
  activatePointChange,
  closeQuestion,
  currentPointSum,
  maxAllowedPointSum,
  wasLastPointChangeAssign,
}) {
  const [scoreActivatedTeam, setScoreActivatedTeam] = useState("");
  const [lastPointChangeTeam, setLastPointChangeTeam] = useState(null);
  const [teamsThatLostPointsThisQuestion, setTeamsThatLostPointsThisQuestion] = useState([]);

  const handleScoreChangeButtonClick = (teamName, isAssign) => {
    activatePointChange({ teamName, pointValue, isAssign });
    setLastPointChangeTeam(teamName);
    if (!isAssign) setTeamsThatLostPointsThisQuestion([...teamsThatLostPointsThisQuestion, teamName]);
  };

  const getIsPointAddingAllowed = (teamName) => {
    let adjustedMaxAllowedPointSum = maxAllowedPointSum;

    if (teamsThatLostPointsThisQuestion.length && teamsThatLostPointsThisQuestion.includes(teamName)) {
      adjustedMaxAllowedPointSum = maxAllowedPointSum + pointValue;
    }

    return currentPointSum < adjustedMaxAllowedPointSum;
  };

  return (
    <div className={clsx("score-assign", !isVisible && "is-hidden")}>
      <div className="title-wrapper">
        Anna punktid: {pointValue}
        <button
          onClick={() => {
            activatePointChange({ teamName: null, pointValue: null });
            closeQuestion();
          }}
          className="btn--finish-question"
        >
          Märgi mängituks
        </button>
      </div>
      <div className="teams">
        {teamsData.map((team) => {
          return (
            <div className="team-wrapper" key={team.name}>
              <div className={clsx("added-value", lastPointChangeTeam === team.name && "is-active")}>
                {wasLastPointChangeAssign ? "+" : "-"}
                {pointValue}
              </div>
              <div className="team-elements">
                <button
                  className={clsx("btn--team-action operator left", scoreActivatedTeam === team.name && "is-visible")}
                  onClick={() => handleScoreChangeButtonClick(team.name, false)}
                >
                  -
                </button>
                <button
                  className={clsx("btn--team-action", scoreActivatedTeam === team.name && "highlighted")}
                  onClick={() => {
                    if (scoreActivatedTeam !== team.name) {
                      setScoreActivatedTeam(team.name);
                      setLastPointChangeTeam(null);
                    }
                  }}
                >
                  {team.name}
                </button>
                <button
                  className={clsx(
                    "btn--team-action operator right",
                    scoreActivatedTeam === team.name && "is-visible",
                    !getIsPointAddingAllowed(team.name) && "is-disabled"
                  )}
                  onClick={() => handleScoreChangeButtonClick(team.name, true)}
                >
                  +
                </button>
              </div>
              {team.score}
            </div>
          );
        })}
      </div>
    </div>
  );
}
