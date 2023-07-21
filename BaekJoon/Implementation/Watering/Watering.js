const fs = require('fs');
const [N, K, A, B] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const arr = Array(N).fill(K);
let count = 0;

while (!arr.includes(0)) {
    for (let i = 0; i < A; i++) {
        arr[i] += B;
    }
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] -= 1;
    }
    
    arr.sort((a, b) => a - b);
    count++;
}

console.log(count);
