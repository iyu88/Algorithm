const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split(' ');
const T = ['B', 'S', 'G', 'P', 'D'];
const answer = [];

const sorted = arr.slice().sort((a, b) => T.indexOf(a.charAt(0)) - T.indexOf(b.charAt(0)) || +b.substr(1) -  +a.substr(1));

for (let i = 0 ; i < N ; i++) {
    if (arr[i] !== sorted[i]) answer.push(sorted[i]);
}

console.log(answer.length ? `KO\n${answer.join(' ')}` : 'OK');
