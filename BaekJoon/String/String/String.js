const fs = require("fs");
let [a, b] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

let min = a.length;
for (let i = 0; i <= b.length - a.length; i++) {
  let answer = 0;
  for (let j = i; j < i + a.length; j++) {
    if (a[j - i] !== b[j]) answer++;
  }
  if (answer < min) min = answer;
}

console.log(min);
