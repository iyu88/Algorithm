const fs = require('fs');
const [num, inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const K = +num;
const N = inputs.split(' ').map(Number);
const L = N.length;
const answer = Array.from({length: K+1}, () => []);

const printTree = (start, end, height) => {
    if (start === end) {
        answer[height].push(N[start]);
        return;
    }
    
    const mid = (start + end) / 2;
    answer[height].push(N[mid]);
    
    printTree(start, mid - 1, height + 1);
    printTree(mid + 1, end, height + 1);
}

printTree(0, L-1, 1);

console.log(answer.slice(1).map(el => el.join(' ')).join('\n'));
