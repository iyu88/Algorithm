const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let answer = [];
let index = 1;
let $q = [];
for (let i = 1; i <= N; i++) {
  $q.push(i);
}

while ($q.length) {
  let v = Number($q.shift());
  if (index % M) $q.push(v); // 순서가 아니면 다시 넣고
  else answer.push(v); // 순서면 답
  index++;
}

console.log(`<${answer.join(", ")}>`);
