const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

let answer = -1;

const divide = (arr, low, high) => {
    const pivot = arr[Math.floor((low + high) / 2)];
    
    while (low <= high) {
        while (arr[low] > pivot) low++;
        while (arr[high] < pivot) high--;
        if (low <= high) {
            [arr[low], arr[high]] = [arr[high], arr[low]];
            low++;
            high--;
        }
    }
    
    return low;
}

const quick_sort = (arr, low = 0, high = arr.length - 1) => {
    if (low >= high) return arr;
    if (arr.length < 2) return arr;
    
    const divided = divide(arr, low, high);
    
    quick_sort(arr, low, divided - 1);
    quick_sort(arr, divided, high);
    
    return arr;
}

const isTriangle = (a, b, c) => c < a + b;

const sum = (a, b, c) => a + b + c;

const sorted = quick_sort(arr);

for (let i = 0; i < sorted.length - 2; i++) {
    const [a, b, c] = [sorted[i], sorted[i+1], sorted[i+2]];
    if (isTriangle(c, b, a)) answer = Math.max(answer, sum(a, b, c));
}

console.log(answer);
