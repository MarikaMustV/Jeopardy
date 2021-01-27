import React from "react";

export default function ScoreAssign({ isVisible, teamsData, pointValue, activatePointChange, closeQuestion }) {
  const [scoreActivatedTeam, setScoreActivatedTeam] = React.useState("");
  const [lastPointChangeTeam, setLastPointChangeTeam] = React.useState(null);
  const [wasLastPointChangeAssign, setWasLastPointChangeAssign] = React.useState(null);

  const handleScoreChangeButtonClick = (teamName, isAssign) => {
    activatePointChange(teamName, pointValue, isAssign);
    setLastPointChangeTeam(teamName);
    setWasLastPointChangeAssign(isAssign);
  };

  return (
    <div className={`score-assign ${isVisible ? "" : "hidden"}`}>
      <div className="title-wrapper">
        Anna punktid: {pointValue}
        <button
          onClick={() => {
            activatePointChange(null, null);
            closeQuestion();
          }}
          className="finish-question"
        >
          Märgi mängituks
        </button>
      </div>
      <div className="teams">
        {teamsData.map((team) => {
          return (
            <div className="team-wrapper" key={team.name}>
              <div className={`added-value ${lastPointChangeTeam === team.name ? "is-active" : ""}`}>
                {wasLastPointChangeAssign ? "+" : "-"}
                {pointValue}
              </div>
              <div className="team-elements">
                <button
                  className={`team-button operator left ${scoreActivatedTeam === team.name ? "visible" : ""}`}
                  onClick={() => {
                    handleScoreChangeButtonClick(team.name, false);
                  }}
                >
                  -
                </button>
                <button
                  className={`team-button
                  ${scoreActivatedTeam === team.name ? "highlighted" : ""}`}
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
                  className={`team-button operator right ${scoreActivatedTeam === team.name ? "visible" : ""}`}
                  onClick={() => {
                    handleScoreChangeButtonClick(team.name, true);
                  }}
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
