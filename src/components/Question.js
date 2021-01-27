import React from "react";
import { Portal } from "react-portal";
import { motion, AnimatePresence } from "framer-motion";
import ScoreAssign from "./ScoreAssign";
import DailyDouble from "./DailyDouble";
import { portalTransitionVariants } from "../transitions";

export default function Question({
  questionData,
  teamsData,
  increasePlayedSquaresCount,
  isDailyDouble,
  handlePointChange,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [isPlayed, setIsPlayed] = React.useState(false);
  const [customValue, setCustomValue] = React.useState(null);
  const [maxAllowedPointSum, setMaxAllowedPointSum] = React.useState(0);
  const [currentPointSum, setCurrentPointSum] = React.useState(0);
  const [wasLastPointChangeAssign, setWasLastPointChangeAssign] = React.useState(null);
  const [maxDailyDoubleValue, setMaxDailyDoubleValue] = React.useState(0);

  React.useEffect(() => {
    //To not increase points above the current question value
    let pointSum = 0;
    let highestScore = 0;
    teamsData.map((team) => {
      if (team.score > highestScore) highestScore = team.score;
      return (pointSum = pointSum + Number(team.score));
    });
    setCurrentPointSum(pointSum);
    if (!wasLastPointChangeAssign) {
      setMaxAllowedPointSum(pointSum + (isDailyDouble ? Number(customValue) : questionData.pointValue));
    }

    //Set maximum daily double value - highest current score or current question value
    setMaxDailyDoubleValue(highestScore > questionData.pointValue ? highestScore : questionData.pointValue);
  }, [maxAllowedPointSum, teamsData, customValue, isDailyDouble, questionData, wasLastPointChangeAssign]);

  const activatePointAssign = (teamName, pointValue, isAssign) => {
    if (teamName === null && pointValue === null) {
      //Mark as played
      setIsPlayed(true);
      increasePlayedSquaresCount();
    } else {
      setWasLastPointChangeAssign(isAssign);
      handlePointChange(teamName, pointValue, isAssign);
    }
  };

  return (
    <div className={`square ${isPlayed ? "disabled" : ""}`}>
      <button
        className="button open"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {questionData.pointValue}
      </button>

      {isOpen && (
        <Portal>
          <AnimatePresence>
            <motion.div
              className="question-modal"
              initial="initial"
              animate="enter"
              exit="exit"
              key={questionData.question}
              variants={portalTransitionVariants}
            >
              <button
                className={`side-button left ${isAnswerVisible ? "disabled" : ""}`}
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <div className={`question ${isAnswerVisible ? "moved-up" : ""}`}>
                {!isDailyDouble ? (
                  questionData.question || "Küsimust pole sisestatud"
                ) : (
                  <DailyDouble
                    questionData={questionData}
                    setCustomValue={setCustomValue}
                    customValue={customValue}
                    maxDailyDoubleValue={maxDailyDoubleValue}
                  />
                )}
              </div>
              <div className={`answer ${isAnswerVisible ? "visible" : ""}`}>
                {questionData.answer || "Vastust pole sisestatud"}
              </div>
              <button
                className={`side-button right ${isAnswerVisible ? "disabled" : ""}`}
                onClick={() => (!isPlayed ? setIsAnswerVisible(true) : "")}
              />

              <ScoreAssign
                isVisible={isAnswerVisible}
                teamsData={teamsData}
                pointValue={isDailyDouble ? Number(customValue) : questionData.pointValue}
                activatePointChange={(team, pointValue, isAssign) => activatePointAssign(team, pointValue, isAssign)}
                closeQuestion={() => setIsOpen(false)}
                currentPointSum={currentPointSum}
                maxAllowedPointSum={maxAllowedPointSum}
                wasLastPointChangeAssign={wasLastPointChangeAssign}
              />
            </motion.div>
          </AnimatePresence>
        </Portal>
      )}
    </div>
  );
}
