const fs = require('fs');
const [num, answer, question] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const A = answer.split(' ');
const Q = question.split(' ');

const $map = new Map();
A.forEach((el, i) => $map.set(el, i));

let score = 0;
for (let i = 0 ; i < N ; i++) {
    for (let j = i ; j < N ; j++) {
        if ($map.get(Q[i]) < $map.get(Q[j])) score++;
    }
}

console.log(`${score}/${N*(N-1)/2}`);
