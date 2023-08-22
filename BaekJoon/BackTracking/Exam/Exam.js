const fs = require("fs");
const answers = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let caseCount = 0;
const sheet = Array(10).fill(0);

const backTracking = (currentOrder, answerSheet) => {
  if (answerSheet.every((el) => el !== 0)) {
    let totalScore = 0;
    for (let i = 0; i < 10; i++) {
      if (answerSheet[i] === answers[i]) totalScore++;
    }
    if (totalScore > 4) caseCount++;
  } else {
    for (let i = 1; i <= 5; i++) {
      if (answerSheet[currentOrder]) continue;

      answerSheet[currentOrder] = i;

      if (currentOrder > 1) {
        if (
          answerSheet[currentOrder - 2] === answerSheet[currentOrder - 1] &&
          answerSheet[currentOrder - 1] === answerSheet[currentOrder]
        ) {
          answerSheet[currentOrder] = 0;
          continue;
        }
      }

      backTracking(currentOrder + 1, answerSheet);
      answerSheet[currentOrder] = 0;
    }
  }
};

backTracking(0, sheet);

console.log(caseCount);
