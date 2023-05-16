const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const mergeSort = (arr) => {
    if (arr.length < 2) return arr;
    
    const mid = Math.floor((arr.length + 1) / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] > right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    while (i < left.length) {
        result.push(left[i++]);
    }
    
    while (j < right.length) {
        result.push(right[j++]);
    }
    
    return result;
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
    const sorted = mergeSort(arr.slice(1));
    const gap = findLargestGap(sorted);
    
    answer.push(`Class ${idx+1}`);
    answer.push(`Max ${sorted[0]}, Min ${sorted[sorted.length-1]}, Largest gap ${gap}`);
});

console.log(answer.join('\n'));
