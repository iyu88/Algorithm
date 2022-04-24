const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr
  .map((el) => el.split(" ").map((el2) => +el2))
  .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
let temp = arr[0][1];
let count = 1;

for (let i = 1; i < N; i++) {
  if (temp <= arr[i][0]) {
    temp = arr[i][1];
    count++;
  }
}

console.log(count);
