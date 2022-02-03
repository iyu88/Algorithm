const fs = require('fs');
let [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let newSet = [...new Set(arr)];

let sorted = newSet.sort().sort((a,b) => a.length - b.length);

for (let i = 0 ; i < sorted.length; i++) {
    console.log(sorted[i]);
}
