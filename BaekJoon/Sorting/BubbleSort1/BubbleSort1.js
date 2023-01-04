const fs = require('fs');
const [nums, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [N, M] = nums;

const bubbleSort = (arr, times) => {
    let count = 0;
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                if (++count === times) return [arr[j + 1], arr[j]];
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    return [-1];
}

console.log(bubbleSort(arr, M).join(' '));
