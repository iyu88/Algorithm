const fs = require('fs');
const num = +fs.readFileSync('/dev/stdin').toString();

const isPrime = (target) => {
    if (target < 2) return false;
    for (let i = 2 ; i <= Math.sqrt(target) ; i++) {
        if (target % i === 0) return false;
    }
    
    return true;
}

let index = 0;
let count = 0;
let answer = 0;

while (count !== num) {
    if (isPrime(index)) {
        count++;
        answer = index;
    }
    index++;
}

console.log(answer);
