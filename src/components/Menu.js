import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function Menu({ isOpen, teamsData }) {
  const { t, i18n } = useTranslation();

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
      <div className="lang-switcher">
        <button
          onClick={() => i18n.changeLanguage("et")}
          className={clsx("btn--menu-btn btn--lang-btn", i18n.language === "et" && "is-active")}
        >
          ET
        </button>
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={clsx("btn--menu-btn btn--lang-btn", i18n.language === "en" && "is-active")}
        >
          EN
        </button>
      </div>
      <button onClick={() => startNewGame()} className="btn--menu-btn">
        {t("menu.startNewGame", "Alusta uut mängu")}
      </button>
    </div>
  );
}
