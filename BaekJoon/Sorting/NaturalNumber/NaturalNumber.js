const fs = require('fs');
const [_, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const arr = input.split(' ').map(Number);

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

const quick_sort = (arr, start = 0, end = arr.length - 1) => {
    if (arr.length < 2) return arr;
    if (start >= end) return arr;
    
    const divided = divide(arr, start, end);
    
    quick_sort(arr, start, divided-1);
    quick_sort(arr, divided, end);
    
    return arr;
}

console.log(arr[Math.floor(quick_sort(arr).length / 2)]);
