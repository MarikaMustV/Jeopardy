import React, { useState, useEffect } from "react";
import { Portal } from "react-portal";
import { motion, AnimatePresence } from "framer-motion";
import ScoreAssign from "./ScoreAssign";
import DailyDouble from "./DailyDouble";
import { portalTransitionVariants } from "../transitions";
import clsx from "clsx";

export default function Question({
  questionData,
  teamsData,
  increasePlayedSquaresCount,
  isDailyDouble,
  handlePointChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [customValue, setCustomValue] = useState(null);
  const [maxAllowedPointSum, setMaxAllowedPointSum] = useState(0);
  const [currentPointSum, setCurrentPointSum] = useState(0);
  const [wasLastPointChangeAssign, setWasLastPointChangeAssign] = useState(null);
  const [maxDailyDoubleValue, setMaxDailyDoubleValue] = useState(0);

  useEffect(() => {
    //To not increase points above the current question value
    const { pointSum, highestScore } = teamsData.reduce(
      (acc, team) => {
        if (team.score > acc.highestScore) {
          acc.highestScore = team.score;
        }

        acc.pointSum = acc.pointSum + team.score;

        return acc;
      },
      { pointSum: 0, highestScore: 0 }
    );

    setCurrentPointSum(pointSum);

    if (!wasLastPointChangeAssign) {
      setMaxAllowedPointSum(pointSum + (isDailyDouble ? +customValue : questionData.pointValue));
    }

    //Set maximum daily double value - highest current score or current question value
    setMaxDailyDoubleValue(highestScore > questionData.pointValue ? highestScore : questionData.pointValue);
  }, [maxAllowedPointSum, teamsData, customValue, isDailyDouble, questionData, wasLastPointChangeAssign]);

  const activatePointAssign = ({ teamName, pointValue, isAssign }) => {
    if (teamName === null && pointValue === null) {
      //Mark as played
      setIsPlayed(true);
      increasePlayedSquaresCount();
    } else {
      setWasLastPointChangeAssign(isAssign);
      handlePointChange({ teamName, pointValue, isAssign });
    }
  };

  return (
    <div className={clsx("square flex-center", isPlayed && "is-disabled")}>
      <button className="btn--open-question scale-on-hover" onClick={() => setIsOpen(true)}>
        {questionData.pointValue}
      </button>

      {isOpen && (
        <Portal>
          <AnimatePresence>
            <motion.div
              className="question-modal flex-center full-screen-modal"
              initial="initial"
              animate="enter"
              key={questionData.question}
              variants={portalTransitionVariants}
            >
              <button
                className={clsx("btn--side left", isAnswerVisible && "is-disabled")}
                onClick={() => setIsOpen(false)}
              />
              <div className={clsx("question moved-up-animation", isAnswerVisible && "moved-up")}>
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
              <div className={clsx("answer", isAnswerVisible && "is-visible")}>
                {questionData.answer || "Vastust pole sisestatud"}
              </div>
              <button
                className={clsx("btn--side right", isAnswerVisible && "is-disabled")}
                onClick={() => (!isPlayed ? setIsAnswerVisible(true) : "")}
              />

              <ScoreAssign
                isVisible={isAnswerVisible}
                teamsData={teamsData}
                pointValue={isDailyDouble ? +customValue : questionData.pointValue}
                activatePointChange={(props) => activatePointAssign(props)}
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
