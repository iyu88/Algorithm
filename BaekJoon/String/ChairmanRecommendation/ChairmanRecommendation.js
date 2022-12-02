const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = {};

arr.forEach(el => {
    const [name, count] = el.split(' ');
    answer[name] = +count;
});

const max = Math.max(...Object.values(answer));

console.log(Object.keys(answer).filter(el => answer[el] === max).sort()[0]);
