const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let index = 0;

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

while (index < inputs.length) {
    const count = +inputs[index++];
    const dict = {};
    inputs.slice(index, index + count).forEach(el => {
        const [colleague, drinks] = el.split(' ');
        dict[drinks] = colleague;
    });
    index += count;
    
    const [ max ] = mergeSort(Object.keys(dict).map(Number));
    
    answer.push(dict[max]);
}

console.log(answer.join('\n'));
