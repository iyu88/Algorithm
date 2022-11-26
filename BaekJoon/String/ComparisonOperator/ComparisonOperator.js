const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];

let index = 0;

while (index < arr.length) {
    if (arr[index].includes('E')) break;
    answer.push(`Case ${index + 1}: ${eval(arr[index])}`);
    index++;
}

console.log(answer.join('\n'));
