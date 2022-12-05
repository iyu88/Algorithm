const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim();

const target = str.split('').reverse().join('');
console.log(str === target ? "true" : "false");
