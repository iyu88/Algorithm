const fs = require('fs');
const [nums, ...levels] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = nums.split(' ').map(Number);
const binarySearch = (arr) => {
    let start = Math.min(...arr);
    let end = start + K;
    let mid;
    let result = 0;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        let sum = 0;
        
        for (let i = 0 ; i < N ; i++) {
            if (mid > arr[i]) {
                sum += mid - arr[i];
            }
        }
        
        if (sum <= K) {
            start = mid + 1;
            result = Math.max(result, mid);
        } else {
            end = mid - 1;
        }
    }
    
    return result;
}

console.log(binarySearch(levels.map(Number).sort((a, b) => a - b)));
