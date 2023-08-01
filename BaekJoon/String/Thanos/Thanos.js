const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("");

const counts = [0, 0];

for (let i = 0; i < input.length; i++) {
  counts[input[i]]++;
}

const halfCounts = counts.map((el) => Math.floor(el / 2));

for (let i = input.length - 1; i > -1; i--) {
  if (halfCounts[0] === 0) break;
  if (input[i] === "0") {
    halfCounts[0]--;
    input[i] = -1;
  }
}

for (let i = 0; i < input.length - 1; i++) {
  if (halfCounts[1] === 0) break;
  if (input[i] === "1") {
    halfCounts[1]--;
    input[i] = -1;
  }
}

console.log(input.filter((el) => el !== -1).join(""));
