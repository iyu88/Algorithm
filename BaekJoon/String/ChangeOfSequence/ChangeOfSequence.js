const fs = require("fs");
let [nums, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = nums.split(" ").map(Number);
let arr = str.split(",").map(Number);

while (M--) {
  let temp = [];
  for (let i = 1; i < arr.length; i++) {
    temp.push(arr[i] - arr[i - 1]);
  }
  arr = [...temp];
}

console.log(arr.join(","));
