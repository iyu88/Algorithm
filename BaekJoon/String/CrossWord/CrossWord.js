const fs = require("fs");
let [a, b] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => el.split(""));

let arr = Array(b.length)
  .fill(null)
  .map((el) => Array(a.length).fill("."));
let [m, n] = [-1, -1];

for (let i = 0; i < a.length; i++) {
  for (let j = 0; j < b.length; j++) {
    if (a[i] === b[j]) {
      m = a.indexOf(a[i]);
      n = b.indexOf(a[i]);
      break;
    }
  }
  if (m !== -1) break;
}

for (let k = 0; k < a.length; k++) {
  arr[n][k] = a[k];
}

for (let k = 0; k < b.length; k++) {
  arr[k][m] = b[k];
}

console.log(arr.map((el) => el.join("")).join("\n"));
