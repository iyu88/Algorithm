const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim();
console.log(str.includes('d2') || str.includes('D2') ? "D2" : "unrated");