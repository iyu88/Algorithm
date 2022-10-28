const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let str = arr[0];

console.log(
  arr
    .slice(1)
    .map((el) => {
      let isPassword = [];
      let index = 0;
      for (let i = 0; i < el.length; i++) {
        if (str[index] === el[i]) {
          isPassword.push(str[index]);
          index++;
        }
      }
      return isPassword.join("") === str ? "true" : "false";
    })
    .join("\n")
);
