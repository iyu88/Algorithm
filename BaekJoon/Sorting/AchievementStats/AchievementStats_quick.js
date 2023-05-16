const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const findLargestGap = (arr) => {
    let gap = 0;
    for (let i = 0 ; i < arr.length - 1 ; i++) {
        gap = Math.max(gap, arr[i] - arr[i+1]);
    }
    
    return gap;
}

const answer = [];

inputs.forEach((el, idx) => {
    const arr = el.split(' ').map(Number);
    const sorted = quickSort(arr.slice(1));
    const gap = findLargestGap(sorted);
    
    answer.push(`Class ${idx+1}`);
    answer.push(`Max ${sorted[0]}, Min ${sorted[sorted.length-1]}, Largest gap ${gap}`);
});

console.log(answer.join('\n'));
