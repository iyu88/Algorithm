const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.some(el => el === 'anj') ? "뭐야;" : "뭐야?");
