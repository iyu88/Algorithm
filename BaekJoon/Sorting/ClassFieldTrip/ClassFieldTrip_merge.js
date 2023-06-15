const fs = require('fs');
const [A, B] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const arr = A.concat(B);

const mergeSort = (arr) => {
    if (arr.length < 2) return arr;
    
    const mid = Math.floor((arr.length + 1) / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    while (i < left.length) result.push(left[i++]);
    
    while (j < right.length) result.push(right[j++]);
    
    return result;
}

console.log(mergeSort(arr.split('')).join(''));
