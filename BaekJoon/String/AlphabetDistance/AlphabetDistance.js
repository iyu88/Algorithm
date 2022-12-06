const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => {
    const [front, rear] = el.split(' ');
    const answer = [];
    for (let i = 0 ; i < front.length ; i++) {
        const frontNum = front.charCodeAt(i) - 64;
        const rearNum = rear.charCodeAt(i) - 64;
        if (frontNum > rearNum) answer.push(rearNum + 26 - frontNum);
        else answer.push(rearNum - frontNum);
    }
    return `Distances: ${answer.join(' ')}`;
}).join('\n'));
