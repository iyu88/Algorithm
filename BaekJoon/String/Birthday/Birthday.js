const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr
  .map((el) => el.split(" "))
  .sort(
    (a, b) =>
      Number(a[3]) - Number(b[3]) ||
      Number(a[2]) - Number(b[2]) ||
      Number(a[1]) - Number(b[1])
  );
console.log(arr[arr.length - 1][0]);
console.log(arr[0][0]);
