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

  const activatePointAssign = (team, pointValue, isAssign) => {
    if (team === null && pointValue === null) {
      //'Märgi mängituks'
      setIsPlayed(true);
      increasePlayedSquaresCount();
    } else {
      handlePointChange(team, pointValue, isAssign);
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
                  <DailyDouble questionData={questionData} setCustomValue={setCustomValue} customValue={customValue} />
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
              />
            </motion.div>
          </AnimatePresence>
        </Portal>
      )}
    </div>
  );
}
