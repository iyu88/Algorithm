const fs = require('fs');
console.log(fs.readFileSync('/dev/stdin').toString().trim().split('').map(el => el ** 5).reduce((acc, cur) => acc + cur));