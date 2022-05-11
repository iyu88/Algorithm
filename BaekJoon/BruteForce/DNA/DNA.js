const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let result;
let answer = [];
let count = 0;

arr.forEach((el) => {
  let temp = el.split("");
  temp.forEach((el2, i) => {
    if (answer[i] === undefined) answer[i] = {};
    if (answer[i][el2] === undefined) answer[i][el2] = 1;
    else answer[i][el2]++;
  });
});

const getChar = (obj) => {
  let max = Math.max(...Object.values(obj));
  let filtered = Object.keys(obj)
    .filter((el) => obj[el] === max)
    .sort();
  return filtered[0];
};

result = answer.map((el) => getChar(el)).join("");

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (result[j] !== arr[i][j]) count++;
  }
}

console.log(result);
console.log(count);
