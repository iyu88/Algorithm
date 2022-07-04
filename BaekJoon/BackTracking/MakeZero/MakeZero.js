const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let M;
let answer;
let visited;
let nums;
let signs;

const backTracking = (i) => {
  if (visited.every((el) => el !== false)) {
    let [str, isZero] = calcZero(nums.slice(), visited.slice());
    if (isZero === 0) answer.push(str);
  } else {
    for (let j = 0; j < 3; j++) {
      if (visited[i]) continue;
      visited[i] = signs[j];
      backTracking(i + 1);
      visited[i] = false;
    }
  }
};

const calcZero = (num, sign) => {
  let start = num.splice(0, 1);
  let reduced = num.reduce((acc, cur, i) => [...acc, sign[i], cur], start);
  return [reduced.join(""), eval(reduced.filter((el) => el !== " ").join(""))];
};

while (num--) {
  M = Number(arr.shift());
  answer = [];
  visited = Array(M - 1).fill(false);
  nums = Array(M)
    .fill(1)
    .map((el, i) => el + i);
  signs = ["+", "-", " "];
  backTracking(0);
  if (answer.length) console.log(answer.sort().join("\n"));
  if (num) console.log("");
}
