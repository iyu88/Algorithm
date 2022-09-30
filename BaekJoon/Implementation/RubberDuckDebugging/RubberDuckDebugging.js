const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = 0;

for (let i = 1; i < arr.length - 1; i++) {
  if (arr[i].length === 4) {
    if (!answer) {
      answer += 2;
    } else {
      answer--;
    }
  } else {
    answer++;
  }
}

console.log(answer ? "힝구" : "고무오리야 사랑해");
