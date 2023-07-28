const fs = require("fs");
const [_, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const scores = [0, 0];
const answer = [0, 0];
let current = 0;

const compare = (seconds, current) => {
  if (scores[0] > scores[1]) {
    answer[0] += seconds - current;
  }

  if (scores[0] < scores[1]) {
    answer[1] += seconds - current;
  }
};

const convertTime = (time) => {
  const [min, sec] = time.split(":").map(Number);
  return min * 60 + sec;
};

const addPrefixZero = (target) => {
  return target.toString().length === 1 ? "0" + target : target;
};

const revertTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return addPrefixZero(min) + ":" + addPrefixZero(sec);
};

inputs.forEach((el) => {
  const [team, rawTime] = el.split(" ");
  const seconds = convertTime(rawTime);

  compare(seconds, current);

  scores[team - 1]++;

  current = seconds;
});

compare(2880, current);

console.log(answer.map((el) => revertTime(el)).join("\n"));
