const fs = require('fs');
const K = Number(fs.readFileSync('/dev/stdin').toString());

const getTargetNumber = (K) => ( 
    (K+1).toString(2)
         .split('')
         .map(char => char === '0' ? 4 : 7)
         .slice(1)
         .join('')
)

console.log(getTargetNumber(K));
