const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let obj = {};
arr.forEach((el) => {
  if (obj[el] === undefined) obj[el] = 1;
  else obj[el]++;
});

let max = Object.keys(obj)
  .sort()
  .sort((a, b) => obj[b] - obj[a]);
console.log(max[0]);
