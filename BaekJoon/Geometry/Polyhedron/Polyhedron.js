const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
for (let i = 0; i < arr.length; i++) {
    let [a, b] = arr[i].split(" ").map(Number);
    answer.push(Math.abs(a - b) + 2);
}

console.log(answer.join("\n"));
