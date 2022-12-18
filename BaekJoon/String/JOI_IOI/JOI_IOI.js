const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('');

const answer = [0, 0];

for(let i = 0 ; i < str.length ; i++) {
    if (str[i+2] === undefined) break;
    const temp = str.slice(i, i+3).join('');
    if (temp === 'JOI') answer[0]++;
    if (temp === 'IOI') answer[1]++;
}

console.log(answer.join('\n'));
