const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let answer = [];

const isPrime = (num) => {
  if (num < 2) return false;
  else {
    let end = Math.sqrt(num);
    for (let k = 2; k <= end; k++) {
      if (!(num % k)) return false;
    }
  }
  return true;
};

for (let i = 0; i < arr.length - 1; i++) {
  let temp = [];
  let N = arr[i];
  for (let i = N + 1; i <= N * 2; i++) {
    if (isPrime(i)) temp.push(i);
  }
  answer.push(temp.length);
}

console.log(answer.join("\n"));
