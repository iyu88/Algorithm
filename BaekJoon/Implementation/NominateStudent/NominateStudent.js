const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const frames = +inputs[index++];
const students = +inputs[index++];
const votes = inputs[index].split(' ').map(Number);
const results = {};

votes.forEach((v, t) => {
    if (results[v]) {
        results[v].count++;
    } else {
        if (frames !== Object.keys(results).length) {
            if (results[v] === undefined) {
                results[v] = {count: 1, time: t};
            }
        } else {
            const mins = Object.keys(results).sort((a, b) => results[a].count - results[b].count || results[a].time - results[b].time);
            delete results[mins[0]];
            results[v] = {count: 1, time: t};
        }
    }
});

console.log(Object.keys(results).sort((a, b) => b.count - a.count).join(' '));
