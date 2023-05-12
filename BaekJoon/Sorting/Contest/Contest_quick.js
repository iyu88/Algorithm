const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

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

const [w1, w2, w3] = quickSort(inputs.slice(0, 10));
const [k1, k2, k3] = quickSort(inputs.slice(10));

console.log(`${w1 + w2 + w3} ${k1 + k2 + k3}`);
