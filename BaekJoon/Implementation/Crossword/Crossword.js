const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [R, C] = nums.split(" ").map(Number);
const board = inputs.map((el) => el.split(""));

const words = [];

for (let y = 0; y < R; y++) {
  let word = "";
  for (let x = 0; x < C; x++) {
    const char = board[y][x];

    if (char === "#") {
      if (word.length > 1) words.push(word);
      word = "";
      continue;
    }

    if (x === C - 1) {
      if (word.length > 0) words.push(word + char);
      word = "";
      continue;
    }

    word += char;
  }
}

for (let x = 0; x < C; x++) {
  let word = "";
  for (let y = 0; y < R; y++) {
    const char = board[y][x];

    if (char === "#") {
      if (word.length > 1) words.push(word);
      word = "";
      continue;
    }

    if (y === R - 1) {
      if (word.length > 0) words.push(word + char);
      word = "";
      continue;
    }

    word += char;
  }
}

const [answer] = words.sort((a, b) => a.localeCompare(b));

console.log(answer);
