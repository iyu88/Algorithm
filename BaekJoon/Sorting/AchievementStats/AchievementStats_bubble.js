const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bubbleSort = (arr) => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1 ; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

const findLargestGap = (arr) => {
    let gap = 0;
    for (let i = 0 ; i < arr.length - 1 ; i++) {
        gap = Math.max(gap, arr[i] - arr[i+1]);
    }
    
    return gap;
}

const answer = [];

inputs.forEach((el, idx) => {
    const arr = el.split(' ').map(Number);
    const sorted = bubbleSort(arr.slice(1));
    const gap = findLargestGap(sorted);
    
    answer.push(`Class ${idx+1}`);
    answer.push(`Max ${sorted[0]}, Min ${sorted[sorted.length-1]}, Largest gap ${gap}`);
});

console.log(answer.join('\n'));
