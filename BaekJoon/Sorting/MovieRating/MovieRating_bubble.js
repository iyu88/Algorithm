const fs = require('fs');
const [nums, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bubbleSort = (arr) => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1 ; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

const [N, L, H] = nums.split(' ').map(Number);
const scores = arr.split(' ').map(Number);

const sorted = bubbleSort(scores);
const sum = sorted.slice(L, N-H).reduce((acc, cur) => acc + cur, 0);

console.log(sum / (N-H-L));
