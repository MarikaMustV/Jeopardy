This is a classic Jeopardy game for spicing up your next gathering.

### Instructions

1. Clone the repo, install node modules with `npm i`.

2. Fill in the `questions.js` file with questions and teams' information. The design supports up to 6 teams, also, let's keep the names reasonable in length :) Game can be played in both Estonian and English - you can change the language in the main menu - top open it, click on the burger on the top right corner. Current scores and the `New game` button can be found in the main menu as well.

3. Run `npm start` to start the game in your browser. Open [http://localhost:3000](http://localhost:3000) and do not refresh the page during the game.
   If an accidental refresh should happen, score are saved in localstorage and logged to console.

4. Once the question modal is opened (by clicking on a point value on the gameboard), navigate forward by clicking on the right side of the modal, and back by clicking left. If either of those buttons are disabled, the corresponding action(s) are not currently available.

5. Follow the instructions, give and take points, and have fun!
