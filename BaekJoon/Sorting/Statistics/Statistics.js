const fs = require('fs');
const [N, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const answer = [];
const counting = {};

arr.forEach(el => {
    if (counting[el] === undefined) counting[el] = 1;
    else counting[el]++;
});

const counting_sort = Object.keys(counting).map(Number).sort((a, b) => a - b).map(k => Array(counting[k]).fill(k)).flat();

const MAX_COUNT = Math.max(...Object.values(counting));
const [first, second] = Object.keys(counting).map(Number).filter(k => counting[k] === MAX_COUNT).sort((a, b) => a - b);

answer.push(Math.round(arr.reduce((acc, cur) => acc + cur, 0) / N));
answer.push(counting_sort[Math.floor(N / 2)]);
answer.push(second === undefined ? first : second);
answer.push(counting_sort[N - 1] - counting_sort[0]);

console.log(answer.join('\n'));
