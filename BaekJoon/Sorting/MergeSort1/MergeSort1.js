const fs = require('fs');
const [nums, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [N, K] = nums;
const result = [];

const mergeSort = (arr) => {
    if (arr.length === 1) return arr;
    
    const mid = Math.floor((arr.length + 1)/ 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    const temp = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            temp.push(left[i]);
            result.push(left[i]);
            i++;
        } else {
            temp.push(right[j]);
            result.push(right[j]);
            j++;
        }
    }
    
    while (i < left.length) {
        temp.push(left[i]);
        result.push(left[i]);
        i++;
    }
    
    while (j < right.length) {
        temp.push(right[j]);
        result.push(right[j]);
        j++;
    }
    
    return temp;
}

mergeSort(arr);

if (result.length >= K) console.log(result[K-1])
else console.log(-1);
