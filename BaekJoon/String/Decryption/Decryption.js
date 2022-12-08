const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => {
    const counts = {};
    el.split('').forEach(el2 => {
        if (el2 !== ' ') {
            if (counts[el2] === undefined) counts[el2] = 1;
            else counts[el2]++;
        }
    });
    const max = Math.max(...Object.values(counts));
    const answer = Object.keys(counts).filter(key => counts[key] === max);
    return answer.length === 1 ? answer[0] : '?';
}).join('\n'));
