const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let len = N;
let answer = [];

while (N--) {
  let index = (len - N - 1) * 2;
  let count = 0;
  arr[index].split("").forEach((el, i) => {
    if (el !== arr[index + 1][i]) count++;
  });
  answer.push(`Hamming distance is ${count}.`);
}

console.log(answer.join("\n"));
