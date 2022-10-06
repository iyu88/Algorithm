const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
arr.forEach((el) => {
  let [M, N] = el.split(" ").map((el2) => el2.split(""));
  let objA = {};
  let objB = {};
  let A = M.slice();
  let B = N.slice();
  A.sort().forEach((el) => {
    if (objA[el] === undefined) objA[el] = 1;
    else objA[el]++;
  });
  B.sort().forEach((el) => {
    if (objB[el] === undefined) objB[el] = 1;
    else objB[el]++;
  });
  if (JSON.stringify(A) === JSON.stringify(B)) {
    answer.push(`${M.join("")} & ${N.join("")} are anagrams.`);
  } else {
    answer.push(`${M.join("")} & ${N.join("")} are NOT anagrams.`);
  }
});

console.log(answer.join("\n"));
