const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

let answer = [];
let max = Math.max(...arr.slice(1));

let fibo = [0, 1];
let index = 2;

while (fibo[fibo.length - 1] < max) {
  fibo[index] = fibo[index - 2] + fibo[index - 1];
  index++;
}

for (let next of arr) {
  let temp = [];
  let filtered = fibo.slice();
  while (next) {
    filtered = filtered.filter((el) => el <= next);
    let sub = filtered[filtered.length - 1];
    temp.push(sub);
    next -= sub;
  }
  answer.push(temp.reverse().join(" "));
}

console.log(answer.join("\n"));
