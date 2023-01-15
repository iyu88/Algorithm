const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = {};
answer['ChongChong'] = true;

arr.forEach(el => {
    const [personA, personB] = el.split(' ');
    if (personA in answer && !(personB in answer)) answer[personB] = true;
    if (personB in answer && !(personA in answer)) answer[personA] = true;
});

console.log(Object.keys(answer).length);
