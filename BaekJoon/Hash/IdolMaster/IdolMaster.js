const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = nums.split(' ').map(Number);
const answer = [];
const girlGroup = {};

while (N--) {
    const [group, count] = arr.splice(0, 2);
    const names = arr.splice(0, count);
    girlGroup[group] = names;
}

while (M--) {
    const [question, count] = arr.splice(0, 2);
    if (+count) {
        for (const group of Object.keys(girlGroup)) {
            if (girlGroup[group].includes(question)) {
                answer.push(group);
                break;
            }
        }
    } else {
        girlGroup[question].sort().forEach(el => answer.push(el));
    }
}

console.log(answer.join('\n'));
