const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
const [N, M] = nums.split(' ').map(Number);
const obj = {};
const options = inputs.slice(0, N).map(Number).sort((a, b) => a - b).forEach((el, idx) => obj[el] === undefined && (obj[el] = idx));
const questions = inputs.slice(N).map(Number);

questions.forEach(el => {
    if (obj[el] === undefined) {
        answer.push(-1);
    } else {
        answer.push(obj[el]);
    }
});

console.log(answer.join('\n'));
