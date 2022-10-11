const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

for (let i = 0; i < arr.length - 2; i += 2) {
  let before = arr[i].split("").sort().join("");
  let after = arr[i + 1].split("").sort().join("");
  let isSame = before === after;
  answer.push(
    `Case ${Math.floor(i / 2) + 1}: ${isSame ? "same" : "different"}`
  );
}

console.log(answer.join("\n"));
