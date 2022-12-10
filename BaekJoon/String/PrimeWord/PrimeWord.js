const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim();

const sum = str.split('').map(el => {
    const code = el.charCodeAt(0);
    return code - (code > 96 ? 96 : 38);
}).reduce((acc, cur) => acc + cur, 0);

const isPrime = (target) => {
    if (target <= 2) {
        return true;
    } else {
        for (let i = 2; i <= Math.floor(Math.sqrt(target)) ; i++) {
            if (target % i === 0) {
                return false;
            }
        }
        return true;
    }
}

console.log(`It is ${isPrime(sum) ? "" : "not "}a prime word.`);
