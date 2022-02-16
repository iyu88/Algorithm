const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let rgb = [0, 1, 2];
let dp = arr.map((el) => el.split(" ").map((el2) => +el2));

for (let y = 1; y < arr.length; y++) {
  for (let x = 0; x < 3; x++) {
    let index = rgb.filter((el) => el !== x);
    dp[y][x] += Math.min(dp[y - 1][index[0]], dp[y - 1][index[1]]);
  }
}

console.log(Math.min(...dp[N - 1]));
