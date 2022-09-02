const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("").map(Number);

let len = Math.floor(arr.length / 2);
let front = arr.slice(0, len).reduce((acc, cur) => acc + cur, 0);
let back = arr.slice(len).reduce((acc, cur) => acc + cur, 0);

if (front === back) console.log("LUCKY");
else console.log("READY");
