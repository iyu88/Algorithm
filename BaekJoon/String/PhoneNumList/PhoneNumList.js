const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
let N = +num;
let len = arr.length;
for (let i = 0; i < len; i++) {
  let M = Number(arr[i]);
  let check = arr.slice(i + 1, i + M + 1).sort();
  let count = 0;
  let result = "YES";
  for (let j = 0; j < M; j++) {
    if (check[j].slice(0, count) === check[j - 1]) {
      result = "NO";
      break;
    }
    count = check[j].length;
  }
  answer.push(result);
  i += M;
}

console.log(answer.join("\n"));
