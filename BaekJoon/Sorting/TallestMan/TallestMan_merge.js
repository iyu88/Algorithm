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

const answer = [];
let index = 0;

while (index < inputs.length - 1) {
    const count = +inputs[index++];
    const dict = {};
    const heights = {};
    const info = inputs.slice(index, index + count)
                          .forEach(i => {
                              const [name, height] = i.split(' ');
                              dict[name] = height;
                              if (heights[height] === undefined) heights[height] = true;
                          });
    const arr = Object.keys(heights).map(Number);
    
    const [ max ] = mergeSort(arr);
    
    answer.push(Object.keys(dict).filter(key => +dict[key] === max).join(' '));
    
    index += count;
}

console.log(answer.join('\n'));
