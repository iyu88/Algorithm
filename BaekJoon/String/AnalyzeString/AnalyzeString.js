const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().split("\n");

let answer = "";
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "") continue;
  let counts = Array(4).fill(0);
  for (let j = 0; j < arr[i].length; j++) {
    if (arr[i][j] === " ") counts[3]++;
    else if (arr[i][j] >= "0" && arr[i][j] <= "9") counts[2]++;
    else if (arr[i][j] >= "a" && arr[i][j] <= "z") counts[0]++;
    else if (arr[i][j] >= "A" && arr[i][j] <= "Z") counts[1]++;
  }
  answer += counts.join(" ") + "\n";
}

console.log(answer.trim());
