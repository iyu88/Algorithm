const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let index = 0;

const divide = (arr, start, end) => {
    const pivot = arr[Math.floor((start + end) / 2)];
    
    while (start <= end) {
        while (arr[start] > pivot) start++;
        while (arr[end] < pivot) end--;
        if (start <= end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }
    
    return start;
}

const quickSort = (arr, start = 0, end = arr.length - 1) => {
    if (start >= end) return arr;
    if (arr.length < 2) return arr; 
    
    const divided = divide(arr, start, end);
    
    quickSort(arr, start, divided - 1);
    quickSort(arr, divided, end);
    
    return arr;
}

while (index < inputs.length) {
    const count = +inputs[index++];
    const dict = {};
    inputs.slice(index, index + count).forEach(el => {
        const [colleague, drinks] = el.split(' ');
        dict[drinks] = colleague;
    });
    index += count;
    
    const [ max ] = quickSort(Object.keys(dict).map(Number));
    
    answer.push(dict[max]);
}

console.log(answer.join('\n'));
