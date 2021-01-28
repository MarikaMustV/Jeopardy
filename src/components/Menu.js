import React from "react";
import clsx from "clsx";

export default function Menu({ isOpen, teamsData }) {
  const startNewGame = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={clsx("menu", isOpen && "is-visible")}>
      <div className="scoreboard">
        {teamsData.map((team) => {
          return (
            <div className="team" key={team.name}>
              <div className="name">{team.name}</div>
              <div className="score">{window.localStorage.getItem(team.name)}</div>
            </div>
          );
        })}
      </div>
      <button onClick={() => startNewGame()} className="btn--menu-btn">
        Alusta uut mängu
      </button>
    </div>
  );
}
