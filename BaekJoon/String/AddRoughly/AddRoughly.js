const fs = require("fs");
let [N, M] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

let answer = [];
let len = Math.max(N.length, M.length);

for (let i = 0; i < len; i++) {
  let a = N[N.length - i - 1] || 0;
  let b = M[M.length - i - 1] || 0;
  answer.push(Number(a) + Number(b));
}

console.log(answer.reverse().join(""));
