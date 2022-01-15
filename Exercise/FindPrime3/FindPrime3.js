const fs = require('fs');
let [min, max] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

let answer = [];

const isPrime = (num) => {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

for (let i = parseInt(min); i <= parseInt(max); i++) {
    isPrime(i) ? answer.push(i) : answer = answer;
}
console.log(answer.join('\n'));
