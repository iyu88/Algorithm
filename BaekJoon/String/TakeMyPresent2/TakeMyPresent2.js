const fs = require('fs');
const [num, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let count = 0;

for (let i = 0 ; i < Number(num)-1 ; i++) {
    if (str[i] === 'E' && str[i+1] === 'W') count++;
}

console.log(count);
