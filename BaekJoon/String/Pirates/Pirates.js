const fs = require("fs");
let [H, N] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(H.split(N).length - 1);
