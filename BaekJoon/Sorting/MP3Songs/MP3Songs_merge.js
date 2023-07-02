const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
    
    while (i < left.length) {
        result.push(left[i++]);
    }
    
    while (j < right.length) {
        result.push(right[j++]);
    }
    
    return result;
}

let order = 1;
let index = 0;

while (index < inputs.length - 1) {
    const count = +inputs[index++];
    const names = inputs.slice(index, index + count);
    
    console.log(order++);
    console.log(mergeSort(names).join('\n'));
    
    index += count;
}
