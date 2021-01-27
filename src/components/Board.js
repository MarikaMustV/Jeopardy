import React from "react";
import { questionData, finalQuestion, teamsData } from "../questions";
import Question from "./Question";
import Menu from "./Menu";
import FinalQuestion from "./FinalQuestion";

export default function Board() {
  const [round, setRound] = React.useState("round_1");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [playedSquaresCount, setPlayedSquaresCount] = React.useState(0);
  const [finalWinner, setFinalWinner] = React.useState("");
  const [currentTeamsData, setCurrentTeamsData] = React.useState([]);

  React.useEffect(() => {
    teamsData.map((team) => {
      return localStorage.setItem(team.name, 0);
    });
    setCurrentTeamsData(teamsData);
  }, []);

  React.useEffect(() => {
    if (playedSquaresCount === 30) {
      window.setTimeout(() => {
        setRound("round_2");
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

  const handlePointChange = (teamName, pointValue, isAssign) => {
    const prevScore = Number(window.localStorage.getItem(teamName));
    window.localStorage.setItem(teamName, isAssign ? prevScore + (pointValue || 0) : prevScore - (pointValue || 0));
    setCurrentTeamsData(getUpdatedTeamsData());
  };

  const getIsDailyDouble = (questionIndex, columnIndex) => {
    if (round === "round_1" && questionIndex === 3 && columnIndex === 3) return true;
    else if (
      round === "round_2" &&
      ((questionIndex === 3 && columnIndex === 1) || (questionIndex === 4 && columnIndex === 4))
    )
      return true;
    else return false;
  };

  return (
    <div className="board">
      {round !== "final" ? (
        questionData?.map((column, columnIndex) => {
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
                    handlePointChange={(teamName, pointValue, isAssign) =>
                      handlePointChange(teamName, pointValue, isAssign)
                    }
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <FinalQuestion
          teamsData={currentTeamsData}
          handlePointDeduction={(teamName, value) => handlePointChange(teamName, value, false)}
          setFinalWinner={setFinalWinner}
          finalQuestion={finalQuestion}
        />
      )}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`menu-opener ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="burger-stripe stripe-1" />
        <div className="burger-stripe stripe-2" />
        <div className="burger-stripe stripe-3" />
      </button>
      <Menu isOpen={isMenuOpen} finalWinner={finalWinner} teamsData={currentTeamsData} />
    </div>
  );
}
