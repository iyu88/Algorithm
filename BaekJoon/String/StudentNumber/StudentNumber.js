const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = 0;
let N = +num;
arr = arr.map((el) => el.split(""));

for (let i = 0; i < arr[0].length; i++) {
  if (
    [...new Set(arr.map((el) => el.slice(el.length - i - 1).join("")))]
      .length === N
  ) {
    answer = i + 1;
    break;
  }
}

console.log(answer);
