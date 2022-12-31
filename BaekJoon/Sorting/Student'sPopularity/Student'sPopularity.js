const fs = require('fs');
const [num, strs, ...votes] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const candidates = {};
strs.split(' ').forEach(el => candidates[el] = 0);

votes.forEach(el => el.split(' ').forEach(el => candidates[el]++));

console.log(Object.keys(candidates).sort((a, b) => candidates[b] - candidates[a] || candidates[a] > candidates[b]).map(k => `${k} ${candidates[k]}`).join('\n'));
