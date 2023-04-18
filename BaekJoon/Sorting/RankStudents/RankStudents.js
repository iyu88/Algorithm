const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const merge_sort = (arr) => {
    if (arr.length === 1) return arr; 
    
    const mid = Math.floor((arr.length + 1) / 2);
    const left = merge_sort(arr.slice(0, mid));
    const right = merge_sort(arr.slice(mid));
    
    const temp = [];
    let i = 0;
    let j = 0; 
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) temp.push(left[i++]);
        else temp.push(right[j++]);
    }
    
    while (i < left.length) temp.push(left[i++]);
    while (j < right.length) temp.push(right[j++]);
    
    return temp;
}

console.log(merge_sort(inputs.map(Number)).reduce((acc, cur, idx) => acc + Math.abs(idx + 1 - cur), 0));
