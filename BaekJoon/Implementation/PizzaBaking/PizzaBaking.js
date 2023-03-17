const fs = require('fs');
const [nums, orders, inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(line => line.split(' ').map(Number));

const [D, N] = nums;

for (let i = 1 ; i < D ; i++) {
    if (orders[i] > orders[i-1]) {
        orders[i] = orders[i-1];
    }
}

let limit = D-1;
let min = Infinity;

const binarySearch = (start, end, target) => {
    let result = -1;
    
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        
        if (orders[mid] >= target) {
            result = mid;
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }
    
    min = Math.min(min, result);
    limit = result - 1;
}

inputs.forEach(pizza => {
    binarySearch(0, limit, pizza);
});

console.log(++min);
