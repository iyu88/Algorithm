const fs = require("fs");
let [num, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let answer = [];
while (temp.length) {
  let N = Number(temp.shift());
  let arr = temp
    .shift()
    .split(" ")
    .map((el) => +el);
  let K = Number(temp.shift());
  let dp = Array(K + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i]; j <= K; j++) {
      dp[j] += dp[j - arr[i]];
    }
  }

  answer.push(dp[K]);
}

console.log(answer.join("\n"));
