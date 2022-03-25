const fs = require("fs");
let [N, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

while (arr.length) {
  let temp = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let n = temp.shift();
  let avg = Math.floor(temp.reduce((acc, cur) => acc + cur, 0) / n);
  answer.push(
    ((temp.filter((el) => el > avg).length / n) * 100).toFixed(3) + "%"
  );
}

console.log(answer.join("\n"));
