const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let obj = {};

arr.forEach((el) => {
  let next = el.split(".")[1];
  if (obj[next] === undefined) obj[next] = 1;
  else obj[next]++;
});

console.log(
  Object.keys(obj)
    .sort()
    .map((el) => `${el} ${obj[el]}`)
    .join("\n")
);
