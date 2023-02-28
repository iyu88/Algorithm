const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
const teams = Array(N).fill(null).map(_ => []);
const answer = [];

arr.forEach(info => {
    const [num, name] = info.split(' ');
    if (num === "0") return; 
    if (teams[num-1].length < M) {
        teams[num-1].push([num, name]);
    }
});

for (let i = 0 ; i < N ; i+=2) {
    teams[i].sort((prev, next) => {
        const [A, B] = [prev[1], next[1]];
        if (A.length < B.length) return -1;
        else if (A.length > B.length) return 1;
        else {
            return A < B ? -1 : (A === B ? 0 : 1);
        }
    }).forEach(el => answer.push(el));
}

for (let i = 1 ; i < N ; i+=2) {
    teams[i].sort((prev, next) => {
        const [A, B] = [prev[1], next[1]];
        if (A.length < B.length) return -1;
        else if (A.length > B.length) return 1;
        else {
            return A < B ? -1 : (A === B ? 0 : 1);
        }
    }).forEach(el => answer.push(el));
}

console.log(answer.map(el => el.join(' ')).join('\n'));
