const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

arr.forEach((el) => {
  let sum = Number(el.split("").reverse().join("")) + Number(el);
  if (sum.toString().split("").reverse().join("") === sum.toString()) {
    console.log("YES");
  } else {
    console.log("NO");
  }
});
