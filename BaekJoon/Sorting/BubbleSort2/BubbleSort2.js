const fs = require('fs');
const [nums, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [_, M] = nums;

const bubbleSort = (arr, M) => {
    let count = 0;
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                if (++count === M) return count;
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    return count;
}

console.log(bubbleSort(arr, M) < M ? -1 : arr.join(' '));
