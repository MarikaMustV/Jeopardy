import React, { useState, useEffect } from "react";
import { questionData, finalQuestion, teamsData } from "../questions";
import Question from "./Question";
import Menu from "./Menu";
import FinalQuestion from "./FinalQuestion";
import clsx from "clsx";

export default function Board() {
  const [round, setRound] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playedSquaresCount, setPlayedSquaresCount] = useState(58);
  const [currentTeamsData, setCurrentTeamsData] = useState([]);

  useEffect(() => {
    teamsData.forEach((team) => {
      return localStorage.setItem(team.name, 0);
    });

    setCurrentTeamsData(teamsData);
  }, []);

  useEffect(() => {
    if (playedSquaresCount === 30) {
      window.setTimeout(() => {
        setRound(2);
      }, 3000);
    } else if (playedSquaresCount === 60) {
      window.setTimeout(() => {
        setRound("final");
      }, 1000);
    }
  }, [playedSquaresCount]);

  const getUpdatedTeamsData = () => {
    return teamsData.map((team) => {
      return { name: team.name, score: window.localStorage.getItem(team.name) };
    });
  };

  const handlePointChange = ({ teamName, pointValue, isAssign }) => {
    const prevScore = +window.localStorage.getItem(teamName);
    window.localStorage.setItem(teamName, isAssign ? prevScore + (pointValue || 0) : prevScore - (pointValue || 0));

    setCurrentTeamsData(getUpdatedTeamsData());
  };

  const getIsDailyDouble = (questionIndex, columnIndex) => {
    if (
      (round === 1 && questionIndex === 3 && columnIndex === 3) ||
      (round === 2 && ((questionIndex === 3 && columnIndex === 1) || (questionIndex === 4 && columnIndex === 4)))
    ) {
      return true;
    }

    return false;
  };

  const renderBurgerButton = (onClick) => {
    return (
      <button onClick={onClick} className={clsx("menu-opener", isMenuOpen && "menu-open")}>
        <div className="burger-stripe stripe-1" />
        <div className="burger-stripe stripe-2" />
        <div className="burger-stripe stripe-3" />
      </button>
    );
  };

  const renderBoard = () => {
    return questionData?.map((column, columnIndex) => {
      return (
        <div className="column" key={column.category}>
          <div className="square category">{column?.category}</div>
          {column.questions[round]?.map((questionElement, questionIndex) => {
            return (
              <Question
                key={`${questionIndex}${questionElement.value}`}
                teamsData={currentTeamsData}
                questionData={questionElement}
                increasePlayedSquaresCount={() => setPlayedSquaresCount(playedSquaresCount + 1)}
                isDailyDouble={getIsDailyDouble(questionIndex, columnIndex)}
                handlePointChange={(props) => handlePointChange(props)}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="board-root">
      {round !== "final" ? (
        renderBoard()
      ) : (
        <FinalQuestion
          teamsData={currentTeamsData}
          finalQuestion={finalQuestion}
          handlePointDeduction={(teamName, value) =>
            handlePointChange({ teamName, pointValue: value, isAssign: false })
          }
        />
      )}
      {renderBurgerButton(() => setIsMenuOpen(!isMenuOpen))}
      <Menu isOpen={isMenuOpen} teamsData={currentTeamsData} />
    </div>
  );
}
