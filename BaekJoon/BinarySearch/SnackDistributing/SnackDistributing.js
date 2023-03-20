const fs = require('fs');
const [nums, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(line => line.split(' ').map(Number));

const [M, _] = nums;
const snack = input.sort((a, b) => a - b);
let max = 0;

snack.forEach(size => max = Math.max(max, size));

const isAvailable = (target) => {
    let count = 0;
    for (let i = 0 ; i < snack.length ; i++) {
        count += Math.floor(snack[i] / target);
    }
    return count >= M;
}

const binarySearch = (start, end) => {
    let answer = 0;
    let mid;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        if (isAvailable(mid)) {
            start = mid + 1;
            answer = mid;
        } else {
            end = mid - 1;
        }
    }
    
    return answer;
}

console.log(binarySearch(1, Math.max(...snack)));
