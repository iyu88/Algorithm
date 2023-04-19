const fs = require('fs');
const [num, trees, growth] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
const T = trees.split(' ').map(Number);
const G = growth.split(' ').map(Number);
const TG = []; 

for (let i = 0 ; i < N ; i++) TG.push([T[i], G[i]]);

TG.sort((a, b) => a[1] - b[1]);

console.log(TG.reduce((acc, cur, idx) => acc + (cur[0] + (cur[1] * idx)), 0));
