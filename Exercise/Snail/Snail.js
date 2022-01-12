const fs = require('fs');
let [a, b, v] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
console.log(Math.ceil((v - b) / (a - b)));
