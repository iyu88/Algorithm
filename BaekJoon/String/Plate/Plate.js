const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("");
let sum = 0;
str.forEach((el, i) => {
  if (!sum) sum = 10;
  else {
    sum += 5;
    if (el !== str[i - 1]) sum += 5;
  }
});

console.log(sum);
