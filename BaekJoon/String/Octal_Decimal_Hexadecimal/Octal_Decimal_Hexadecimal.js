const fs = require('fs');
const target = fs.readFileSync('/dev/stdin').toString().trim();

console.log(parseInt(target, target.startsWith('0x') ? 16 : (target.startsWith('0') ? 8 : 10)));
