const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const dict = {};
const answer = [];
let count = 0;

for (let i = 1; i < N + 1; i++) {
    dict[inputs[i]] = true;
    count++;
}

for (let i = N + 1; i < N + M + 1; i++) {
    inputs[i].split(',').forEach(el => {
        if (dict[el] === true) {
            dict[el] = false;
            count--;
        }
    });
    answer.push(count);
}

console.log(answer.join('\n'));
