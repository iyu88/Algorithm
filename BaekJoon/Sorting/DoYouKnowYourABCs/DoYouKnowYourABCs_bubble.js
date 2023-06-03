const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

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

const sorted = bubbleSort(arr);
const [A, B] = [sorted[0], sorted[1]];
const C = sorted[sorted.length - 1] - A - B;

console.log(`${A} ${B} ${C}`);
