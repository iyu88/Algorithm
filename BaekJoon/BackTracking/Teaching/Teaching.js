const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, K] = nums.split(" ").map((el) => +el);
let answer = [];
let dict = ["a", "n", "t", "i", "c"];
let voca = arr.map((el) =>
  el
    .split("")
    .slice(4, el.length - 4)
    .filter((el2) => !dict.includes(el2))
);
let $voca = [
  ...new Set(
    voca
      .map((el) => el.join(""))
      .join("")
      .split("")
  ),
];
let visited = K - dict.length > 0 ? Array(K - dict.length).fill(0) : [];
let T = visited.length;
let max = 0;

const backTracking = (i, next) => {
  if (T <= $voca.length && visited.every((el) => el !== 0))
    answer.push(visited.slice(0));
  else if (
    T > $voca.length &&
    visited.filter((el) => el !== 0).length === $voca.length
  )
    answer.push(visited.filter((el) => el !== 0).slice(0));
  else {
    for (let j = next; j < $voca.length; j++) {
      if (visited[i]) continue;
      visited[i] = $voca[j];
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === $voca[j]) {
          isDiff = false;
          break;
        }
      }
      if (isDiff) backTracking(i + 1, j + 1);
      visited[i] = 0;
    }
  }
};

if (K < 5) {
  console.log(0);
} else if (T) {
  backTracking(0, 0);
  answer.forEach((el) => {
    let count = 0;
    voca.forEach((el2) => {
      let isPass = true;
      for (let i = 0; i < el2.length; i++) {
        if (!el.includes(el2[i])) {
          isPass = false;
          break;
        }
      }
      if (isPass) count++;
    });
    max = Math.max(max, count);
  });
  console.log(max);
} else {
  voca.forEach((el) => (el.length === 0 ? max++ : (max = max)));
  console.log(max);
}
