const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const divide = (arr, low, high) => {
    const pivot = arr[Math.floor((low + high) / 2)];
    while (low <= high) {
        while (arr[low] < pivot) low++;
        while (arr[high] > pivot) high--;
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

const answer = [];
const sorted = quick_sort(arr.slice()).slice(3);

answer.push(sorted.reduce((acc, cur) => acc + cur, 0));
answer.push(sorted.map(el => arr.indexOf(el) + 1).sort((a, b) => a - b).join(' '));

console.log(answer.join('\n'));
