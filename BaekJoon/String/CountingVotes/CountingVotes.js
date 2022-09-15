const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let count = arr.split("").filter((el) => el === "A").length;

if (N - count === count) console.log("Tie");
else if (N - count < count) console.log("A");
else console.log("B");
