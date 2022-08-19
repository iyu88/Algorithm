const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [null, null];
for (let i = 0; i < +num; i++) {
  let reversed = arr[i].split("").reverse().join("");
  if (arr[i] === reversed || arr.includes(reversed)) {
    let len = arr[i].length;
    answer = [len, arr[i][Math.floor(len / 2)]];
    break;
  }
}

console.log(answer.join(" "));
