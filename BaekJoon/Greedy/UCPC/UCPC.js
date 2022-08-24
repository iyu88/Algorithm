const fs = require("fs");
let str = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .join("")
  .split("");

let onlyUpper = str.filter((el) => {
  if (el.toUpperCase() === el) return true;
  else return false;
});

let answer = onlyUpper.join("").split("");

let UCPC = ["U", "C", "P", "C"];
let visited = Array(4).fill(false);

for (let i = 0; i < answer.length; i++) {
  if (answer[i] === UCPC[0]) visited[0] = true;
  if (visited[0] && answer[i] === UCPC[1]) visited[1] = true;
  if (visited[1] && answer[i] === UCPC[2]) visited[2] = true;
  if (visited[2] && answer[i] === UCPC[3]) visited[3] = true;
}

if (visited[3]) console.log("I love UCPC");
else console.log("I hate UCPC");
