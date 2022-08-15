const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

arr.forEach((el, i) => {
  console.log(`${i + 1}. ${el}`);
});
