const fs = require('fs');
const [size, heights] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(line => line.split(' ').map(Number));

const [N, M] = size;
const blocks = Array.from(Array(N), () => Array(M).fill(false));
let sum = 0;

heights.forEach((height, x) => {
    for (let y = N-height; y < N; y++) blocks[y][x] = true;
});

for (let y = 0; y < N; y++) {
    let left_block = -1;
    let right_block = -1;
    let count = 0;
    for (let x = 0; x < M; x++) {
        if (!blocks[y][x] && left_block > right_block) count++;
        if (blocks[y][x]) {
            if (left_block === -1) left_block = x;
            else {
                if (right_block < x) {
                    left_block = x;
                    sum += count; 
                    count = 0;
                } else right_block = x;
            }
        }
    }
    if (left_block < right_block) sum += count;
}

console.log(sum);
