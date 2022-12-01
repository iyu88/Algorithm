const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let lastCount;
let lastRank = 0;
const obj = {};
arr.forEach((el, index) => {
    const line = el.split('').reverse();
    for (let i = 0 ; i < line.length ; i++) {
        if (line[i] * 1 === +line[i]) {
            obj[line[i]] = i;
            break;
        }
    }
});

Object.keys(obj).sort((a, b) => obj[a] - obj[b]).forEach((el, index) => {
    if (lastCount === undefined || lastCount !== obj[el]) {
        answer[el] = ++lastRank;
    } else {
        answer[el] = lastRank;
    }
    lastCount = obj[el];
});

console.log(answer.slice(1).join('\n'));
