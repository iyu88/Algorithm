const fs = require('fs');
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
let answer = 0;

arr.split(' ').forEach(el => {
    let temp = +el;
    let isPrime = true;
    if (temp < 2) {
        isPrime = false;
    } else {
        for (let i = 2 ; i <= Math.sqrt(temp); i++) {
            if ( temp % i === 0 ) {
                isPrime = false;
                break;
            }
        }
    }
    isPrime ? answer++ : answer = answer;
});

console.log(answer);
