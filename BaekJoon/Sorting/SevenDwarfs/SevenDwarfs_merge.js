const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

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

const getSubs = (arr, target) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (target === 1) {
            result.push([arr[i]]);
        } else {
            const temp = getSubs(arr.slice(i+1), target-1);
            temp.forEach(el => result.push([...el, arr[i]]));
        }
    }
    
    return result;
}

const cases = getSubs(inputs, 7);

for (let i = 0 ; i < cases.length ; i++) {
    const sum = cases[i].reduce((acc, cur) => acc + cur, 0);
    if (sum === 100) {
        console.log(mergeSort(cases[i]).join('\n'));
        break;
    }
}
